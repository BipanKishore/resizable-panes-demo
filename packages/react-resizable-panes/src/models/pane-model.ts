import {ZERO} from '../constant'
import {keyConsole} from '../utils/development-util'
import {toPx} from '../utils/util'

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
  storedSize: number

  isVertical: boolean

  axisSize: number
  isFiniteMaxSize = false
  isNoMinSize = false
  visibility

  // Development Variables
  left: number

  constructor (pane: any, index: number, child: any, isVertical: boolean) {
    const {
      id, minSize = ZERO, size, maxSize = Infinity
    } = child.props

    this.id = id
    this.index = index
    this.size = size
    this.defaultSize = size
    this.pane = pane
    this.visibility = true
    this.uiSize = size
    this.maxSize = maxSize
    this.defaultMaxSize = maxSize
    this.minSize = minSize
    this.defaultMinSize = minSize
    this.isFiniteMaxSize = Number.isFinite(maxSize)
    this.isNoMinSize = minSize === ZERO
    this.isVertical = isVertical

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

  setSize (newSize: number) {
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

  addSize (sizeChange: number) {
    const newSize = this.axisSize + sizeChange
    return this.setSize(newSize)
  }

  removeSize (sizeChange: number) {
    const newSize = this.axisSize - sizeChange
    return this.setSize(newSize)
  }

  setFixSize (size: number) {
    this.size = size
  }

  setUISize () {
    this.uiSize = this.size
    if (this.isVertical) {
      this.pane.current.style.height = toPx(this.size)
    } else {
      this.pane.current.style.width = toPx(this.size)
      // keyConsole({isVertical: this.isVertical, px: toPx(this.size)})
    }

    return this.size
  }

  synPreservedSize () {
    this.storedSize = this.size
  }

  synSizeToStored () {
    this.size = this.storedSize
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

  removeProperty (property: string) {
    this.pane.current.style.removeProperty('height')
    this.pane.current.style.removeProperty('width')
  }
}
