import {RefObject} from 'react'
import {SplitType} from '.'
import {IMapIdToSize} from './general-type'
import {IResizableApi} from './use-resizable-panes-types'

export type onResizeType = (param: IMapIdToSize) => void

export interface IResizablePanesProps {
    children: any[],
    onReady?: () => void,
    split?: SplitType,
    storage?: any,
    resizerNode?: any,
    onResizeStop?: onResizeType,
    onResizeStart?: onResizeType,
    onResize?: onResizeType,
    className?: string
  }

export interface IPane {
    className: string,
    children: any | any[],
    id: string,
    size: number,
    split?: SplitType,
    innerRef?: RefObject<HTMLDivElement>,
    maxSize?: number
    minSize?: number,
    api?: IResizableApi,
    toFullSize? : any,
    closeFullSize?: any,
    toFullPage?: any,
    isVertical?: boolean
  }
