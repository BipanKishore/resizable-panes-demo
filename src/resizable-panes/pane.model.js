import {toPx} from './util'

export class Pane {
	id
	index
	pane
	size
	axisSize
	defaultSize
    show

	constructor (pane, index) {
		this.id = pane.current.id
		this.index = index
		const {
height
} = pane.current.getBoundingClientRect()
		this.size = height
		this.pane = pane
		this.defaultSize = height
		this.show = true
	}

	setUISize () {
		this.pane.current.style.height = toPx(this.size)
		return this.size
	}

	syncAxisSize () {
		this.axisSize = this.size
		return this.axisSize
	}

	restore () {
		this.size = this.defaultSize
	}

    getSizeChange () {
        return Math.abs(
            this.axisSize - this.size
        )
    }
}