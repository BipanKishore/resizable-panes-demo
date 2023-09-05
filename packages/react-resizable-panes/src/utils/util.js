import {
  DIRECTIONS, RIGHT_BUTTON_VALUE, ZERO
} from '../constant'

export const isNotRightButtonPressed = (e) => e.button !== RIGHT_BUTTON_VALUE


export const toPx = (value) => `${value}px`

export const getDirection = e => e.movement < ZERO ? DIRECTIONS.UP : DIRECTIONS.DOWN

export const findById = (list = [
], _id) => {
  return list.find(({
    id
  }) => id === _id)
}

export const synPanesMaxToSize = (panesList, start, end) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].synMaxToSize()
  }
  return sum
}

export const synPanesMinToSize = (panesList, start, end) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].synMinToSize()
  }
  return sum
}

export const getMaxSizeSum = (panesList, start, end) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].maxSize
  }
  return sum
}

export const getMinSizeSum = (panesList, start, end) => {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += panesList[i].minSize
  }
  return sum
}

export const noop = _ => _
