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
    isFiniteMaxSize = false
    isNoMinSize = false
    defaultMaxSize
    defaultMinSize

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
        this.defaultMinSize = minSize
        this.isFiniteMaxSize = Number.isFinite(maxSize)
        this.isNoMinSize = minSize === ZERO

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

    setMaxSize (limit) {
        // It will still have to run for no finite
        if(this.isFiniteMaxSize) {

            if(limit < this.size) {
                this.maxSize = this.size
                return
            }

            this.maxSize = limit < this.defaultMaxSize ? limit : this.defaultMaxSize
        } else {
            this.maxSize = limit
        }
        console.log('maxSize', this.maxSize, 'limit', limit, 'defaut', this.defaultMaxSize)
    }

    setMinSize (limit) {
        if(limit > this.size) {
            this.minSize = this.size
            return
        }
        this.minSize = limit > this.defaultMinSize ? limit : this.defaultMinSize
    }
}