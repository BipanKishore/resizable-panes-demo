import {RefObject} from 'react'
import {PaneModel} from '../models/pane-model'
import {onResizeType} from './component-types'
import {IKeyToBoolMap} from './general-type'

export interface IResizableApi {
    toFullSize: (paneId: string) => void,
    closeFullSize: () => void,
    restoreDefault: () => void,
    toFullPage: (paneId: string) => void,
    setVisibility: (map: IKeyToBoolMap) => void
}

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
    isVertical?: boolean,
    storage?: any,
    resizerRefs?: any,
    api?: IResizableApi
}

export interface IUseResizablePanesParams {
    children: any,
    containerRef: any,
    panesRefs: any,
    resizerRefs: any,
    resizerSize: any,
    isVertical: boolean,
    onReady: (api: IResizableApi) => void,
    storage: any,
    onResizeStart?: onResizeType,
    onChangeVisibility: (api: IKeyToBoolMap) => unknown
  }

export interface IInitPaneService {
    children: any[],
    containerRef: any,
    panesRefs: any[],
    resizerSize: number,
    isVertical: boolean,
    storage: any
}
