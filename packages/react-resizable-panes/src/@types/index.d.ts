type SplitType = 'horizontal' | 'vertical'
type StorageType = 'local' | 'session'

export interface IResizableEvent {
    mouseCoordinate: number,
    movement: number
}
