/* eslint-disable no-unused-vars */
import { DIRECTIONS } from './constant'
import { isDirectionDown, isDirectionUpFn, toPx } from './util'


class Pane {
	id
	index
	size
	pane

	axisSize

	defaultSize

	constructor(pane, index){
		this.id = pane.current.id
		this.index = index
		this.size = pane.current.getBoundingClientRect()
		this.pane = pane
		this.defaultSize = this.size
	}

	setSize(size){
		this.pane.current.style.height = toPx(this.size)
		return this.size
	}

	syncAxisSize(){
		this.axisSize = this.size
	}

	restore(){
		this.size = this.defaultSize
	}
}

class PanesList {
	paneList = []


	panesRefs = []
	
	get panes() {
		return this.panesRefs.current
	}

	constructor(panesRefs = []) {
		this.panesRefs = panesRefs

		this.panes.forEach((pane, index) => {
			this.paneList.push(
				new Pane(
					pane,
					index
				)
			)
		})
	}

	setSizes(){
		const sizesList = []
		this.panes.forEach(((pane, i) => {

		}))
		console.log(sizesList, sizesList.reduce((p, c) => p + c, 0))
	}

	syncAxisSizes(){
		this.panes.forEach(((pane) => {
			pane.syncAxisSize()
		}))
	}  
}


class PanesService {
	activeIndex = null

	split = 'vertical'

	containerRef

	panesRefs = []

	resizerSize = 5

	sizesList = []

	panesList = new PanesList

	get panes() {
		return this.panesRefs.current
	}

	constructor(){
		this.setVisibility = this.setVisibility.bind(this)
	}

	initPanesService(containerRef, panesRefs, resizerSize) {
		this.containerRef = containerRef
		this.panesRefs = panesRefs
		this.resizerSize = resizerSize
		this.setInitialSizesForPanes()
		this.setMaxLimitingSize()
	}

	setInitialSizesForPanes() {

		this.panesList = new PanesList(this.panesRefs)
		this.sizesList = []
		this.panes.forEach((pane) => {
			const { height } = pane.current.getBoundingClientRect()
			this.sizesList.push(height)
		})
	}

	setMaxLimitingSize() {
		const {bottom, top, height} = this.containerRef.current.getBoundingClientRect()
		this.topAxix = top
		this.bottomAxis = bottom
		this.maxSize = height - ((this.panes.length - 1) * this.resizerSize)
	}

	setCurrentLimitingLengthUpword(e) {
		if (this.activeIndex + 1 === this.panes.length) {
			this.currentMaxSize = this.maxSize
			return
		}
		let sizeOfBellowElements = 0
		for (let i = this.activeIndex + 1; i < this.panes.length; i += 1) {
			sizeOfBellowElements += this.sizesList[i]
		}
		this.currentMaxSize = this.maxSize - sizeOfBellowElements
	}

	setCurrentLimitingLengthDownword(e) {
		if (this.activeIndex === 0) {
			this.currentMaxSize = this.maxSize
			return
		}
		let sizeOfAboveElements = 0
		for (let i = this.activeIndex - 1; i > -1; i -= 1) {
			sizeOfAboveElements += this.sizesList[i]
		}
		this.currentMaxSize = this.maxSize - sizeOfAboveElements
	}

	setActiveIndex(index) {
		this.activeIndex = index
		this.currentIndex = index
	}

	calculateAndSetHeight(e) {
		if(e.movementY){
			this.setAxisConfig(e)
			if (e.movementY > 0) {
				this.goingDownLogic(e)
			} else if (e.movementY < 0){
				this.goingUpLogic(e)
			}
			this.setPaneSizes()
		}
	}

	setAxisConfig(e) {
		this.topAxisCrossed = false
		this.bottomAxisCrossed = false
		if(e.clientY < this.topAxix){
			this.axisCoordinate = this.topAxix
			this.sizesAtAxis = [...this.sizesList]
			this.topAxisCrossed = true
			return
		} else if(e.clientY > this.bottomAxis){
			this.axisCoordinate =this.bottomAxis
			this.sizesAtAxis = [...this.sizesList]
			this.bottomAxisCrossed = true
			return
		}
		const newIsForwardDirection = e.movementY > 0
		if(this.isForwardDirection !== newIsForwardDirection) {
			this.axisCoordinate = e.clientY
			this.sizesAtAxis = [...this.sizesList]
		}

		this.currentCoordinate = e.clientY
		this.isForwardDirection = e.movementY > 0
		
		console.log('axis', this.axisCoordinate, e.clientY)
	}

	setSizeOfOtherElementsDownword() {

		let newChangeInSize = Math.abs(this.sizesList[this.activeIndex] - this.sizesAtAxis[this.activeIndex])

		for (let i = this.activeIndex + 1; i < this.sizesList.length; i += 1) {
			const changeInSizeOfNextElement = this.sizesAtAxis[i] - newChangeInSize
			if (changeInSizeOfNextElement < 0) {
				this.sizesList[i] = 0
				newChangeInSize = Math.abs(changeInSizeOfNextElement)
			} else {
				this.sizesList[i] = changeInSizeOfNextElement
				break
			}
		}
	}



	goingDownLogic(e) {

		this.activeIndex = this.currentIndex
		this.setCurrentLimitingLengthDownword(e)

		// const newSize = this.getNewSizeDownword(e)

		let newSize 
		if(this.topAxisCrossed){
			newSize = this.currentMaxSize
		}
		if(this.bottomAxisCrossed) {
			newSize = 0
		}
		console.log('newSize', this.topAxisCrossed, this.bottomAxisCrossed, newSize)
		 newSize = this.sizesAtAxis[this.activeIndex] + (e.clientY - this.axisCoordinate)

		console.log('v-- goingDownLogic', this.currentMaxSize, newSize, this.sizesList[this.activeIndex])
		const previousActiveElementSize = this.sizesList[this.activeIndex]
		this.getNewSizeWithLimits(newSize)
		this.setSizeOfOtherElementsDownword(previousActiveElementSize)
	}

	getNewSizeWithLimits(size) {
		let newSize = 0
		if (size <= 0) {
			// no change required
		} else if (size >= this.currentMaxSize) {
			newSize = this.currentMaxSize
		} else {
			newSize = size
		}
		console.log('v-- newSize', newSize, this.currentMaxSize)
		this.sizesList[this.activeIndex] = newSize
	}

	goingUpLogic(e) {
		this.activeIndex = this.currentIndex + 1
		this.setCurrentLimitingLengthUpword(e)
		let newCalculatedHeight 
		if(this.topAxisCrossed){
			newCalculatedHeight = this.currentMaxSize
		}
		if(this.bottomAxisCrossed) {
			newCalculatedHeight = 0
		}
		console.log('newCalculatedHeight', this.topAxisCrossed, this.bottomAxisCrossed, newCalculatedHeight)
		 newCalculatedHeight = this.sizesAtAxis[this.activeIndex] + (this.axisCoordinate  - e.clientY)
		this.getNewSizeWithLimits(newCalculatedHeight)
		this.setHeightOfOtherElementsUpword()
	}

	setHeightOfOtherElementsUpword() {
		let newChangeInSize = Math.abs(this.sizesList[this.activeIndex] - this.sizesAtAxis[this.activeIndex])

		for (let i = this.activeIndex - 1; i > -1; i -= 1) {
			const changeInSizeOfNextElement = this.sizesAtAxis[i] - newChangeInSize
			if (changeInSizeOfNextElement < 0) {
				this.sizesList[i] = 0
				newChangeInSize = Math.abs(changeInSizeOfNextElement)
			} else {
				this.sizesList[i] = changeInSizeOfNextElement
				break
			}
		}
	}

	setPaneSizes() {
		this.panes.forEach(((pane, i) => {
			pane.current.style.height = this.sizesList[i] + 'px'
		}))
		console.log(this.sizesList, this.sizesList.reduce((p, c) => p + c, 0))
	}

	setMouseDownAndPaneAxisDetails(e) {
		const { clientX, clientY } = e
		this.axisCoordinate = clientY
		this.sizesAtAxis = [...this.sizesList]
	}

	setVisibility(visibility){
		for(const key in visibility){
			console.log(key)
			this.sizesList[0] = 0
			this.setPaneSizes()
		} 
	} 
}

const panesService = new PanesService()

export default panesService
