import {IKeyToBoolMap, IServiceRef} from '../@types'
import {PaneModel} from '../models/pane-model'
import {getList} from './development-util'
import {setUISizesFn} from './panes'
import {getMaxContainerSizes, hideLogic, showPaneLogic} from './resizable-pane'
import {isUndefinedOrNull} from './util'

export const toFullPageFn = (panesList: PaneModel[], paneId: string) => {
  panesList.forEach((pane) => {
    pane.synPreservedSize()
    if (pane.id === paneId) {
      pane.pane.onFullPage()
    }
  })
}

export const toFullSizeFn = (serviceRefCurrent: any, paneId: string) => {
  const {panesList, resizersList} = serviceRefCurrent

  const {maxPaneSize} = getMaxContainerSizes(serviceRefCurrent)
  panesList.forEach((pane: any, index: number) => {
    pane.synPreservedSize()
    if (pane.id === paneId) {
      pane.size = maxPaneSize + (panesList.length - 1) * resizersList[index].current.getSize()
      pane.pane.onFullSize()
    } else {
      pane.size = 0
    }
  })
  setResizersVisibility(serviceRefCurrent, false)
  setUISizesFn(serviceRefCurrent.panesList)
}

export const closeFullSizeFn = (param: IServiceRef) => {
  const {panesList} = param
  panesList.forEach((pane) => {
    pane.synSizeToStored()
    pane.pane.onCloseFullSize()
  })
  setResizersVisibility(param, true)
  setUISizesFn(param.panesList)
}

export const restoreDefaultFn = (param: IServiceRef) => {
  const {panesList} = param
  panesList.forEach((pane) => pane.restore())
  setResizersVisibility(param, true)
  setUISizesFn(param.panesList)
}

// eslint-disable-next-line complexity
export const setVisibilityFn = (param: any, idMap: IKeyToBoolMap) => {
  const {panesList, resizersList} = param
  const keys = Object.keys(idMap)

  for (let i = 0; i < panesList.length; i++) {
    const pane = panesList[i]
    const {id} = pane
    if (keys.includes(id)) {
      const visibility = idMap[id]

      resizersList[i]?.current?.setVisibility(visibility ?? pane.visibility)
      if (isUndefinedOrNull(visibility) || visibility === pane.visibility) {
        continue
      }

      if (visibility) {
        showPaneLogic(pane.index, param)
      } else {
        hideLogic(pane.index, param)
      }
    }
    const visibleCount = getList(panesList, 'visibility').filter((value) => value).length
  }
  setUISizesFn(param.panesList)
}

export const setResizersVisibility = (param: any, visibility: boolean) => {
  const {resizersList} = param
  for (const resizer of resizersList) {
    resizer?.current?.setVisibility(visibility)
  }
}
