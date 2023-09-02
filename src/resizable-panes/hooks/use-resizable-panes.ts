import {SyntheticEvent, useCallback, useEffect, useRef} from 'react'
import {IInitPaneService} from '../models/pane-service-models'
import {PaneModel} from '../models/pane-model'
import {minMaxLogicDown, minMaxLogicUp, setDownMaxLimits, setUpMaxLimits} from '../utils/panes'
import {getDirection, getMaxSizeSum, getMinSizeSum} from '../utils/util'
import {directionBehaviourConsole} from '../utils/development-util'
import {DIRECTIONS, MINUS_ONE, ZERO} from '../constant'

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
    const {bottom, top, height} = containerRef.current.getBoundingClientRect() || {}
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

  const calculateAxes = useCallback((index: number) => {
    const {panesList, maxTopAxis, resizerSize} = serviceRef.current
    const resizerSizeHalf = Math.floor(resizerSize / 2)
    const bottomAxis = maxTopAxis + getMaxSizeSum(panesList, 0, index) + index * resizerSize + resizerSizeHalf
    const topAxis = maxTopAxis + getMinSizeSum(panesList, 0, index) + index * resizerSize + resizerSizeHalf
    serviceRef.current.bottomAxis = bottomAxis
    serviceRef.current.topAxis = topAxis
  }, [])

  const setCurrentMinMax = useCallback((index: number) => {
    // initMinMaxLogic()
    const {panesList, maxPaneSize} = serviceRef.current
    const aMaxChangeUp = panesList[index].getMinDiff()
    const bMaxChangeUp = panesList[index + 1].getMaxDiff()

    minMaxLogicUp(panesList, aMaxChangeUp - bMaxChangeUp, index, index + 1, 0, maxPaneSize)

    // initMinMaxLogic()
    const aMaxChangeDown = panesList[index + 1].getMinDiff()
    const bMaxChangeDown = panesList[index].getMaxDiff()
    minMaxLogicDown(panesList, bMaxChangeDown - aMaxChangeDown, index, index + 1, 0, maxPaneSize)
    calculateAxes(index)
  }, [])

  const syncAxisSizes = useCallback(() => {
    serviceRef.current.panesList.forEach((pane) => {
      pane.syncAxisSize()
    })
  }, [])

  const setUISizes = useCallback((e: SyntheticEvent) => {
    serviceRef.current.panesList.forEach((pane) => {
      pane.setUISize()
    })
    // publishPanes(e)
  }, [])

  const setActiveIndex = useCallback((index: number) => {
    serviceRef.current.activeIndex = index
  }, [])

  const calculateAndSetHeight = useCallback((e: any) => {
    if (e.movementY) {
      setDirection(e)
      const isChangeRequired = setAxisConfig(e)

      if (isChangeRequired) {
        if (e.movementY > ZERO) {
          goingDownLogic(e)
        } else if (e.movementY < ZERO) {
          goingUpLogic(e)
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
    setCurrentMinMax(serviceRef.current.activeIndex)
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

  const goingDownLogic = (e: any) => {
    const {axisCoordinate, panesList, activeIndex} = serviceRef.current
    let sizeChange = e.clientY - axisCoordinate
    if (sizeChange < ZERO) {
      return
    }
    let sizeChangeUp = sizeChange

    for (let i = activeIndex; i > MINUS_ONE; i -= 1) {
      sizeChangeUp = panesList[i].addSize(sizeChangeUp)
    }

    sizeChange -= sizeChangeUp

    for (let i = activeIndex + 1; i < panesList.length; i += 1) {
      sizeChange = panesList[i].removeSize(sizeChange)
    }
  }

  const goingUpLogic = (e: any) => {
    const {axisCoordinate, panesList, activeIndex} = serviceRef.current
    let sizeChange = axisCoordinate - e.clientY
    if (sizeChange < ZERO) {
      return
    }
    let sizeChangeUp = sizeChange

    for (let i = activeIndex + 1; i < panesList.length; i++) {
      sizeChangeUp = panesList[i].addSize(sizeChangeUp)
    }

    sizeChange -= sizeChangeUp
    for (let i = activeIndex; i > MINUS_ONE; i -= 1) {
      sizeChange = panesList[i].removeSize(sizeChange)
    }
  }

  const setMouseDownAndPaneAxisDetails = (e: any) => {
    const {clientX, clientY} = e
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
