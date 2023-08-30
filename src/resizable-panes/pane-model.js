import {ZERO} from './constant'
import {toPx} from './util'

export class PaneModel {
  id
  index
  pane
  uiSize
  size
  defaultSize
  minSize
  defaultMinSize
  maxSize
  defaultMaxSize

  axisSize
  isFiniteMaxSize = false
  isNoMinSize = false
  show

  constructor (pane, index, child) {
    const {
      id, minSize = ZERO, size, maxSize = Infinity
    } = child.props

    this.id = id
    this.index = index
    this.size = size
    this.defaultSize = size
    this.pane = pane
    this.show = true
    this.uiSize = size
    this.maxSize = maxSize
    this.defaultMaxSize = maxSize
    this.minSize = minSize
    this.defaultMinSize = minSize
    this.isFiniteMaxSize = Number.isFinite(maxSize)
    this.isNoMinSize = minSize === ZERO
    if (size < minSize) {
      throw Error('Size can not be smaller than minSize for pane id ' + id)
    }

    if (size > maxSize) {
      throw Error('Size can not be greatter than maxSize for pane id ' + id)
    }

    if (minSize > maxSize) {
      throw Error('minSize can not be greatter than maxSize for pane id ' + id)
    }
  }

  setSize (newSize) {
    if (newSize >= this.minSize && newSize <= this.maxSize) {
      this.size = newSize
      this.left = ZERO
      return ZERO
    } else if (newSize > this.maxSize) {
      this.size = this.maxSize
    } else {
      this.size = this.minSize
    }
    const left = Math.abs(this.size - newSize)
    this.left = left
    return left
  }

  addSize (sizeChange) {
    const newSize = this.axisSize + sizeChange
    return this.setSize(newSize)
  }

  removeSize (sizeChange) {
    const newSize = this.axisSize - sizeChange
    return this.setSize(newSize)
  }

  setUISize () {
    this.uiSize = this.size
    this.pane.current.style.height = toPx(this.size)
    return this.size
  }

  synSizeToUI () {
    this.size = this.uiSize
  }

  syncAxisSize () {
    this.axisSize = this.size
    return this.axisSize
  }

  restore () {
    this.size = this.defaultSize
  }

  restoreLimits () {
    this.minSize = this.defaultMinSize
    this.maxSize = this.defaultMaxSize
  }

  resetMax () {
    this.maxSize = this.defaultMaxSize
    return this.maxSize
  }

  resetMin () {
    this.minSize = this.defaultMinSize
    return this.minSize
  }

  synMaxToSize () {
    this.maxSize = this.size
    return this.size
  }

  synMinToSize () {
    this.minSize = this.size
    return this.size
  }

  getMinDiff () {
    return this.size - this.defaultMinSize
  }

  getMaxDiff () {
    return this.defaultMaxSize - this.size
  }
}
