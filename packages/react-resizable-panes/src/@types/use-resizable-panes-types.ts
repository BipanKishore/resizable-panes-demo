import {PaneModel} from '../models/pane-model'
import {IResizablePanesProps} from './component-types'
import {IKeyToBoolMap} from './general-type'

export interface IResizableApi {
    toFullSize: (paneId: string) => void,
    closeFullSize: () => void,
    restoreDefault: () => void,
    toFullPage: (paneId: string) => void,
    setVisibility: (map: IKeyToBoolMap) => void
}

export interface IServiceRef{
    getContainerRect?: any,
    resizerSize?: number,
    panesList?: PaneModel[],
    activeIndex?: number
    prevDirection?: string,
    axisCoordinate?: number,
    isVertical?: boolean,
    resizerRefs?: any,
}

export interface IUseResizablePanesParams {
    getContainerRect: any,
    panesRefs: any,
    resizerRefs: any,
    resizerSize: any,
    isVertical: boolean,
    props?: IResizablePanesProps
  }

export interface IInitPaneService {
    children: any[],
    getContainerRect: any,
    panesRefs: any[],
    resizerSize: number,
    isVertical: boolean
}

export type IPaneModelKey = keyof PaneModel
