export interface IKeyToBoolMap {
    [name: string]: boolean
  }
export interface IMapIdToSize {
    [key:string] : number
  }

export interface IAnyMap {
      [key: string]: any
    }

export type SplitType = 'horizontal' | 'vertical'

export interface IResizableEvent {
    mouseCoordinate: number,
    movement: number
}
