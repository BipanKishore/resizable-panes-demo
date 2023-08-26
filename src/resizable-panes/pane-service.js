/* eslint-disable no-unused-vars */
import {
DIRECTIONS, MINUS_ONE, ZERO
} from './constant'
import {PanesList} from './panelist.model'
import {
isDirectionDown, isDirectionUpFn, toPx
} from './util'

class PanesService {
	activeIndex = null

	split = 'vertical'

	containerRef

	panesRefs = [
]

	resizerSize

	panesList = new PanesList

	get panes () {
		return this.panesRefs.current
	}

	constructor () {
		this.setVisibility = this.setVisibility.bind(this)
	}

	initPanesService (containerRef, panesRefs, resizerSize) {
		this.containerRef = containerRef
		this.panesRefs = panesRefs
		this.resizerSize = resizerSize
		this.panesList = new PanesList(panesRefs)
		this.setMaxLimitingSize()
	}

	setMaxLimitingSize () {
		const {
bottom, top, height
} = this.containerRef.current.getBoundingClientRect()
		this.topAxix = top
		this.bottomAxis = bottom
		this.maxSize = height - ((this.panes.length - 1) * this.resizerSize)
	}

	setCurrentLimitingLengthUpword () {
		if (this.activeIndex + 1 === this.panes.length) {
			this.currentMaxSize = this.maxSize
			return
		}
		let sizeOfBellowElements = 0
		for (let i = this.activeIndex + 1; i < this.panes.length; i += 1) {
			sizeOfBellowElements += this.panesList.paneList[i].size
		}
		this.currentMaxSize = this.maxSize - sizeOfBellowElements
	}

	setCurrentLimitingLengthDownword () {
		if (this.activeIndex === ZERO) {
			this.currentMaxSize = this.maxSize
			return
		}
		let sizeOfAboveElements = 0
		for (let i = this.activeIndex - 1; i > MINUS_ONE; i -= 1) {
			sizeOfAboveElements += this.panesList.paneList[i].size
		}
		this.currentMaxSize = this.maxSize - sizeOfAboveElements
	}

	setActiveIndex (index) {
		this.activeIndex = index
		this.currentIndex = index
	}

	calculateAndSetHeight (e) {
		if(e.movementY) {
			this.setAxisConfig(e)
			this.panesList.log()
			if (e.movementY > ZERO) {
				this.goingDownLogic(e)
			} else if (e.movementY < ZERO) {
				this.goingUpLogic(e)
			}
			this.panesList.setUISizes()
		}
	}

	setAxisConfig (e) {
		this.topAxisCrossed = false
		this.bottomAxisCrossed = false
		if(e.clientY < this.topAxix) {
			this.axisCoordinate = this.topAxix
			this.panesList.syncAxisSizes()
			this.topAxisCrossed = true
			return
		} else if(e.clientY > this.bottomAxis) {
			this.axisCoordinate =this.bottomAxis
			this.panesList.syncAxisSizes()
			this.bottomAxisCrossed = true
			return
		}
		const newIsForwardDirection = e.movementY > ZERO
		if(this.isForwardDirection !== newIsForwardDirection) {
			this.axisCoordinate = e.clientY
			this.panesList.syncAxisSizes()
		}

		this.currentCoordinate = e.clientY
		this.isForwardDirection = e.movementY > ZERO
	}

	setSizeOfOtherElementsDownword () {

		let newChangeInSize = Math.abs(
			this.panesList.paneList[this.activeIndex].size - this.panesList.paneList[this.activeIndex].axisSize)
			const sizeChange = this.panesList.paneList[this.activeIndex].getSizeChange()
			let str = 'newChangeInSize: ' + newChangeInSize +', ' + sizeChange
		for (let i = this.activeIndex + 1; i < this.panesList.paneList.length; i += 1) {
			const changeInSizeOfNextElement = this.panesList.paneList[i].axisSize - newChangeInSize
			str += ' changeInSizeOfNextElement:' + changeInSizeOfNextElement + ', ' + i
			if (changeInSizeOfNextElement < ZERO) {
				this.panesList.paneList[i].size = 0
				newChangeInSize = Math.abs(changeInSizeOfNextElement)
			} else {
				this.panesList.paneList[i].size = changeInSizeOfNextElement
				break
			}
		}
		console.log( str)
	}

	goingDownLogic (e) {

		this.activeIndex = this.currentIndex
		this.setCurrentLimitingLengthDownword(e)

		// const newSize = this.getNewSizeDownword(e)

		let newSize
		if(this.topAxisCrossed) {
			newSize = this.currentMaxSize
		}
		if(this.bottomAxisCrossed) {
			newSize = ZERO
		}
		 newSize = this.panesList.paneList[this.activeIndex].axisSize + (e.clientY - this.axisCoordinate)
		this.getNewSizeWithLimits(newSize)
		this.setSizeOfOtherElementsDownword()
		this.log(newSize, this.panesList.paneList[this.activeIndex].size,
			e, this.panesList.paneList[this.activeIndex].axisSize)
	}

	getNewSizeWithLimits (size) {
		let newSize = 0
		if (size <= ZERO) {
			// no change required
		} else if (size >= this.currentMaxSize) {
			newSize = this.currentMaxSize
		} else {
			newSize = size
		}
		this.panesList.paneList[this.activeIndex].size = newSize
	}

	log (s1,s2, e ={
},pa) {
		console.log(
			// eslint-disable-next-line max-len
			`${this.topAxisCrossed ? 'topCross': '', this.bottomAxisCrossed ? 'BottomCross': ''} newSize:${s1},${s2} axis:${this.axisCoordinate} x,y${this.topAxix},${this.bottomAxis} Y:${e.clientY} CMax:${this.currentMaxSize} paxis:${pa} `
		)
	}

	goingUpLogic (e) {
		this.activeIndex = this.currentIndex + 1
		this.setCurrentLimitingLengthUpword(e)
		let newCalculatedHeight
		if(this.topAxisCrossed) {
			newCalculatedHeight = this.currentMaxSize
		} else if(this.bottomAxisCrossed) {
			newCalculatedHeight = ZERO
		} else {
			newCalculatedHeight = this.panesList.paneList[this.activeIndex].axisSize + (this.axisCoordinate - e.clientY)
		}
		this.getNewSizeWithLimits(newCalculatedHeight)
		this.setHeightOfOtherElementsUpword()
		 this.log(newCalculatedHeight, this.panesList.paneList[this.activeIndex].size, e,
			this.panesList.paneList[this.activeIndex].axisSize)
	}

	setHeightOfOtherElementsUpword () {
		let newChangeInSize = this.panesList.paneList[this.activeIndex].getSizeChange()
		let str = 'newChangeInSize: ' + newChangeInSize +', '
		for (let i = this.activeIndex - 1; i > MINUS_ONE; i -= 1) {
				const changeInSizeOfNextElement = this.panesList.paneList[i].axisSize - newChangeInSize
					if (changeInSizeOfNextElement < ZERO) {
					 this.panesList.paneList[i].size = 0
					newChangeInSize = Math.abs(changeInSizeOfNextElement)
				} else {
					 this.panesList.paneList[i].size = changeInSizeOfNextElement
					break
				}

		}

		console.log(str)
	}

	setMouseDownAndPaneAxisDetails (e) {
		const {
clientX, clientY
} = e
		this.axisCoordinate = clientY
		this.panesList.syncAxisSizes()
	}

	setVisibility (visibility) {
		for(const key in visibility) {
			console.log(key)
			this.sizesList[ZERO] = 0
			this.panesList.setUISizes()
		}
	}
}

const panesService = new PanesService()

export default panesService
