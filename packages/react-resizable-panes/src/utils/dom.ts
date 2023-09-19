import {IResizableEvent, SplitType, IJoinClassNameParam} from '../@types'
import {DIRECTIONS, RIGHT_BUTTON_VALUE, ZERO} from '../constant'

export const getSizeStyle = (isVertical: boolean, size: number) => {
  const style: any = {}
  const px = toPx(size)
  if (!isVertical) {
    style.height = px
  } else {
    style.width = px
  }
  return style
}

export const isNotRightButtonPressed = (e: MouseEvent) => e.button !== RIGHT_BUTTON_VALUE

export const toPx = (size: number) => `${size}px`

export const joinClassName = (param: IJoinClassNameParam, notRequired: boolean | any = false) => {
  if (notRequired) {
    return ''
  }
  const keys = Object.keys(param)
  return keys.map((key) => param[key] ? key : '').join(' ')
}

export const getContainerClass = (isVertical: boolean, className: string) => {
  return joinClassName({
    'd-flex': true,
    'f-row w-fit-content': isVertical,
    'f-column': !isVertical,
    [className]: className
  })
}

export const getResizableEvent = (e: any, isVertical: boolean): IResizableEvent => {
  let resizeEvent
  if (isVertical) {
    const {clientX, movementX} = e
    resizeEvent = {
      mouseCoordinate: clientX,
      movement: movementX
    }
  } else {
    const {clientY, movementY} = e
    resizeEvent = {
      mouseCoordinate: clientY,
      movement: movementY
    }
  }
  // keyConsole({...resizeEvent})
  return resizeEvent
}

export const getDirection = (e: IResizableEvent) => e.movement < ZERO ? DIRECTIONS.UP : DIRECTIONS.DOWN
