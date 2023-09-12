import {IAnyMap} from '../@types'
import {PaneModel} from '../models/pane-model'

export const noop = (_: any): any => _

export const findById = (list: PaneModel[] = [
], _id: string) => {
  return list.find(({
    id
  }) => id === _id)
}

export const createMap = (paneList: PaneModel[], key: keyof PaneModel) => {
  const map: IAnyMap = {}
  paneList.forEach((pane) => {
    const {id} = pane
    map[id] = pane[key] as PaneModel
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
