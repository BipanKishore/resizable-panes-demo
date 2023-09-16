import {ZERO} from '../constant'

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
    if (this.visibility) {
      if (newSize >= this.minSize && newSize <= this.maxSize) {
        this.size = newSize
        this.left = ZERO
        return ZERO
      } else if (newSize > this.maxSize) {
        this.size = this.maxSize
      } else {
        this.size = this.minSize
      }
    }
    const left = Math.abs(this.size - newSize)
    this.left = left
    return left
  }

  setVisibilitySize (newSize: number) {
    if (this.visibility) {
      if (newSize >= this.defaultMinSize && newSize <= this.defaultMaxSize) {
        this.size = newSize
        this.left = ZERO
        return ZERO
      } else if (newSize > this.defaultMaxSize) {
        this.size = this.defaultMaxSize
      } else {
        this.size = this.defaultMinSize
      }
    }

    const left = Math.abs(this.size - newSize)
    this.left = left
    return left
  }

  addVisibilitySize (sizeChange: number) {
    const newSize = this.size + sizeChange
    return this.setVisibilitySize(newSize)
  }

  removeVisibilitySize (sizeChange: number) {
    const newSize = this.size - sizeChange
    return this.setVisibilitySize(newSize)
  }

  setVisibility (visibility: boolean) {
    if (this.visibility === visibility) {
      return ZERO
    }

    this.visibility = visibility
    if (visibility) {
      this.size = this.storedSize
      this.minSize = this.defaultMinSize
      this.maxSize = this.defaultMaxSize
      this.storedSize = null
      return this.size
    } else {
      this.storedSize = this.size
      this.size = 0
      this.minSize = 0
      this.maxSize = 0
      return this.storedSize
    }
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
    this.pane.current.setSize(this.size)
    return this.size
  }

  synPreservedSize () {
    if (!this.storedSize) {
      this.storedSize = this.size
    }
  }

  synSizeToStored () {
    this.size = this.storedSize
    this.storedSize = null
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

  resetMax (reduce = 0) {
    if (this.visibility) {
      this.maxSize = this.defaultMaxSize - reduce
      return this.maxSize
    }
    return ZERO
  }

  resetMin () {
    if (this.visibility) {
      this.minSize = this.defaultMinSize
      return this.minSize
    }
    return ZERO
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
    if (this.visibility) {
      return this.size - this.defaultMinSize
    }
    return ZERO
  }

  getMaxDiff () {
    if (this.visibility) {
      return this.defaultMaxSize - this.size
    }
    return ZERO
  }

  synSizeToMinSize () {
    if (this.visibility) {
      this.size = this.minSize
    }
  }

  synSizeToMaxSize () {
    if (this.visibility) {
      this.size = this.maxSize
    }
  }
}
