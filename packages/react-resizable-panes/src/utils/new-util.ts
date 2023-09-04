import { IResizableEvent } from '../@types'
import {MINUS_ONE, ZERO} from '../constant'
import {minMaxLogicDown, minMaxLogicUp} from './panes'
import {getMaxSizeSum, getMinSizeSum} from './util'

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

export const getResizableEvent = (e: any): IResizableEvent =>{
  const {clientX, clientY, movementY} = e
  return {
    mouseCoordinate: clientY,
    movement: movementY
  }
}
