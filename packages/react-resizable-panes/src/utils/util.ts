import {IResizableEvent} from '../@types'
import {
  DIRECTIONS, RIGHT_BUTTON_VALUE, ZERO
} from '../constant'
import {PaneModel} from '../models/pane-model'

export const isNotRightButtonPressed = (e: MouseEvent) => e.button !== RIGHT_BUTTON_VALUE

export const toPx = (size: number) => `${size}px`

export const getDirection = (e: IResizableEvent) => e.movement < ZERO ? DIRECTIONS.UP : DIRECTIONS.DOWN

export const findById = (list: PaneModel[] = [
], _id: string) => {
  return list.find(({
    id
  }) => id === _id)
}

export const synPanesMaxToSize = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].synMaxToSize()
  }
  return sum
}

export const synPanesMinToSize = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].synMinToSize()
  }
  return sum
}

export const getMaxSizeSum = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].maxSize
  }
  return sum
}

export const getMinSizeSum = (panesList: PaneModel[], start: number, end: number) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].minSize
  }
  return sum
}
