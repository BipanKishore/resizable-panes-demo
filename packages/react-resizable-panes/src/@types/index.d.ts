
type SplitType = 'horizontal' | 'vertical'
type StorageType = 'local' | 'session'

export interface IResizableEvent {
    mouseCoordinate: number,
    movement: number
}

export interface IResizablePanes {
    children: any[],
    resizerSize: number,
    onReady: () => {}, 
    split: SplitType,
    storage?: any
  }

  interface IAnyMap {
    [key: string]: any
  }