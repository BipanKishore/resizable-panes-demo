import {IServiceRef} from '../@types/use-resizable-panes-types'
import {DIRECTIONS} from '../constant'
import {PaneModel} from '../models/pane-model'
import {subscription} from '../services/subscription'
import {getMaxContainerSizes} from './resizable-pane'

export const keyConsole = (obj: any = {}, add = 'v--') => {
  const keys = Object.keys(obj)
  const str = keys.reduce((p, v) => p + ' ' + v + ': ' + obj[v], add)
  console.log(str)
}

export const minMaxTotal = (serviceRefCurrent: IServiceRef) => {
  const {panesList} = serviceRefCurrent

  const {maxPaneSize} = getMaxContainerSizes(serviceRefCurrent)
  let sum = 0
  panesList
    .forEach(({minSize, maxSize}) => {
      maxSize = Number.isFinite(maxSize) ? maxSize : 0
      sum += ((maxSize || 0) + (minSize || 0))
    })

  // const paneSizeTotal = sum
  const paneSizeTotal = sum / 2
  console.warn('SIZE SUM', sum, paneSizeTotal, 'max allowd', maxPaneSize)
  if ((maxPaneSize !== sum && maxPaneSize !== paneSizeTotal)) {
    throw new Error('Max limit cross, Max Pane Size:' + maxPaneSize + ' Sum:' + paneSizeTotal)
    //  throw new Error ('Max limit cross, Max Pane Size:' + MaxPaneSize + ' Sum:' + paneSizeTotal)
  }
}

export const getList = (panesList: PaneModel[], key: string): unknown[] => {
  return panesList.map((pane: any) => pane[key])
}

export const paneConsole = (panesList: PaneModel[], key: string) => {
  console.log('v-- ' + key, getList(panesList, key))
}

export const setPaneList = (panesList: PaneModel[], keys: string[] = [], value: any = null) => {
  panesList.forEach((pane: any) => keys.forEach((key: string) => (pane[key] = value)))
  // keys.forEach((key) => paneConsole(panesList, key))
}

// eslint-disable-next-line complexity
export const directionBehaviourConsole = (direction: string, prevDirection: string) => {
  switch (true) {
    case prevDirection === DIRECTIONS.NONE && direction === DIRECTIONS.UP:
      console.warn('direction we have starteed Up')
      break
    case prevDirection === DIRECTIONS.NONE && direction === DIRECTIONS.DOWN:
      console.warn('direction we have starteed Down')
      break
    case prevDirection === DIRECTIONS.UP && direction === DIRECTIONS.DOWN:
      console.warn('direction UP to Down')
      break
    case prevDirection === DIRECTIONS.DOWN && direction === DIRECTIONS.UP:
      console.warn('direction Down to UP')
      break
  }
}

export const publishPanes = (e:any, panesList: PaneModel[], axisCoordinate: number) => {
  panesList.forEach((pane) => {
    subscription.publish(pane.id, {
      ...pane,
      Y: e.mouseCoordinate,
      axisCoordinate
    })
  })
}
