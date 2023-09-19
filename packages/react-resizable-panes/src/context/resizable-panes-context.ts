import {createContext} from 'react'
import {PaneModel} from '../models/pane-model'
import {createMap} from '../utils/util'
import {DIRECTIONS, ZERO} from '../constant'
import {findIndexById, setDownMaxLimits, setUISizesFn, setUpMaxLimits, syncAxisSizesFn} from '../utils/panes'
import {calculateAxes, goingDownLogic, goingUpLogic, setCurrentMinMax} from '../utils/resizable-pane'
import {minMaxTotal, sizesConsole} from '../utils/development-util'
import {getDirection} from '../utils/dom'

export const getResizableContext = (props: any) => {
  const {split, children} = props
  const isVertical = split !== 'horizontal'

  const contextDetails: any = {
    isVertical,
    panesList: [],
    resizersList: []
  }

  const syncAxisSizes = () => {
    syncAxisSizesFn(contextDetails.panesList)
  }

  const setUISizes = () => {
    setUISizesFn(contextDetails.panesList)
  }

  const setCurrentMinMaxAndAxes = (index?: number) => {
    setCurrentMinMax(contextDetails, index)
    minMaxTotal(contextDetails)
  }

  const setActiveIndex = (index: number) => {
    contextDetails.activeIndex = index
  }

  const registerPaneAndResizer = (pane: any, props: any, resizerRef: any) => {
    const index = findIndexById(children, props.id)
    contextDetails.panesList[index] = new PaneModel(pane, index, props, isVertical)

    if (index < children.length - 1) {
      contextDetails.resizersList[index] = resizerRef
    }
  }

  const register = (regObj: any) => {
    const keys = Object.keys(regObj)
    keys.forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      contextDetails[key] = regObj[key]
    })
  }

  const getIdToSizeMap = () => {
    return createMap(contextDetails.panesList, 'size')
  }

  const setMouseDownAndPaneAxisDetails = ({mouseCoordinate}: any, id: string) => {
    const index = findIndexById(children, id)
    setActiveIndex(index)
    contextDetails.prevDirection = DIRECTIONS.NONE
    contextDetails.axisCoordinate = mouseCoordinate
    syncAxisSizes()
  }

  const calculateAndSetHeight = (e: any) => {
    const {movement} = e
    if (movement) {
      sizesConsole(contextDetails.panesList)
      setDirection(e)
      const isChangeRequired = setAxisConfig(e)

      if (isChangeRequired) {
        if (movement > ZERO) {
          goingDownLogic(e, contextDetails)
        } else if (movement < ZERO) {
          goingUpLogic(e, contextDetails)
        }
      }

      setUISizes()
    }
  }

  const setDirection = (e: any) => {
    const {prevDirection} = contextDetails
    const direction = getDirection(e)

    if (prevDirection !== direction) {
      directionChangeActions(e)
      contextDetails.prevDirection = direction
    }
  }

  const directionChangeActions = (e: any) => {
    contextDetails.axisCoordinate = e.mouseCoordinate
    syncAxisSizes()
    setCurrentMinMaxAndAxes()
  }

  const setAxisConfig = (e: any) => {
    const {panesList, activeIndex} = contextDetails
    const {
      bottomAxis,
      topAxis
    } = calculateAxes(contextDetails)

    if (e.mouseCoordinate <= topAxis) {
      setUpMaxLimits(panesList, activeIndex)
      syncAxisSizes()
      contextDetails.axisCoordinate = topAxis
      return false
    } else if (e.mouseCoordinate >= bottomAxis) {
      setDownMaxLimits(panesList, activeIndex)
      syncAxisSizes()
      contextDetails.axisCoordinate = bottomAxis
      return false
    }
    return true
  }

  return {
    setActiveIndex,
    registerPaneAndResizer,
    register,
    getIdToSizeMap,
    setMouseDownAndPaneAxisDetails,
    isVertical,
    calculateAndSetHeight,
    props,
    contextDetails
  }
}

export const ResizablePaneContext = createContext({})
