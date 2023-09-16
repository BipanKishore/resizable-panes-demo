import {useCallback, useEffect, useRef} from 'react'
import {createMap} from '../utils/util'
import {minMaxTotal, sizesConsole} from '../utils/development-util'
import {DIRECTIONS, ZERO} from '../constant'
import {IInitPaneService, IServiceRef, IUseResizablePanesParams, IKeyToBoolMap} from '../@types'
import {closeFullSizeFn, restoreDefaultFn, setVisibilityFn, toFullPageFn, toFullSizeFn} from '../utils/api'
import {
  calculateAxes, goingDownLogic, goingUpLogic,
  setCurrentMinMax
} from '../utils/resizable-pane'
import {getDirection} from '../utils/dom'
import {createPaneList, setDownMaxLimits, setUISizesFn, setUpMaxLimits, syncAxisSizesFn} from '../utils/panes'

const useResizablePanes = (hookParams: IUseResizablePanesParams) => {
  const {
    props,
    getContainerRect,
    panesRefs,
    resizerSize,
    isVertical,
    resizerRefs
  } = hookParams

  const {
    children,
    onReady,
    onChangeVisibility
  } = props

  const serviceRef = useRef<IServiceRef>({})

  // ---------------------------------  API -------------------------------------------- //

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
      getContainerRect,
      panesRefs,
      resizerSize,
      isVertical
    })

    const api = {
      toFullSize,
      closeFullSize,
      restoreDefault,
      toFullPage,
      setVisibility
    }

    onReady(api)
  }, [panesRefs])

  const initPanesService = ({
    children,
    getContainerRect,
    panesRefs,
    resizerSize,
    isVertical
  }: IInitPaneService) => {
    serviceRef.current.getContainerRect = getContainerRect
    serviceRef.current.resizerSize = resizerSize
    // resizerRefs.current?.forEach((ref: any) => console.log('v-- getSize', ref.current?.getSize()))
    serviceRef.current.isVertical = isVertical
    serviceRef.current.resizerRefs = resizerRefs
    serviceRef.current.panesList = createPaneList({panesRefs, children, isVertical})
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
      sizesConsole(serviceRef.current.panesList)
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
    return createMap(serviceRef.current.panesList, 'size')
  }

  const setDirection = (e: any) => {
    const {prevDirection} = serviceRef.current
    const direction = getDirection(e)

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
      return false
    } else if (e.mouseCoordinate >= bottomAxis) {
      setDownMaxLimits(panesList, activeIndex)
      syncAxisSizes()
      serviceRef.current.axisCoordinate = bottomAxis
      return false
    }

    return true
  }

  const setMouseDownAndPaneAxisDetails = ({mouseCoordinate}: any, index: number) => {
    setActiveIndex(index)
    serviceRef.current.prevDirection = DIRECTIONS.NONE
    serviceRef.current.axisCoordinate = mouseCoordinate
    syncAxisSizes()
  }

  return {
    setMouseDownAndPaneAxisDetails,
    calculateAndSetHeight,
    getIdToSizeMap,
    toFullSize,
    closeFullSize,
    toFullPage
  }
}

export default useResizablePanes
