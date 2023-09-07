import {Ref, RefObject} from 'react'
import {SplitType} from '.'
import {IMapIdToSize} from './general-type'

export type onResizeType = (param: IMapIdToSize) => void

export interface IResizablePanesProps {
    children: any[],
    resizerSize: number,
    onReady: () => void,
    split: SplitType,
    storage?: any,
    resizerNode?: any,
    onResizeStop?: onResizeType,
    onResizeStart?: onResizeType,
    onResize?: onResizeType,
    name: string
  }

export interface IPane {
    className: string,
    children: any[],
    id: string,
    size: number,
    split: SplitType,
    innerRef: RefObject<HTMLDivElement>
  }
