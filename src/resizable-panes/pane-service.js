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

    createPaneList (panesRefs) {
        this.panesRefs = panesRefs
        this.panesList = [
        ]
        panesRefs?.current?.forEach(((pane, index) => {
            this.panesList.push(
                new PaneModel(pane, index)
            )
        }))
    }

    setSize (i, size) {
        this.panesList[i].size = size
    }

    setUISizes () {
    // 		const sizesList = [
    // ]
        this.panesList.forEach(((pane) => {
            pane.setUISize()
        }))
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

    logSizes (e) {
        const z = 5
        const sizes = [
        ]
        const axisSizes = [
        ]
        this.panesList.forEach(({
            size,
            axisSize
        }) => {
            sizes.push(size)
            axisSizes.push(axisSize)
        })

        let str = sizes.join(', ') + '; ' + axisSizes.join(', ')
        console.log('panes', str, 'clientY', e.clientY, 'axisCoordinate', this.axisCoordinate)
    }

    initPanesService (containerRef, panesRefs, resizerSize) {
        this.containerRef = containerRef
        this.panesRefs = panesRefs
        this.resizerSize = resizerSize
        this.createPaneList(panesRefs)
        this.setMaxLimitingSize()
    }

    setMaxLimitingSize () {
        const {
            bottom, top
        } = this.containerRef.current.getBoundingClientRect()
        this.topAxix = top
        this.bottomAxis = bottom
    }

    setCurrentLimitingSize () {
        this.currentMaxSizeUp = this.calculatePanesSize(ZERO, this.activeIndex + 1)
        this.currentMaxSizeDown = this.calculatePanesSize(this.activeIndex, this.panesList.length -1 )
    }

    calculatePanesSize (startIndex, endIndex) {
        let panesSize = 0
        for (let i = startIndex; i <= endIndex; ++i) {
            panesSize += this.panesList[i].size
        }
        return panesSize
    }

    setActiveIndex (index) {
        this.activeIndex = index
    }

    calculateAndSetHeight (e) {
        if(e.movementY) {
            this.setAxisConfig(e)

            // if(!(this.topAxisCrossed || this.bottomAxisCrossed)) {
            //     if (e.movementY > ZERO) {
            //         this.goingDownLogic(e)
            //     } else if (e.movementY < ZERO) {
            //         this.goingUpLogic(e)
            //     }
            // }
            if (e.movementY > ZERO) {
                this.goingDownLogic(e)
            } else if (e.movementY < ZERO) {
                this.goingUpLogic(e)
            }
            this.setUISizes(e)
        }
    }

    setAxisConfig (e) {
        this.topAxisCrossed = false
        this.bottomAxisCrossed = false
        const isDirectionChanged = this.isForwardDirection !== (e.movementY > ZERO)
        this.isForwardDirection = e.movementY > ZERO
        if(isDirectionChanged) {
            console.log('v----------------------------------------------------')
        }
        this.logSizes(e)

        if(e.clientY < this.topAxix) {
            this.axisCoordinate = this.topAxix
            this.syncAxisSizes()
            this.topAxisCrossed = true
            this.setCurrentLimitingSize()
            return
        } else if(e.clientY > this.bottomAxis) {
            this.axisCoordinate =this.bottomAxis
            this.syncAxisSizes()
            this.setCurrentLimitingSize()
            this.bottomAxisCrossed = true
            return
        }
        if(isDirectionChanged) {
            console.log('v---------------------------------------------------- in if')
            this.axisCoordinate = e.clientY
            this.syncAxisSizes()
            this.setCurrentLimitingSize()
        }

    }

    setSizeOfOtherElementsDownword (sizeChange) {
        let str = 'newChangeInSize: ' + sizeChange +', '
        if(sizeChange < ZERO) {
            return
        }
        let changeInSizeUpward = sizeChange

        for (let i = this.activeIndex + 1; i < this.panesList.length; i += 1) {
            const changeInSizeOfNextElement = this.panesList[i].axisSize - sizeChange
            str += ' changeInSizeOfNextElement:' + changeInSizeOfNextElement + ', ' + i
            if (changeInSizeOfNextElement < ZERO) {
                this.panesList[i].size = 0
                sizeChange = Math.abs(changeInSizeOfNextElement)
            } else {
                this.panesList[i].size = changeInSizeOfNextElement
                break
            }
        }

        for(let i = this.activeIndex; i > MINUS_ONE; i -=1) {
            let changeInSizeOfPreviousElement = this.panesList[i].axisSize + changeInSizeUpward
		   if (changeInSizeOfPreviousElement > this.currentMaxSizeDown) {
			   this.panesList[i].size = this.currentMaxSizeDown
			   break
		  } else {
			   this.panesList[i].size = changeInSizeOfPreviousElement
			  break
		  }
	   }

        console.log( str)
    }

    goingDownLogic (e) {

        const sizeChange = e.clientY - this.axisCoordinate

		 this.setSizeOfOtherElementsDownword(sizeChange)
    // this.log(newSize, this.panesList[this.activeIndex].size,
    // 	e, this.panesList[this.activeIndex].axisSize)
    }

    goingUpLogic (e) {
        const changeInsize =this.axisCoordinate - e.clientY
        this.setSizeOfElementsUpward(changeInsize)
    }

    setSizeOfElementsUpward (changeInsize) {
        let str = 'newChangeInSize: ' + changeInsize +', '
        if(changeInsize < ZERO) {
            return
        }
        let changeInSizeUpward = changeInsize

        let isAllZero = true
        let changeInSizeOfPreviousElement

        for(let i = this.activeIndex; i > MINUS_ONE; i -=1) {
            changeInSizeOfPreviousElement = this.panesList[i].axisSize - changeInSizeUpward
            if (changeInSizeOfPreviousElement < ZERO) {
                this.panesList[i].size = 0
                changeInSizeUpward = Math.abs(changeInSizeOfPreviousElement)
            } else {
                isAllZero = false
                this.panesList[i].size = changeInSizeOfPreviousElement
                break
            }
        }

        for (let i = this.activeIndex + 1; i < this.panesList.length; i += 1) {
            const changeInSizeOfNextElement = this.panesList[i].axisSize + changeInsize
            if(this.currentMaxSizeUp < changeInSizeOfNextElement) {
                this.panesList[i].size = this.currentMaxSizeUp
                break
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
        this.setCurrentLimitingSize()
    }

    setVisibility (visibility) {
        for(const key in visibility) {
            this.sizesList[ZERO] = 0
            this.setUISizes()
        }
    }
}

const panesService = new PanesService()

export default panesService
