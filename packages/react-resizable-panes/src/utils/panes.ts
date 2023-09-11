import {IServiceRef} from '../@types'
import {PaneModel} from '../models/pane-model'

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

export const findPaneIndex = (param: IServiceRef, paneId: string) => {
  const {panesList} = param
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
    panesList[i].size = panesList[i].maxSize
  }

  for (let i = index + 1; i < panesList.length; i++) {
    panesList[i].size = panesList[i].minSize
  }
}

export const setUpMaxLimits = (panesList: PaneModel[], index: number) => {
  for (let i = 0; i <= index; i++) {
    panesList[i].size = panesList[i].minSize
  }

  for (let i = index + 1; i < panesList.length; i++) {
    panesList[i].size = panesList[i].maxSize
  }
}
