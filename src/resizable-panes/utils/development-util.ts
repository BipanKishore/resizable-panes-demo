import { PaneModel } from "../models/pane-model"

export const keyConsole = (obj: any = {}, add = 'v--') => {
    const keys = Object.keys(obj)
    const str = keys.reduce((p, v) => p + ' ' + v + ': ' + obj[v], add)
    console.log(str)
  }


  export const minMaxTotal = (panesList: PaneModel[], MaxPaneSize: number) => {
    let sum = 0
    panesList
      .forEach(({minSize, maxSize}) => {
        maxSize = Number.isFinite(maxSize) ? maxSize : 0
        sum += ((maxSize || 0) + (minSize || 0))
      })

    // const paneSizeTotal = sum
    const paneSizeTotal = sum / 2
    console.warn('SIZE SUM', sum, paneSizeTotal, 'max allowd', MaxPaneSize)
    if ((MaxPaneSize !== sum && MaxPaneSize !== paneSizeTotal)) {
      console.error('Max limit cross, Max Pane Size:' + MaxPaneSize + ' Sum:' + paneSizeTotal)
      //  throw new Error ('Max limit cross, Max Pane Size:' + MaxPaneSize + ' Sum:' + paneSizeTotal)
    }
  }

  export const getList = (panesList: PaneModel[], key: string) =>{
    return panesList.map((pane: any) => pane[key])
  }

export const paneConsole = (panesList: PaneModel[], key: string) => {
    console.log('v-- ' + key, getList(panesList, key))
  }

  export const setPaneList   = (panesList: PaneModel[], keys: string[] = [], value: any = null) => {
    panesList.forEach((pane: any) => keys.forEach((key: string) => (pane[key] = value)))
    keys.forEach((key) => paneConsole(panesList, key))
  }