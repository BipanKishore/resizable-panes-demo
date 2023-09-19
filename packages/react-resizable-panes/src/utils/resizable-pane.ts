import {IServiceRef} from '../@types'
import {MINUS_ONE} from '../constant'
import {PaneModel} from '../models/pane-model'
import {getList, keyConsole, localConsole, paneConsole, setPaneList} from './development-util'
import {getMaxSizeSum, getMinSizeSum, getResizerSum, synPanesMaxToSize, synPanesMinToSize} from './panes'

export const goingDownLogic = (e: any, {axisCoordinate, panesList, activeIndex}: IServiceRef) => {
  let sizeChange = e.mouseCoordinate - axisCoordinate
  console.log('goingDownLogic', sizeChange)
  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
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
  console.log('goingUpLogic', sizeChange)
  if (sizeChange < 0) {
    // throw new Error('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
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

export const setCurrentMinMax = (serviceRefCurrent: IServiceRef, index?: number) => {
  const {panesList, activeIndex} = serviceRefCurrent
  const {maxPaneSize} = getMaxContainerSizes(serviceRefCurrent)
  const idx = index || activeIndex
  const nextIdx = idx + 1
  const aMaxChangeUp = panesList[idx].getMinDiff()
  const bMaxChangeUp = panesList[nextIdx].getMaxDiff()

  setPaneList(panesList, ['minSize', 'maxSize'], null)

  minMaxLogicUp(panesList, aMaxChangeUp - bMaxChangeUp, idx, nextIdx, 0, maxPaneSize)

  localConsole(getList(panesList, 'minSize'), 'minSize')
  localConsole(getList(panesList, 'maxSize'), 'maxSize')
  // setPaneList(panesList, ['minSize', 'maxSize'], null)
  const aMaxChangeDown = panesList[nextIdx].getMinDiff()
  const bMaxChangeDown = panesList[idx].getMaxDiff()
  minMaxLogicDown(panesList, bMaxChangeDown - aMaxChangeDown, idx, nextIdx, 0, maxPaneSize)
  // paneConsole(panesList, 'minSize')
  // paneConsole(panesList, 'maxSize')
  console.log('minSize ', getList(panesList, 'minSize'))
  console.log('maxSize ', getList(panesList, 'maxSize'))
}

export const calculateAxes = (serviceRefCurrent: any) => {
  const {panesList, resizersList, activeIndex} = serviceRefCurrent

  const {maxTopAxis} = getMaxContainerSizes(serviceRefCurrent)
  const idx = activeIndex

  const resizerSizeHalf = Math.floor(resizersList[idx].current.getSize() / 2)
  const resizerAddon = getResizerSum(resizersList, 0, idx - 1) + resizerSizeHalf

  const bottomAxis = maxTopAxis + getMaxSizeSum(panesList, 0, idx) + resizerAddon
  const topAxis = maxTopAxis + getMinSizeSum(panesList, 0, idx) + resizerAddon
  localConsole({
    resizerAddon,
    bottomAxis,
    topAxis
  }, 'calculateAxes')
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

  // keyConsole({aIndex, bIndex, value, sum}, 'newMinMaxLogicUpnewMinMaxLogicUp')
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

export const hideLogic = (indexToHide: number, {panesList, resizersList}: any) => {
  // No need to add if we are hiding last pane
  const sizeChangeResizer = resizersList[indexToHide]?.current.getSize() ?? 0
  let sizeChange = panesList[indexToHide].setVisibility(false) + sizeChangeResizer

  for (let i = indexToHide - 1; i > MINUS_ONE; i--) {
    sizeChange = panesList[i].addVisibilitySize(sizeChange)
  }

  for (let i = indexToHide + 1; i < panesList.length; i++) {
    sizeChange = panesList[i].addVisibilitySize(sizeChange)
  }
}

export const showPaneLogic = (indexToShow: number, {panesList, resizersList}: any) => {
  const sizeChangeResizer = resizersList[indexToShow]?.current.getSize() ?? 0
  let sizeChange = panesList[indexToShow].setVisibility(true) + sizeChangeResizer

  for (let i = indexToShow - 1; i > MINUS_ONE; --i) {
    sizeChange = panesList[i].removeVisibilitySize(sizeChange)
  }

  for (let i = indexToShow + 1; i < panesList.length; i++) {
    sizeChange = panesList[i].removeVisibilitySize(sizeChange)
  }
}

export const getMaxContainerSizes = ({getContainerRect, isVertical, panesList, resizersList} :any) => {
  const {top, height, left, width} = getContainerRect()
  const maxTopAxis = isVertical ? left : top
  const maxPaneSize = (isVertical ? width : height) - getResizerSum(resizersList, 0, panesList.length - 2)

  localStorage.setItem('maxsizes', JSON.stringify({
    maxTopAxis,
    maxPaneSize,
    height
  })
  )
  return {
    maxTopAxis,
    maxPaneSize
  }
}
