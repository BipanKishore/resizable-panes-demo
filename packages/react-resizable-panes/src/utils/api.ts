import {IKeyToBoolMap, IServiceRef} from '../@types'
import {getList, paneConsole} from './development-util'
import {setUISizesFn} from './panes'
import {getMaxContainerSizes, hideLogic, showPaneLogic} from './resizable-pane'
import {isUndefinedOrNull} from './util'

export const toFullPageFn = (param: IServiceRef, paneId: string) => {
  const {panesList} = param
  panesList.forEach((pane) => {
    pane.synPreservedSize()
    if (pane.id === paneId) {
      pane.pane.current.onFullPage()
    }
  })
}

export const toFullSizeFn = (serviceRefCurrent: IServiceRef, paneId: string) => {
  const {panesList, resizerSize} = serviceRefCurrent

  const {maxPaneSize} = getMaxContainerSizes(serviceRefCurrent)
  panesList.forEach((pane) => {
    pane.synPreservedSize()
    if (pane.id === paneId) {
      // need to only add visible resizerSize
      pane.size = maxPaneSize + (panesList.length - 1) * resizerSize
      pane.pane.current.onFullSize()
    } else {
      pane.size = 0
    }
  })
  setResizersVisibility(serviceRefCurrent, false)
  setUISizesFn(serviceRefCurrent)
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
  panesList.forEach((pane) => pane.restore())
  setResizersVisibility(param, true)
  setUISizesFn(param)
}

// eslint-disable-next-line complexity
export const setVisibilityFn = (param: IServiceRef, idMap: IKeyToBoolMap) => {
  console.log('v-- idMap', idMap)
  const {panesList, resizerRefs} = param
  const keys = Object.keys(idMap)

  for (let i = 0; i < panesList.length; i++) {
    const pane = panesList[i]
    const {id} = pane
    if (keys.includes(id)) {
      const visibility = idMap[id]

      resizerRefs.current[i].current?.setVisibility(visibility ?? pane.visibility)
      if (isUndefinedOrNull(visibility) || visibility === pane.visibility) {
        continue
      }

      if (visibility) {
        showPaneLogic(pane.index, param)
      } else {
        hideLogic(pane.index, param)
      }
    }
    console.log('v---- idMap[id]', id, idMap[id])
    const visibleCount = getList(panesList, 'visibility').filter((value) => value).length
  }
  setUISizesFn(param)
}

export const setResizersVisibility = (param: IServiceRef, visibility: boolean) => {
  const {resizerRefs} = param
  for (const resizer of resizerRefs.current) {
    resizer.current?.setVisibility(visibility)
  }
}
