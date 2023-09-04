import { IResizableEvent, SplitType } from '../@types'
import {MINUS_ONE, ZERO} from '../constant'
import { keyConsole } from './development-util'
import {minMaxLogicDown, minMaxLogicUp} from './panes'
import {getMaxSizeSum, getMinSizeSum, toPx} from './util'

export const goingDownLogic = (e: any, {axisCoordinate, panesList, activeIndex}: any) => {
  let sizeChange = e.mouseCoordinate - axisCoordinate
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

export const goingUpLogic = (e: any, {axisCoordinate, panesList, activeIndex}: any) => {
  let sizeChange = axisCoordinate - e.mouseCoordinate
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

export const setCurrentMinMax = ({panesList, maxPaneSize, activeIndex}: any) => {
  // initMinMaxLogic()
//   const {panesList, maxPaneSize, activeIndex} = serviceRef.current
  const aMaxChangeUp = panesList[activeIndex].getMinDiff()
  const bMaxChangeUp = panesList[activeIndex + 1].getMaxDiff()

  minMaxLogicUp(panesList, aMaxChangeUp - bMaxChangeUp, activeIndex, activeIndex + 1, 0, maxPaneSize)

  // initMinMaxLogic()
  const aMaxChangeDown = panesList[activeIndex + 1].getMinDiff()
  const bMaxChangeDown = panesList[activeIndex].getMaxDiff()
  minMaxLogicDown(panesList, bMaxChangeDown - aMaxChangeDown, activeIndex, activeIndex + 1, 0, maxPaneSize)
  calculateAxes(activeIndex)
}

export const calculateAxes = ({panesList, maxTopAxis, resizerSize, activeIndex}: any) => {
//   const {panesList, maxTopAxis, resizerSize} = serviceRef.current
  const resizerSizeHalf = Math.floor(resizerSize / 2)
  const bottomAxis = maxTopAxis + getMaxSizeSum(panesList, 0, activeIndex) + activeIndex * resizerSize + resizerSizeHalf
  const topAxis = maxTopAxis + getMinSizeSum(panesList, 0, activeIndex) + activeIndex * resizerSize + resizerSizeHalf
  return {
    bottomAxis,
    topAxis
  }
}

export const syncAxisSizesFn = ({panesList}: any) => {
  panesList.forEach((pane: any) => {
    pane.syncAxisSize()
  })
}

export const setUISizesFn = ({panesList}: any) => {
  panesList.forEach((pane: any) => {
    pane.setUISize()
  })
  // publishPanes(e)
}

export const getResizableEvent = (e: any, isVertical: boolean): IResizableEvent => {
  let resizeEvent 
  if(isVertical){
    const {clientY, movementY} = e
    resizeEvent = {
      mouseCoordinate: clientY,
      movement: movementY
    }
  } else {
    const {clientX, movementX} = e
    resizeEvent = {
      mouseCoordinate: clientX,
      movement: movementX
    }
  }
  keyConsole({...resizeEvent})
  return resizeEvent
}

export const getSizeStyle = (split: SplitType, size: number) => {
  const style: any = {}
  const px = toPx(size)
  if(split === 'horizontal'){
    style.width = px
  } else {
    style.height = px
  }
  return style
}

interface IJoinClassNameParam {
  [key : string]: boolean | string
}

export const getContainerClass = (split: SplitType, isVertical: boolean) => {
  return joinClassName({
    'd-flex': true,
    'f-row h-200 w-fit-content': !isVertical,
    'f-column': isVertical
  })
}

export const joinClassName = (param: IJoinClassNameParam) => {
    const keys = Object.keys(param)

    return keys.map((key) => param[key] ? key: '' ).join(' ')
}
