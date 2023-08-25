/* eslint-disable no-unused-vars */
import { DIRECTIONS, RIGHT_BUTTON_VALUE } from './constant';

export const isNotRightButtonPressed = (e) => e.button !== RIGHT_BUTTON_VALUE;

export const getMovementDirection = (e) => {
  const { movementX, movementY } = e;
  const direction = movementY < 0 ? DIRECTIONS.UP : DIRECTIONS.DOWN;
  return direction;
};

export const isDirectionUpFn = (e) => e.movementY < 0;

export const isDirectionDown = (e) => e.movementY > 0;
