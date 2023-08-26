/* eslint-disable no-unused-vars */
import {
    DIRECTIONS, RIGHT_BUTTON_VALUE, ZERO
} from './constant'

export const isNotRightButtonPressed = (e) => e.button !== RIGHT_BUTTON_VALUE

export const getMovementDirection = (e) => {
    const {
        movementX, movementY
    } = e
    const direction = movementY < ZERO ? DIRECTIONS.UP : DIRECTIONS.DOWN
    return direction
}

export const isDirectionUpFn = (e) => e.movementY < ZERO

export const isDirectionDown = (e) => e.movementY > ZERO

export const toPx = (value) => `${value}px`

export const getDirection = e => e.movementY < ZERO ? DIRECTIONS.UP : DIRECTIONS.DOWN

export const findById = (list = [
], _id) => {
    return list.find(({
        id
    }) => id === _id)
}