import { PaneModel } from "../models/pane-model"

export interface IServiceRef{
    containerRef?: any,
    panesRefs?: any
    resizerSize?: number,
    panesList?: PaneModel[],
    maxTopAxis?: number,
    maxPaneSize?: number,
    activeIndex?: number
    topAxis?: number,
    bottomAxis?: number,
    prevDirection?: string,
    axisCoordinate?: number,
    isVertical?: boolean
}

export interface IResizableApi {
    toFullSize: (paneId: string) => void,
    closeFullSize: () => void
}


export interface IUseResizablePanesParams {
    children: any,
    containerRef: any,
    panesRefs: any,
    resizerSize: any,
    isVertical: boolean,
    onReady: (api: IResizableApi) => void
  }
  

export interface IUseResizablePanesParams {
    children: any,
    containerRef: any,
    panesRefs: any,
    resizerSize: any,
    isVertical: boolean,
    onReady: (api: IResizableApi) => void
  }
  

  export interface IPanesIdBoolMap {
    [name: string]: boolean
  }

  