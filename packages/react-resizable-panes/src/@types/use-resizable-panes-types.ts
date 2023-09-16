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
    resizerSize?: number,
    panesList?: PaneModel[],
    activeIndex?: number
    prevDirection?: string,
    axisCoordinate?: number,
    isVertical?: boolean,
    resizerRefs?: any,
}

export interface IUseResizablePanesParams {
    children: any,
    containerRef: any,
    panesRefs: any,
    resizerRefs: any,
    resizerSize: any,
    isVertical: boolean,
    onReady: (api: IResizableApi) => void,
    onResizeStart?: onResizeType,
    onChangeVisibility: (mapKeyToBool: IKeyToBoolMap) => unknown
  }

export interface IInitPaneService {
    children: any[],
    containerRef: any,
    panesRefs: any[],
    resizerSize: number,
    isVertical: boolean
}

export type IPaneModelKey = keyof PaneModel
