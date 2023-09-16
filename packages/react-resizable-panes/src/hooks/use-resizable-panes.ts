import {useCallback, useEffect, useRef} from 'react'
import {PaneModel} from '../models/pane-model'
import {createItToSizeMap, createMap} from '../utils/util'
import {directionBehaviourConsole, getList, keyConsole, minMaxTotal} from '../utils/development-util'
import {DIRECTIONS, ZERO} from '../constant'

import {IInitPaneService, IServiceRef, IUseResizablePanesParams, IKeyToBoolMap} from '../@types'

import {closeFullSizeFn, restoreDefaultFn, setVisibilityFn, toFullPageFn, toFullSizeFn} from '../utils/api'
import {
  calculateAxes, goingDownLogic, goingUpLogic,
  setCurrentMinMax
} from '../utils/resizable-pane'
import {getDirection} from '../utils/dom'
import {setDownMaxLimits, setUISizesFn, setUpMaxLimits, syncAxisSizesFn} from '../utils/panes'

const useResizablePanes = (hookParams: IUseResizablePanesParams) => {
  const {
    children,
    containerRef,
    panesRefs,
    resizerSize,
    isVertical,
    onReady,
    storage,
    resizerRefs,
    onChangeVisibility
  } = hookParams
  const serviceRef = useRef<IServiceRef>({})

  // const [resizerVisibilityList, setResizerVisibilityList] = useState([])

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

  const restoreDefault = () => {
    restoreDefaultFn(serviceRef.current)
  }

  const setVisibility = (param: IKeyToBoolMap) => {
    setVisibilityFn(serviceRef.current, param)
    const visibilityMap = createMap(serviceRef.current.panesList, 'visibility')
    onChangeVisibility(visibilityMap)
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

    const api = {
      toFullSize,
      closeFullSize,
      restoreDefault,
      toFullPage,
      setVisibility
    }
    serviceRef.current.api = api
    if (onReady) {
      onReady(api)
    }
  }, [
    containerRef
  ])

  // Not requird isVertical
  const createPaneList = useCallback(({panesRefs, children, isVertical}: any) => {
    serviceRef.current.panesList = panesRefs
      ?.current?.map((pane: any, index: number) => new PaneModel(pane, index, children[index], isVertical))
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
    serviceRef.current.resizerRefs = resizerRefs
    createPaneList({panesRefs, children, isVertical})
  }

  const setCurrentMinMaxAndAxes = useCallback((index?: number) => {
    setCurrentMinMax(serviceRef.current, index)

    minMaxTotal(serviceRef.current)
  }, [])

  const syncAxisSizes = useCallback(() => {
    syncAxisSizesFn(serviceRef.current)
  }, [])

  const setUISizes = useCallback(() => {
    setUISizesFn(serviceRef.current)
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

      setUISizes()
    }
  }, [])

  const getIdToSizeMap = () => {
    return createItToSizeMap(serviceRef.current.panesList)
  }

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
    serviceRef.current.axisCoordinate = e.mouseCoordinate
    syncAxisSizes()
    setCurrentMinMaxAndAxes()
  }

  const setAxisConfig = (e: any) => {
    const {panesList, activeIndex} = serviceRef.current
    const {
      bottomAxis,
      topAxis
    } = calculateAxes(serviceRef.current)
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
    getIdToSizeMap,
    toFullSize,
    closeFullSize,
    toFullPage
    // resizerVisibilityList
  }
}

export default useResizablePanes
