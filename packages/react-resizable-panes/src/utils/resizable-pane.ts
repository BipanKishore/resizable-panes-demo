import {MINUS_ONE, ZERO} from '../constant'
import {PaneModel} from '../models/pane-model'
import {keyConsole, paneConsole} from './development-util'
import {getMaxSizeSum, getMinSizeSum, synPanesMaxToSize, synPanesMinToSize} from './panes'

export const goingDownLogic = (e: any, {axisCoordinate, panesList, activeIndex}: any) => {
  let sizeChange = e.mouseCoordinate - axisCoordinate
  if (sizeChange < ZERO) {
    return
  }
  let sizeChangeUp = sizeChange

  for (let i = activeIndex; i > MINUS_ONE; i -= 1) {
    sizeChangeUp = panesList[i].addSize(sizeChangeUp)
  }

  sizeChange -= sizeChangeUp

  for (let i = activeIndex + 1; i < panesList.length; i += 1) {
    sizeChange = panesList[i].removeSize(sizeChange)
  }
}

export const goingUpLogic = (e: any, {axisCoordinate, panesList, activeIndex}: any) => {
  let sizeChange = axisCoordinate - e.mouseCoordinate
  if (sizeChange < ZERO) {
    return
  }
  let sizeChangeUp = sizeChange

  for (let i = activeIndex + 1; i < panesList.length; i++) {
    sizeChangeUp = panesList[i].addSize(sizeChangeUp)
  }

  sizeChange -= sizeChangeUp
  for (let i = activeIndex; i > MINUS_ONE; i -= 1) {
    sizeChange = panesList[i].removeSize(sizeChange)
  }
}

export const setCurrentMinMax = ({panesList, maxPaneSize, activeIndex}: any, index?: number) => {
  // initMinMaxLogic()
//   const {panesList, maxPaneSize, activeIndex} = serviceRef.current
  const idx = index || activeIndex
  const nextIdx = idx + 1
  const aMaxChangeUp = panesList[idx].getMinDiff()
  const bMaxChangeUp = panesList[nextIdx].getMaxDiff()

  // setPaneList(panesList, ['minSize', 'maxSize'], null)

  minMaxLogicUp(panesList, aMaxChangeUp - bMaxChangeUp, idx, nextIdx, 0, maxPaneSize)

  paneConsole(panesList, 'minSize')
  paneConsole(panesList, 'maxSize')
  // initMinMaxLogic()
  // setPaneList(panesList, ['minSize', 'maxSize'], null)
  const aMaxChangeDown = panesList[nextIdx].getMinDiff()
  const bMaxChangeDown = panesList[idx].getMaxDiff()
  minMaxLogicDown(panesList, bMaxChangeDown - aMaxChangeDown, idx, nextIdx, 0, maxPaneSize)
  paneConsole(panesList, 'minSize')
  paneConsole(panesList, 'maxSize')
}

export const calculateAxes = ({panesList, maxTopAxis, resizerSize, activeIndex}: any, index?: number) => {
//   const {panesList, maxTopAxis, resizerSize} = serviceRef.current
  const idx = index || activeIndex
  const resizerSizeHalf = Math.floor(resizerSize / 2)
  const bottomAxis = maxTopAxis + getMaxSizeSum(panesList, 0, idx) + idx * resizerSize + resizerSizeHalf
  const topAxis = maxTopAxis + getMinSizeSum(panesList, 0, idx) + idx * resizerSize + resizerSizeHalf
  return {
    bottomAxis,
    topAxis
  }
}

// eslint-disable-next-line complexity
export const minMaxLogicUp = (
  panesList: PaneModel[], value: number, aIndex: number, bIndex: number, sum = 0, maxPaneSize: number) => {
  // Failing for going up Reached Max
  const lastIndex = panesList.length - 1

  keyConsole({aIndex, bIndex, value, sum}, 'newMinMaxLogicUpnewMinMaxLogicUp')
  let nextValue
  let nextAIndex = aIndex
  let nextBIndex = bIndex
  switch (true) {
    // total 6 combination
    case aIndex > 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMin()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMinDiff() + value
          break

        case value === 0:
          sum += panesList[aIndex].resetMin()
          sum += panesList[bIndex].resetMax()
          nextAIndex = aIndex - 1
          nextBIndex = bIndex + 1
          nextValue = panesList[nextAIndex].getMinDiff() - panesList[nextBIndex].getMaxDiff()
          break

        case value > 0:
          sum += panesList[bIndex].resetMax()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMaxDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMin()
          sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
          panesList[bIndex].maxSize = maxPaneSize - sum
          return

        case value === 0:
          sum += panesList[aIndex].resetMin()
          sum += panesList[bIndex].resetMax()
          sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
          return

        case value > 0:
          // not change from previous switch
          sum += panesList[bIndex].resetMax()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMaxDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex > 0 && bIndex === lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMin()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMinDiff() + value
          break

        case value === 0:
          sum += panesList[aIndex].resetMin()
          sum += panesList[bIndex].resetMax()
          sum += synPanesMinToSize(panesList, 0, aIndex - 1)
          return

        case value > 0:
          sum += panesList[bIndex].resetMax()
          sum += synPanesMinToSize(panesList, 0, aIndex - 1)
          panesList[aIndex].minSize = maxPaneSize - sum
          return
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex === lastIndex:
      // return for every case
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMin()
          // synPanesMinToSize(panesList, bIndex + 1, lastIndex) // It wont run
          panesList[bIndex].maxSize = maxPaneSize - sum
          return

        case value === 0:
          sum += panesList[aIndex].resetMin()
          sum += panesList[bIndex].resetMax()
          return

        case value > 0:
          sum += panesList[bIndex].resetMax()
          // synPanesMaxToSize(panesList, 0, aIndex - 1) // It wont Run
          panesList[aIndex].minSize = maxPaneSize - sum
          return
      }

      // ---------------------------------------------------------------------------------
    default:
      console.error('v---------------------------------------------------------------')
      break
  }
  // paneConsole('minSize')
  // paneConsole('maxSize')
  minMaxLogicUp(panesList, nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
}

// eslint-disable-next-line complexity
export const minMaxLogicDown = (
  panesList: PaneModel[], value: number, aIndex: number, bIndex: number, sum = 0, maxPaneSize: number) => {
  const lastIndex = panesList.length - 1
  // keyConsole({aIndex, bIndex, value, sum})
  let nextValue
  let nextAIndex = aIndex
  let nextBIndex = bIndex
  switch (true) {
    // total 6 combination
    case aIndex > 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMax()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMaxDiff() + value
          break

        case value === 0:
          sum += panesList[aIndex].resetMax()
          sum += panesList[bIndex].resetMin()
          nextAIndex = aIndex - 1
          nextBIndex = bIndex + 1
          nextValue = panesList[nextAIndex].getMaxDiff() - panesList[nextBIndex].getMinDiff()
          break

        case value > 0:
          sum += panesList[bIndex].resetMin()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMinDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex < lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMax()
          sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
          panesList[bIndex].minSize = maxPaneSize - sum
          return

        case value === 0:
          sum += panesList[aIndex].resetMax()
          sum += panesList[bIndex].resetMin()
          sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
          return

        case value > 0:
          // not change from previous switch
          sum += panesList[bIndex].resetMin()
          nextBIndex = bIndex + 1
          nextValue = value - panesList[nextBIndex].getMinDiff()
          break
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex > 0 && bIndex === lastIndex:
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMax()
          nextAIndex = aIndex - 1
          nextValue = panesList[nextAIndex].getMaxDiff() + value
          break

        case value === 0:
          sum += panesList[aIndex].resetMax()
          sum += panesList[bIndex].resetMin()
          sum += synPanesMaxToSize(panesList, 0, aIndex - 1)
          return

        case value > 0:
          sum += panesList[bIndex].resetMin()
          sum += synPanesMaxToSize(panesList, 0, aIndex - 1)
          panesList[aIndex].maxSize = maxPaneSize - sum
          return
      }
      break
      // ---------------------------------------------------------------------------------
    case aIndex === 0 && bIndex === lastIndex:
      // return for every case
      switch (true) {
        case value < 0:
          sum += panesList[aIndex].resetMax()
          // synPanesMinToSize(panesList, bIndex + 1, lastIndex) // It wont run
          panesList[bIndex].minSize = maxPaneSize - sum
          return

        case value === 0:
          sum += panesList[bIndex].resetMin()
          sum += panesList[aIndex].resetMax()
          return

        case value > 0:
          sum += panesList[bIndex].resetMin()
          // synPanesMaxToSize(panesList, 0, aIndex - 1) // It wont Run
          panesList[aIndex].maxSize = maxPaneSize - sum
          return
      }

      // ---------------------------------------------------------------------------------
    default:
      console.error('v---------------------------------------------------------------')
      break
  }

  minMaxLogicDown(panesList, nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
}