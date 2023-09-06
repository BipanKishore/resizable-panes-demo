import {SyntheticEvent, useCallback, useEffect, useRef} from 'react'
import {IInitPaneService} from '../models/pane-service-models'
import {PaneModel} from '../models/pane-model'
import {setDownMaxLimits, setUpMaxLimits} from '../utils/panes'
import {getDirection} from '../utils/util'
import {directionBehaviourConsole, keyConsole} from '../utils/development-util'
import {DIRECTIONS, ZERO} from '../constant'
import {
  calculateAxes, closeFullSizeFn, createItToSizeMap, goingDownLogic, goingUpLogic,
  restoreDefaultFn,
  setCurrentMinMax, setUISizesFn, syncAxisSizesFn, toFullPageFn, toFullSizeFn
} from '../utils/new-util'
import {IServiceRef, IUseResizablePanesParams} from '../@types/use-resizable-panes-types'

const useResizablePanes = (props: IUseResizablePanesParams) => {
  const {
    children,
    containerRef,
    panesRefs,
    resizerSize,
    isVertical,
    onReady,
    storage
  } = props
  const serviceRef = useRef<IServiceRef>({})

  // ---------------------------------  API --------------------------------------------//

  const toFullPage = (paneId: string) => {
    toFullPageFn(serviceRef.current, paneId)
  }

  const toFullSize = (paneId: string) => {
    toFullSizeFn(serviceRef.current, paneId)
  }

  const closeFullSize = () => {
    closeFullSizeFn(serviceRef.current)
  }

  const clearStorage = () => {

  }

  const restoreDefault = () => {
    restoreDefaultFn(serviceRef.current)
  }

  // ---------------------------------  API --------------------------------------------//

  useEffect(() => {
    initPanesService({
      children,
      containerRef,
      panesRefs,
      resizerSize,
      isVertical,
      storage
    })

    if (onReady) {
      onReady({
        toFullSize,
        closeFullSize,
        restoreDefault,
        toFullPage
      })
    }
  }, [
    onReady, resizerSize, containerRef, panesRefs, children
  ])

  const createPaneList = useCallback(({panesRefs, children, isVertical}: any) => {
    serviceRef.current.panesRefs = panesRefs
    serviceRef.current.panesList = panesRefs
      ?.current?.map((pane: any, index: number) => new PaneModel(pane, index, children[index], isVertical))
  }, [])

  const setMaxLimitingSize = useCallback((containerRef: any, isVertical: boolean) => {
    const rect = containerRef.current.getBoundingClientRect() || {}
    const {top, height, left, width} = rect
    serviceRef.current.maxTopAxis = isVertical ? top : left
    serviceRef.current.maxPaneSize = (isVertical ? height : width) -
              ((serviceRef.current.panesList.length - 1) * serviceRef.current.resizerSize)
  }, [])

  const initPanesService = ({
    children,
    containerRef,
    panesRefs,
    resizerSize,
    isVertical,
    storage
  }: IInitPaneService) => {
    serviceRef.current.containerRef = containerRef
    serviceRef.current.resizerSize = resizerSize
    serviceRef.current.isVertical = isVertical
    serviceRef.current.storage = storage
    createPaneList({panesRefs, children, isVertical})
    setMaxLimitingSize(containerRef, isVertical)
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
    const {movement} = e
    if (movement) {
      setDirection(e)
      const isChangeRequired = setAxisConfig(e)

      if (isChangeRequired) {
        if (movement > ZERO) {
          goingDownLogic(e, serviceRef.current)
        } else if (movement < ZERO) {
          goingUpLogic(e, serviceRef.current)
        }
      }

      setUISizes(e)
    }
  }, [])

  const getIdToSizeMap = () => {
    return createItToSizeMap(serviceRef.current.panesList)
  }

  const setDirection = (e: any) => {
    const {prevDirection} = serviceRef.current
    const direction = getDirection(e)
    keyConsole({direction})
    directionBehaviourConsole(direction, prevDirection)

    if (prevDirection !== direction) {
      directionChangeActions(e)
      serviceRef.current.prevDirection = direction
    }
  }

  const directionChangeActions = (e: any) => {
    serviceRef.current.axisCoordinate = e.mouseCoordinate
    syncAxisSizes()
    setCurrentMinMaxAndAxes()
  }

  const setAxisConfig = (e: any) => {
    const {bottomAxis, topAxis, panesList, activeIndex} = serviceRef.current
    if (e.mouseCoordinate <= topAxis) {
      setUpMaxLimits(panesList, activeIndex)
      syncAxisSizes()
      serviceRef.current.axisCoordinate = topAxis
    } else if (e.mouseCoordinate >= bottomAxis) {
      setDownMaxLimits(panesList, activeIndex)
      syncAxisSizes()
      serviceRef.current.axisCoordinate = bottomAxis
    }

    return true
  }

  const setMouseDownAndPaneAxisDetails = (e: any, index: number) => {
    const {mouseCoordinate} = e
    setActiveIndex(index)
    serviceRef.current.prevDirection = DIRECTIONS.NONE
    serviceRef.current.axisCoordinate = mouseCoordinate
    syncAxisSizes()
  }

  return {
    setMouseDownAndPaneAxisDetails,
    setActiveIndex,
    calculateAndSetHeight,
    getIdToSizeMap
  }
}

export default useResizablePanes
