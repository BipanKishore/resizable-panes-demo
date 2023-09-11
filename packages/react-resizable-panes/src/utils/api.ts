import {IKeyToBoolMap, IServiceRef} from '../@types'
import {setUISizesFn} from './panes'

export const toFullPageFn = (param: IServiceRef, paneId: string) => {
  const {panesList} = param
  panesList.forEach((pane) => {
    if (pane.id === paneId) {
      pane.synPreservedSize()
      pane.removeProperty()
      pane.pane.current.onFullPage()
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
      pane.pane.current.onFullSize()
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
    pane.pane.current.onCloseFullSize()
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

export const setVisibilityFn = (param: IServiceRef, idMap: IKeyToBoolMap) => {
  const {panesList, resizerRefs} = param
  const keys = Object.keys(idMap)

  const sizeChangeMap: any = {}

  for (let i = 0; i < panesList.length; i++) {
    const pane = panesList[i]
    const {id, size} = pane
    if (keys.includes(id)) {
      const visibility = idMap[id]
      if (visibility) {
        sizeChangeMap[pane.id] = size
        pane.setFixSize(pane.storedSize)
        pane.visibility = true
      } else {
        pane.synPreservedSize()
        sizeChangeMap[pane.id] = -size
        pane.setFixSize(0)
        pane.visibility = false
      }
      resizerRefs.current[i].current.setVisibility(idMap[id])
    }
  }
  setUISizesFn(param)
  return sizeChangeMap
}

export const setResizersVisibility = (param: IServiceRef, visibility: boolean) => {
  const {resizerRefs} = param
  for (const resizer of resizerRefs.current) {
    resizer.current?.setVisibility(visibility)
  }
}
