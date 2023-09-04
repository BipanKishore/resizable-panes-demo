import {SyntheticEvent, useCallback, useEffect, useRef} from 'react'
import {IInitPaneService} from '../models/pane-service-models'
import {PaneModel} from '../models/pane-model'
import {setDownMaxLimits, setUpMaxLimits} from '../utils/panes'
import {getDirection} from '../utils/util'
import {directionBehaviourConsole} from '../utils/development-util'
import {DIRECTIONS, ZERO} from '../constant'
import {
  calculateAxes, goingDownLogic, goingUpLogic,
  setCurrentMinMax, setUISizesFn, syncAxisSizesFn
} from '../utils/new-util'

interface IServiceRef{
    containerRef?: any,
    panesRefs?: any
    resizerSize?: number,
    panesList?: PaneModel[],
    maxTopAxis?: number,
    maxPaneSize?: number,
    activeIndex?: number
    topAxis?: number,
    bottomAxis?: number,
    prevDirection?: string,
    axisCoordinate?: number
}

interface IResizableApi {

}

interface IUseResizablePanesParams {
  children: any,
  containerRef: any,
  panesRefs: any,
  resizerSize: any,
  onReady: (api: IResizableApi) => void
}

const useResizablePanes = (props: IUseResizablePanesParams) => {
  const {
    children,
    containerRef,
    panesRefs,
    resizerSize, onReady
  } = props
  const serviceRef = useRef<IServiceRef>({})

  useEffect(() => {
    initPanesService({
      children,
      containerRef,
      panesRefs,
      resizerSize
    })

    if (onReady) {
      onReady({})
    }
  }, [
    onReady, resizerSize, containerRef, panesRefs, children
  ])

  const createPaneList = useCallback((panesRefs: any, children: any[]) => {
    serviceRef.current.panesRefs = panesRefs
    serviceRef.current.panesList = panesRefs
      ?.current?.map((pane: any, index: number) => new PaneModel(pane, index, children[index]))
  }, [])

  const setMaxLimitingSize = useCallback((containerRef: any) => {
    const {top, height} = containerRef.current.getBoundingClientRect() || {}
    serviceRef.current.maxTopAxis = top
    serviceRef.current.maxPaneSize = height -
    ((serviceRef.current.panesList.length - 1) * serviceRef.current.resizerSize)
  }, [])

  const initPanesService = ({
    children,
    containerRef,
    panesRefs,
    resizerSize
  }: IInitPaneService) => {
    serviceRef.current.containerRef = containerRef
    serviceRef.current.resizerSize = resizerSize
    createPaneList(panesRefs, children)
    setMaxLimitingSize(containerRef)
  }

  const setCurrentMinMaxAndAxes = useCallback(() => {
    setCurrentMinMax(serviceRef.current)

    const {
      bottomAxis,
      topAxis
    } = calculateAxes(serviceRef.current)
    serviceRef.current.bottomAxis = bottomAxis
    serviceRef.current.topAxis = topAxis
  }, [])

  const syncAxisSizes = useCallback(() => {
    syncAxisSizesFn(serviceRef.current)
  }, [])

  const setUISizes = useCallback((e: SyntheticEvent) => {
    setUISizesFn(serviceRef.current)
    // publishPanes(e)
  }, [])

  const setActiveIndex = useCallback((index: number) => {
    serviceRef.current.activeIndex = index
  }, [])

  const calculateAndSetHeight = useCallback((e: any) => {
    const {movementY} = e
    if (movementY) {
      setDirection(e)
      const isChangeRequired = setAxisConfig(e)

      if (isChangeRequired) {
        if (movementY > ZERO) {
          goingDownLogic(e, serviceRef.current)
        } else if (movementY < ZERO) {
          goingUpLogic(e, serviceRef.current)
        }
      }

      setUISizes(e)
    }
  }, [])

  const setDirection = (e: any) => {
    const {prevDirection} = serviceRef.current
    const direction = getDirection(e)
    directionBehaviourConsole(direction, prevDirection)

    if (prevDirection !== direction) {
      directionChangeActions(e)
      serviceRef.current.prevDirection = direction
    }
  }

  const directionChangeActions = (e: any) => {
    serviceRef.current.axisCoordinate = e.clientY
    syncAxisSizes()
    setCurrentMinMaxAndAxes()
  }

  const setAxisConfig = (e: any) => {
    const {bottomAxis, topAxis, panesList, activeIndex} = serviceRef.current
    if (e.clientY <= topAxis) {
      setUpMaxLimits(panesList, activeIndex)
      syncAxisSizes()
      serviceRef.current.axisCoordinate = topAxis
    } else if (e.clientY >= bottomAxis) {
      setDownMaxLimits(panesList, activeIndex)
      syncAxisSizes()
      serviceRef.current.axisCoordinate = bottomAxis
    }

    return true
  }

  const setMouseDownAndPaneAxisDetails = (e: any, index: number) => {
    const {clientX, clientY} = e
    setActiveIndex(index)
    serviceRef.current.prevDirection = DIRECTIONS.NONE
    serviceRef.current.axisCoordinate = clientY
    syncAxisSizes()
  }

  return {
    setMouseDownAndPaneAxisDetails,
    setActiveIndex,
    calculateAndSetHeight
  }
}

export default useResizablePanes
