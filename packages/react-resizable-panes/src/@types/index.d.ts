type SplitType = 'horizontal' | 'vertical'
type StorageType = 'local' | 'session'

export interface IResizableEvent {
    mouseCoordinate: number,
    movement: number
}

export interface IMapIdToSize {
  [key:string] : number
}

export interface IAnyMap {
    [key: string]: any
  }
