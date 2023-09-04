
type SplitType = 'horizontal' | 'vertical'

export interface IResizableEvent {
    mouseCoordinate: number,
    movement: number
}

export interface IResizablePanes {
    children: any[],
    resizerSize: number,
    onReady: () => {}, 
    split: SplitType
  }