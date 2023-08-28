import {ZERO} from './constant'
import {toPx} from './util'

export class PaneModel {
    id
    index
    pane
    size
    axisSize
    defaultSize
    show
    mouseDownSize

    constructor (pane, index, child) {
        const{
            id, minSize = ZERO, size, maxSize = Infinity
        } = child.props

        this.id = id
        this.minSize = minSize
        this.index = index
        this.size = size
        this.defaultSize = size
        this.pane = pane
        this.show = true
        this.uiSize = size
        this.maxSize = maxSize
        this.defaultMaxSize = maxSize
    }

    resetDefaultMinAndMaxSize () {
        this.maxSize = this.defaultMaxSize
    }

    validateSize () {
        if(this.size < this.minSize) {
            return false
        } else if(this.size > this.maxSize) {
            return false
        }
        return true
    }

    newSetSize (newSize) {
        if(newSize > this.minSize && newSize <= this.maxSize) {
            this.size = newSize
            return ZERO
        } else if (newSize > this.maxSize) {
            this.size = this.maxSize
        } else {
            this.size = this.minSize
        }
        return Math.abs(this.size - newSize)
    }

    addSize (sizeChange) {
        const newSize = this.axisSize + sizeChange
        return this.newSetSize(newSize)
    }

    removeSize (sizeChange) {
        const newSize = this.axisSize - sizeChange
        return this.newSetSize(newSize)
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

    getSizeChange () {
        return Math.abs(this.axisSize - this.size)
    }

    setMouseDownSize () {
        this.mouseDownSize = this.size
    }

    setCurrentLimits (isActive) {

    }
}