import {IMapIdToSize, SplitType} from '.'

export type onResizeType = (param: IMapIdToSize) => void

export interface IResizablePanesProps {
    children: any[],
    resizerSize: number,
    onReady: () => {},
    split: SplitType,
    storage?: any,
    resizerNode?: any,
    onResizeStop?: onResizeType,
    onResizeStart?: onResizeType,
    onResize?: onResizeType,
  }

export interface IPane {
    className: string,
    children: any[],
    id: string,
    size: number,
    split: SplitType
  }
