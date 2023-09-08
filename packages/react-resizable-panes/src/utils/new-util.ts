import {IResizableEvent, SplitType} from '../@types'
import {IAnyMap} from '../@types/general-type'
import {IServiceRef} from '../@types/use-resizable-panes-types'
import {MINUS_ONE, SIZE_MAP_STORAGE_KEY, ZERO} from '../constant'
import {PaneModel} from '../models/pane-model'
import {minMaxLogicDown, minMaxLogicUp, setResizersVisibility} from './panes'
import {storageGetItem, storageSetItem} from './storage'
import {getMaxSizeSum, getMinSizeSum, toPx} from './util'

export const noop = (_: any): any => _

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

export const setCurrentMinMax = ({panesList, maxPaneSize, activeIndex}: any, index?: number) => {
  // initMinMaxLogic()
//   const {panesList, maxPaneSize, activeIndex} = serviceRef.current
  const idx = index || activeIndex
  const nextIdx = idx + 1
  const aMaxChangeUp = panesList[idx].getMinDiff()
  const bMaxChangeUp = panesList[nextIdx].getMaxDiff()

  minMaxLogicUp(panesList, aMaxChangeUp - bMaxChangeUp, idx, nextIdx, 0, maxPaneSize)

  // initMinMaxLogic()
  const aMaxChangeDown = panesList[nextIdx].getMinDiff()
  const bMaxChangeDown = panesList[idx].getMaxDiff()
  minMaxLogicDown(panesList, bMaxChangeDown - aMaxChangeDown, idx, nextIdx, 0, maxPaneSize)
  calculateAxes(idx)
}

export const calculateAxes = ({panesList, maxTopAxis, resizerSize, activeIndex}: any, index?: number) => {
//   const {panesList, maxTopAxis, resizerSize} = serviceRef.current
  const idx = index || activeIndex
  const resizerSizeHalf = Math.floor(resizerSize / 2)
  const bottomAxis = maxTopAxis + getMaxSizeSum(panesList, 0, idx) + idx * resizerSize + resizerSizeHalf
  const topAxis = maxTopAxis + getMinSizeSum(panesList, 0, idx) + idx * resizerSize + resizerSizeHalf
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
  if (panesMap) {
    panesList.forEach((pane) => {

    })
  }
}

export const getResizableEvent = (e: any, isVertical: boolean): IResizableEvent => {
  let resizeEvent
  if (isVertical) {
    const {clientX, movementX} = e
    resizeEvent = {
      mouseCoordinate: clientX,
      movement: movementX
    }
  } else {
    const {clientY, movementY} = e
    resizeEvent = {
      mouseCoordinate: clientY,
      movement: movementY
    }
  }
  // keyConsole({...resizeEvent})
  return resizeEvent
}

export const getSizeStyle = (split: SplitType, size: number) => {
  const style: any = {}
  const px = toPx(size)
  if (split === 'horizontal') {
    style.height = px
  } else {
    style.width = px
  }
  return style
}

interface IJoinClassNameParam {
  [key : string]: boolean | string
}

export const getContainerClass = (split: SplitType, isVertical: boolean, className: string) => {
  return joinClassName({
    'd-flex': true,
    'f-row w-fit-content': isVertical,
    'f-column': !isVertical,
    [className]: className
  })
}

export const joinClassName = (param: IJoinClassNameParam) => {
  const keys = Object.keys(param)
  return keys.map((key) => param[key] ? key : '').join(' ')
}

export const findPaneIndex = (param: IServiceRef, paneId: string) => {
  const {panesList} = param
  return panesList.findIndex(({id}) => id === paneId)
}

export const toFullPageFn = (param: IServiceRef, paneId: string) => {
  const {panesList} = param
  panesList.forEach((pane) => {
    if (pane.id === paneId) {
      pane.synPreservedSize()
      pane.removeProperty('')
      pane.pane.current.classList.add('full-page-class')
    }
  })
  // setUISizesFn(param)
}

export const toFullSizeFn = (param: IServiceRef, paneId: string) => {
  const {panesList, maxPaneSize, resizerSize} = param
  panesList.forEach((pane) => {
    pane.synPreservedSize()
    if (pane.id === paneId) {
      pane.size = maxPaneSize + (panesList.length - 1) * resizerSize
    } else {
      pane.size = 0
    }
  })
  setResizersVisibility(param, false)
  setUISizesFn(param)
}

export const closeFullSizeFn = (param: IServiceRef) => {
  const {panesList} = param
  panesList.forEach((pane) => {
    pane.synSizeToStored()
  })
  setResizersVisibility(param, true)
  setUISizesFn(param)
}

export const restoreDefaultFn = (param: IServiceRef) => {
  const {panesList} = param
  panesList.forEach((pane) => {
    pane.restore()
  })
  setResizersVisibility(param, true)
  setUISizesFn(param)
}

export const createMap = (paneList: PaneModel[]) => {
  const map: IAnyMap = {}
  paneList.forEach(({id, size, visibility, index}) => {
    map[id] = {
      size,
      visibility,
      index
    }
  })
  return map
}

export const createItToSizeMap = (paneList: PaneModel[]) => {
  const map: IAnyMap = {}
  paneList.forEach(({id, size}) => {
    map[id] = size
  })
  return map
}
