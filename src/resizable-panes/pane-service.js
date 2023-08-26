/* eslint-disable no-unused-vars */
import {
DIRECTIONS, MINUS_ONE, ZERO
} from './constant'
import {PaneModel} from './pane-model'
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

	panesList = [
]
	get panes () {
		return this.panesRefs.current
	}

	constructor () {
		this.setVisibility = this.setVisibility.bind(this)
	}

	createPaneList (panesRefs, children) {
        this.panesRefs = panesRefs
		this.panesList = [
]
		panesRefs?.current?.forEach(((pane, index) => {
			this.panesList.push(
				new PaneModel(pane, index, children[index])
			)
		}))
    }

	setSize (i, size) {
		this.panesList[i].size = size
	}

	synSizesToUI () {
		this.panesList.forEach((pane) => pane.synSizeToUI())
	}

	setUISizes () {
// 		const sizesList = [
// ]
		let isValid = true
		for(const pane of this.panesList) {
			if(!pane.validateSize()) {
				isValid = false
				break
			}
		}
		if(isValid) {
			this.panesList.forEach(((pane) => {
				pane.setUISize()
			}))
		} else {
			this.synSizesToUI()
		}

		// console.log('sizesList',sizesList, sizesList.reduce((p, c) => p + c, 0))
	}

	syncAxisSizes () {
		const axisSizes = [
]
		this.panesList.forEach(((pane) => {
		  const a =	pane.syncAxisSize()
		  axisSizes.push(a)
		}))
	}

	logSizes () {
		let str = ''
		this.panesList.forEach(({
size
}) => str+=size +', ')
		str +=';'
		this.panesList.forEach(({
axisSize
}) => str+=axisSize+', ')
		console.log('panes', str)
	}

	initPanesService ({
		children,
		containerRef,
		panesRefs,
		resizerSize
		}) {
		this.containerRef = containerRef
		this.panesRefs = panesRefs
		this.resizerSize = resizerSize
		this.createPaneList(panesRefs, children)
		this.setMaxLimitingSize()
	}

	setMaxLimitingSize () {
		const {
bottom, top, height
} = this.containerRef.current.getBoundingClientRect()
		this.topAxix = top
		this.bottomAxis = bottom
		this.maxSize = height - ((this.panesList.length - 1) * this.resizerSize)
		// this.maxSize = height
	}

	setCurrentLimitingLengthUpword () {
		if (this.activeIndex + 1 === this.panes.length) {
			this.currentMaxSize = this.maxSize
			return
		}
		let sizeOfBellowElements = 0
		for (let i = this.activeIndex + 1; i < this.panes.length; i += 1) {
			sizeOfBellowElements += this.panesList[i].size
		}
		this.currentMaxSize = this.maxSize - sizeOfBellowElements
	}

	setCurrentLimitingLengthDownword () {
		if (this.activeIndex === ZERO) {
			this.currentMaxSize = this.maxSize
			return
		}
		let sizeOfAboveElements = 0
		let count = 0
		for (let i = this.activeIndex - 1; i > MINUS_ONE; i -= 1) {
			sizeOfAboveElements += this.panesList[i].size
			++count
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
			// this.logSizes()
			if (e.movementY > ZERO) {
				this.goingDownLogic(e)
			} else if (e.movementY < ZERO) {
				this.goingUpLogic(e)
			}
			this.setUISizes()
		}
	}

	setAxisConfig (e) {
		this.topAxisCrossed = false
		this.bottomAxisCrossed = false
		if(e.clientY < this.topAxix) {
			this.axisCoordinate = this.topAxix
			this.syncAxisSizes()
			this.topAxisCrossed = true
			return
		} else if(e.clientY > this.bottomAxis) {
			this.axisCoordinate =this.bottomAxis
			this.syncAxisSizes()
			this.bottomAxisCrossed = true
			return
		}
		const newIsForwardDirection = e.movementY > ZERO
		if(this.isForwardDirection !== newIsForwardDirection) {
			this.axisCoordinate = e.clientY
			this.syncAxisSizes()
		}

		this.currentCoordinate = e.clientY
		this.isForwardDirection = e.movementY > ZERO
	}

	setSizeOfOtherElementsDownword () {

		let newChangeInSize = this.panesList[this.activeIndex].getSizeChange()
			let str = 'newChangeInSize: ' + newChangeInSize +', '
		for (let i = this.activeIndex + 1; i < this.panesList.length; i += 1) {
			const changeInSizeOfNextElement = this.panesList[i].axisSize - newChangeInSize
			str += ' changeInSizeOfNextElement:' + changeInSizeOfNextElement + ', ' + i
			if (changeInSizeOfNextElement < ZERO) {
				this.panesList[i].size = 0
				newChangeInSize = Math.abs(changeInSizeOfNextElement)
			} else {
				this.panesList[i].size = changeInSizeOfNextElement
				break
			}
		}
		console.log( str)
	}

	goingDownLogic (e) {

		this.activeIndex = this.currentIndex
		this.setCurrentLimitingLengthDownword(e)
		let newSize
		// if(this.topAxisCrossed) {
		// 	newSize = this.currentMaxSize
		// } else if(this.bottomAxisCrossed) {
		// 	newSize = ZERO
		// } else {
		// 	newSize = this.panesList[this.activeIndex].axisSize + (e.clientY - this.axisCoordinate)
		// }
		newSize = this.panesList[this.activeIndex].axisSize + (e.clientY - this.axisCoordinate)
		// if(newCalculatedHeight < this.panesList[this.activeIndex].minSize ) {
		// 	newCalculatedHeight = this.panesList[this.activeIndex].minSize
		// }

		this.getNewSizeWithLimits(newSize)
		this.setSizeOfOtherElementsDownword()
		this.log(newSize, this.panesList[this.activeIndex].size,
			e, this.panesList[this.activeIndex].axisSize)
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
		this.panesList[this.activeIndex].size = newSize

		// console.log('v----', this.panesList[this.activeIndex])
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
		this.setCurrentLimitingLengthUpword()
		const newSize = this.panesList[this.activeIndex].axisSize + (this.axisCoordinate - e.clientY)

		this.getNewSizeWithLimits(newSize)
		this.setHeightOfOtherElementsUpword()
		 this.log(newSize, this.panesList[this.activeIndex].size, e,
			this.panesList[this.activeIndex].axisSize)
	}

	setHeightOfOtherElementsUpword () {
		let newChangeInSize = this.panesList[this.activeIndex].getSizeChange()
		let str = 'newChangeInSize: ' + newChangeInSize +', '
		for (let i = this.activeIndex - 1; i > MINUS_ONE; i -= 1) {
				const changeInSizeOfNextElement = this.panesList[i].axisSize - newChangeInSize
					if (changeInSizeOfNextElement < ZERO) {
					 this.panesList[i].size = 0
					newChangeInSize = Math.abs(changeInSizeOfNextElement)
				} else {
					 this.panesList[i].size = changeInSizeOfNextElement
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
		this.syncAxisSizes()
	}

	setVisibility (visibility) {
		for(const key in visibility) {
			console.log(key)
			this.sizesList[ZERO] = 0
			this.setUISizes()
		}
	}
}

const panesService = new PanesService()

export default panesService
