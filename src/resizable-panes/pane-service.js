/* eslint-disable no-unused-vars */
import {
    DIRECTIONS, MINUS_ONE, ZERO
} from './constant'
import {PaneModel} from './pane-model'
import {subscription} from './subscription'
import {
    getDirection,
    isDirectionDown, isDirectionUpFn, toPx
} from './util'

class PanesService {
    activeIndex = null

    split = 'vertical'

    containerRef

    direction = DIRECTIONS.NONE
    prevDirection = DIRECTIONS.NONE

    limitFinishedAxis = null
    limitFinishedDirection = DIRECTIONS.NONE

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

    synSizesToUI () {
        this.panesList.forEach((pane) => pane.synSizeToUI())
    }

    setUISizes (e) {
        this.panesList.forEach(((pane) => {
            pane.setUISize()
        }))
        this.publishPanes(e)
    }

    setSize (i, size) {
        this.panesList[i].size = size
    }

    syncAxisSizes () {
        const axisSizes = [
        ]
        this.panesList.forEach(((pane) => {
		  const a =	pane.syncAxisSize()
		  axisSizes.push(a)
        }))
    }

    publishPanes (e) {
        this.panesList.forEach((pane) => {
            subscription.publish(pane.id, {
                ...pane,
                Y: e.clientY,
                axisCoordinate : this.axisCoordinate
            })
        })
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
            bottom, top
        } = this.containerRef.current.getBoundingClientRect()
        this.topAxix = top
        this.bottomAxis = bottom
    }

    setCurrentLimitingSize () {
        // To substrac MinSize

        if(this.direction === DIRECTIONS.NONE) {
            return
        }

        let currentLimit
        if(this.direction === DIRECTIONS.UP) {
            currentLimit = this.calculatePanesSize(ZERO, this.activeIndex + 1)
        } else if(this.direction === DIRECTIONS.DOWN) {
            currentLimit = this.calculatePanesSize(this.activeIndex, this.panesList.length - 1 )
        }
        // eslint-disable-next-line complexity
        this.panesList.forEach((pane, index) => {
            const {
                defaultMaxSize
            } = pane
            switch(true) {
                case this.activeIndex === index && this.direction === DIRECTIONS.DOWN:
                case (this.activeIndex + 1) === index && this.direction === DIRECTIONS.UP:
                    let currentMaxSize
                    if(Number.isFinite(defaultMaxSize)) {
                        currentMaxSize = currentLimit < defaultMaxSize ? currentLimit : defaultMaxSize
                    } else {
                        currentMaxSize = currentLimit
                    }

                    pane.maxSize = currentMaxSize
                    break
                default:
                    pane.maxSize = defaultMaxSize
            }

        })

    }

    calculatePanesSize (startIndex, endIndex) {
        let panesSize = 0
        for (let i = startIndex; i <= endIndex; ++i) {
            switch(true) {
                case this.activeIndex === i && this.direction === DIRECTIONS.DOWN:
                case (this.activeIndex + 1) === i && this.direction === DIRECTIONS.UP:
                    panesSize += this.panesList[i].size
                    break
                default:
                    panesSize += this.panesList[i].size - this.panesList[i].minSize
            }

        }
        return panesSize
    }

    setActiveIndex (index) {
        this.activeIndex = index
    }

    calculateAndSetHeight (e) {
        if(e.movementY) {
            console.log('limitFinishedAxis', this.limitFinishedAxis)
            this.setDirection(e)
            if(!this.limitFinishedAxis) {
                this.setAxisConfig(e)
                if (e.movementY > ZERO) {
                    this.goingDownLogic(e)
                } else if (e.movementY < ZERO) {
                    this.goingUpLogic(e)
                }
                this.setUISizes(e)
            }

        }
    }

    setAxisConfig (e) {
        this.topAxisCrossed = false
        this.bottomAxisCrossed = false

        if(e.clientY < this.topAxix) {
            this.axisCoordinate = this.topAxix
            this.syncAxisSizes()
            this.topAxisCrossed = true
            this.setCurrentLimitingSize()

        } else if(e.clientY > this.bottomAxis) {
            this.axisCoordinate = this.bottomAxis
            this.syncAxisSizes()
            this.setCurrentLimitingSize()
            this.bottomAxisCrossed = true

        }

    }

    // eslint-disable-next-line complexity
    setDirection (e) {
        this.direction = getDirection(e)
        switch(true) {
            case this.prevDirection === DIRECTIONS.NONE && this.direction === DIRECTIONS.UP:
                console.warn('direction we have starteed Up')
                break
            case this.prevDirection === DIRECTIONS.NONE && this.direction === DIRECTIONS.DOWN:
                console.warn('direction we have starteed Down')
                break
            case this.prevDirection === DIRECTIONS.UP && this.direction === DIRECTIONS.DOWN:
                console.warn('direction UP to Down')
                break
            case this.prevDirection === DIRECTIONS.DOWN && this.direction === DIRECTIONS.UP:
                console.warn('direction Down to UP')
                break
        }

        console.log(this.limitFinishedDirection)
        switch(true) {
            case this.limitFinishedAxis
            && this.limitFinishedDirection === DIRECTIONS.UP
            && this.limitFinishedAxis <= e.clientY
            && this.direction === DIRECTIONS.DOWN :
            console.log('are we here')

            // eslint-disable-next-line no-fallthrough
            case this.limitFinishedAxis
            && this.limitFinishedDirection === DIRECTIONS.DOWN
            && this.limitFinishedAxis >= e.clientY
            && this.direction === DIRECTIONS.UP :

            console.log('are we here 2' )
                this.axisCoordinate = this.limitFinishedAxis
                this.limitFinishedAxis = null
                this.limitFinishedDirection = DIRECTIONS.NONE
        }

        if(this.prevDirection !== this.direction) {
            this.directionChangeActions(e)
            this.prevDirection = this.direction
        }

    }

    directionChangeActions (e) {
        this.axisCoordinate = e.clientY
        this.syncAxisSizes()
        this.setCurrentLimitingSize()
    }

    setSizeOfOtherElementsDownword (sizeChange, e) {
        if(sizeChange < ZERO) {
            return
        }
        let changeInSizeUpward = sizeChange

        let decreasingNewSize
        for (let i = this.activeIndex + 1; i < this.panesList.length; i += 1) {
            decreasingNewSize = this.panesList[i].axisSize - sizeChange
            sizeChange = this.panesList[i].newSetSize(decreasingNewSize)
            this.panesList[i].left = sizeChange
        }

        for(let i = this.activeIndex; i > MINUS_ONE; i -= 1) {
            const newSize = this.panesList[i].axisSize + changeInSizeUpward
            const changeLeft = this.panesList[i].newSetSize(newSize)
             this.panesList[i].left = changeLeft
             changeInSizeUpward = changeLeft
        }
        this.panesList[ZERO].finalChange = changeInSizeUpward

	   if(sizeChange) {
        this.limitFinishedAxis = e.clientY

        if(this.limitFinishedDirection === DIRECTIONS.NONE) {
            this.limitFinishedDirection = this.direction
            }
		//    this.synSizesToUI()
	   }
    }

    goingDownLogic (e) {
        const sizeChange = e.clientY - this.axisCoordinate
		 this.setSizeOfOtherElementsDownword(sizeChange, e)
    }

    goingUpLogic (e) {
        const changeInsize = this.axisCoordinate - e.clientY
        this.setSizeOfElementsUpward(changeInsize, e)
    }

    // eslint-disable-next-line complexity
    setSizeOfElementsUpward (sizeChange, e) {
        let str = 'sizeChange: ' + sizeChange + ', '
        if(sizeChange < ZERO) {
            return
        }
        let sizeChangeUp = sizeChange

        for(let i = this.activeIndex; i > MINUS_ONE; i -= 1) {
            const newSize = this.panesList[i].axisSize - sizeChangeUp
            sizeChangeUp = this.panesList[i].newSetSize(newSize)
            this.panesList[i].left = sizeChangeUp
        }

        if(sizeChangeUp) {
            this.limitFinishedAxis = e.clientY
            if(this.limitFinishedDirection === DIRECTIONS.NONE) {
                this.limitFinishedDirection = this.direction
                }
        }

        str += ' sizeChangeUp:' + sizeChangeUp
        str += ' left:' + ( sizeChange - sizeChangeUp)
        if(sizeChangeUp) {
            sizeChange = sizeChange - sizeChangeUp
        }

        for(let i = this.activeIndex + 1; i < this.panesList.length; i++) {
            const changeInSizeOfNextElement = this.panesList[i].axisSize + sizeChange
            sizeChange = this.panesList[i].newSetSize(changeInSizeOfNextElement)
            this.panesList[i].finalChange = sizeChange
        }

        if(sizeChange) {
            console.log('v-- synSizesToUI setSizeOfOtherElementsDownword')
            this.limitFinishedAxis = e.clientY
            //  this.synSizesToUI()
        }

        console.log(str)
    }

    setMouseDownAndPaneAxisDetails (e) {
        const {
            clientX, clientY
        } = e

        this.direction = DIRECTIONS.NONE
        this.prevDirection = DIRECTIONS.NONE

        this.axisCoordinate = clientY
        this.limitFinishedAxis = null
        this.resetDefaultMinAndMaxSizes()
        this.syncAxisSizes()
        this.setCurrentLimitingSize()
    }

    setVisibility (visibility) {
        for(const key in visibility) {
            this.sizesList[ZERO] = 0
            this.setUISizes()
        }
    }

    resetDefaultMinAndMaxSizes () {
        this.panesList.forEach((pane) => {
            pane.resetDefaultMinAndMaxSize()
        })
    }
}

const panesService = new PanesService()

export default panesService
