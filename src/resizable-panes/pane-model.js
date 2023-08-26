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

		console.log(this)
	}

	validateSize () {
		if(this.size < this.minSize) {
			return false
		} else if(this.size > this.maxSize) {
			return false
		}
		return true
	}

	setUISize () {
		this.uiSize = this.size
		this.pane.current.style.height = toPx(this.size)
	}

	syncAxisSize () {
		this.axisSize = this.size
		return this.axisSize
	}

	synSizeToUI () {
		this.size = this.uiSize
	}

	restore () {
		this.size = this.defaultSize
	}

    getSizeChange () {
        return Math.abs(this.axisSize - this.size)
    }
}