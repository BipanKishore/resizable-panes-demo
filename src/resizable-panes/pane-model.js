import {ZERO} from './constant'
import {keyConsole, toPx} from './util'

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
        if(size < minSize) {
            throw Error('Size can not be smaller than minSize for pane id ' + id)
        }

        if(size > maxSize) {
            throw Error('Size can not be greatter than maxSize for pane id ' + id)
        }

        if(minSize > maxSize) {
            throw Error('minSize can not be greatter than maxSize for pane id ' + id)

        }

    }

    newSetSize (newSize) {
        if(newSize >= this.minSize && newSize <= this.maxSize) {
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
    }

    synMinToSize () {
        this.minSize = this.size
    }

    setMaxSize (newMaxSize) {
        if(this.defaultMaxSize < newMaxSize) {
            this.maxSize = this.defaultMaxSize
            console.log('size newMaxSize', this.maxSize , newMaxSize)
        }else {
            this.maxSize = newMaxSize
        }
    }

    setMinSize (newMinSize) {
        if(this.defaultMinSize > newMinSize) {
            this.minSize = this.defaultMaxSize
            console.log('size newMinSize', this.maxSize , newMinSize)
        }else {
            this.minSize = newMinSize
        }
    }

    getMinDiff () {
        return this.size - this.defaultMinSize
    }

    getMaxDiff () {
        return this.defaultMaxSize - this.size
    }

    setMinChangePossible (aMaxChange, bMaxChange, nextAMaxChange) {
        let aMaxChangePossible
        const orignalAMaxChange = this.getMinDiff()
        if(orignalAMaxChange === aMaxChange) {
            aMaxChangePossible = bMaxChange
        } else {
            aMaxChangePossible = orignalAMaxChange - nextAMaxChange
        }
        keyConsole({aMaxChange, aMaxChangePossible, nextAMaxChange, orignalAMaxChange})
        this.minSize = this.size - aMaxChangePossible
    }

    // (bMaxChange, aMaxChange, nextBMaxChange)
    setMaxChangePossible (bMaxChange, aMaxChange, nextBMaxChange) {
        let aMaxChangePossible
        const orignalBMaxChange = this.getMaxDiff()
        if(orignalBMaxChange === bMaxChange) {
            aMaxChangePossible = aMaxChange
        } else {
            aMaxChangePossible = orignalBMaxChange - nextBMaxChange
        }
        keyConsole({aMaxChangePossible, bMaxChange, nextBMaxChange, orignalBMaxChange})
        this.maxSize = this.size + aMaxChangePossible
    }
}