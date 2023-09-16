import {IServiceRef} from '../@types'
import {PaneModel} from '../models/pane-model'

export const syncAxisSizesFn = ({panesList}: IServiceRef) => {
  panesList.forEach(pane => pane.syncAxisSize())
}

export const setUISizesFn = ({panesList}: IServiceRef) => {
  panesList.forEach(pane => pane.setUISize())
}

export const findPaneIndex = ({panesList}: IServiceRef, paneId: string) => {
  return panesList.findIndex(({id}) => id === paneId)
}

export const synPanesMaxToSize = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].synMaxToSize()
  }
  return sum
}

export const synPanesMinToSize = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].synMinToSize()
  }
  return sum
}

export const getResizerSum = (panesList: PaneModel[], start: number, end: number, resizerSize: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    if (panesList[i].visibility) {
      sum += resizerSize
    }
  }
  return sum
}

export const getMaxSizeSum = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].maxSize
  }
  return sum
}

export const getMinSizeSum = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].minSize
  }
  return sum
}

export const setDownMaxLimits = (panesList: PaneModel[], index: number) => {
  for (let i = 0; i <= index; i++) {
    panesList[i].synSizeToMaxSize()
  }

  for (let i = index + 1; i < panesList.length; i++) {
    panesList[i].synSizeToMinSize()
  }
}

export const setUpMaxLimits = (panesList: PaneModel[], index: number) => {
  for (let i = 0; i <= index; i++) {
    panesList[i].synSizeToMinSize()
  }

  for (let i = index + 1; i < panesList.length; i++) {
    panesList[i].synSizeToMaxSize()
  }
}

export const createPaneList = ({panesRefs, children, isVertical}: any) => {
  return panesRefs
    ?.current?.map((pane: any, index: number) => new PaneModel(pane, index, children[index], isVertical))
}
