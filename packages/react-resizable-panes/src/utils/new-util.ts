import { IAnyMap, IResizableEvent, SplitType } from '../@types'
import { IServiceRef } from '../@types/use-resizable-panes-types'
import {APP_NAME, MINUS_ONE, SIZE_MAP_STORAGE_KEY, ZERO} from '../constant'
import { PaneModel } from '../models/pane-model'
import { keyConsole } from './development-util'
import {minMaxLogicDown, minMaxLogicUp} from './panes'
import { storageGetItem, storageSetItem } from './storage'
import {getMaxSizeSum, getMinSizeSum, noop, toPx} from './util'

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

export const setUISizesFn = ({panesList, storage}: any) => {
  panesList.forEach((pane: any) => {
    pane.setUISize()
  })
  storeIdtoSizeMap(panesList, storage)
  // publishPanes(e)
}

const storeIdtoSizeMap = (panesList: PaneModel[], storage: any) => {
  const map = createMap(panesList)
  storageSetItem(storage, SIZE_MAP_STORAGE_KEY, map)
}

// Need to delete Ids and match min Max
const storeReadAndSetSizes = ({storage, panesList}: IServiceRef) => {
  const panesMap = storageGetItem(storage, SIZE_MAP_STORAGE_KEY)
  if(panesMap) {
    panesList.forEach((pane) => {
      
    })
  }
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

export const findPaneIndex = (param: IServiceRef, paneId: string) => {
  const {panesList} = param
  return panesList.findIndex((({id}) => id === paneId))
}


export const toFullPageFn = (param: IServiceRef, paneId: string) => {
  const {panesList} = param
  panesList.forEach((pane) => {
    if(pane.id === paneId) {
      pane.synPreservedSize()
      pane.removeProperty('')
      pane.pane.current.classList.add('full-page-class')
    }
  })
  // setUISizesFn(param)
}

export const toFullSizeFn = (param: IServiceRef, paneId: string) => {
  const {panesList, maxPaneSize} = param
  panesList.forEach((pane) => {
    pane.synPreservedSize()
    if(pane.id === paneId) {
      pane.size = maxPaneSize
    } else {
      pane.size = 0
    }
  })
  setUISizesFn(param)
}

export const closeFullSizeFn = (param: IServiceRef) => {
  const {panesList} = param
  panesList.forEach((pane) => {
    pane.synSizeToStored()
  })
  setUISizesFn(param)
}

export const restoreDefaultFn = (param: IServiceRef) => {
  const {panesList} = param
  panesList.forEach((pane) => {
    pane.restore()
  })
  setUISizesFn(param)
}


export const createMap = (paneList: PaneModel[]) => {
  const map: IAnyMap = {}
  paneList.forEach(({id, size, show, index}) => {
    map[id] ={
      size,
      show,
      index
    }
  })
  return map
}