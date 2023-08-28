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
            bottom, top, height
        } = this.containerRef.current.getBoundingClientRect()
        this.topAxix = top
        this.bottomAxis = bottom
        this.MaxPaneSize = height - ((this.panesList.length - 1) * this.resizerSize)
    }

    getPanesSizeTotal (start, end) {
        let sum = 0
        for(let i = start; i <= end; i++) {
           sum += this.panesList[i].size
        }
        return sum
    }

    getPanesMaxSizeSum (start, end) {
        let sum = 0
        for(let i = start; i <= end; i++) {
           sum += this.panesList[i].maxSize
        }
        return sum
    }

    getMaxSizeOfElementsDownward (index) {
        const minSizeCollection = this.getMinSizesTotal(this.activeIndex + 1, this.panesList.length)
        const otherElementsSizesSum = this.getPanesSizeTotal(ZERO, index - 1)
        const maxSizesSum = this.getPanesMaxSizeSum(index + 1, this.activeIndex)
        const indexeMaxSize = this.MaxPaneSize - ( minSizeCollection + maxSizesSum + otherElementsSizesSum)

        console.log('relative MaxPaneSize', index, this.MaxPaneSize, 'min'
        , minSizeCollection, 'otherElementsSizesSum', otherElementsSizesSum,
        'maxSizesSum', maxSizesSum, 'indexeMaxSize:', indexeMaxSize)
        return indexeMaxSize
    }

    getMaxSizesTotal (start, end) {
        let maxSizeCollection = 0
        for (let i = start ; i > end; --i) {
            maxSizeCollection += this.panesList[i].maxSize
        }
        return maxSizeCollection
    }

    getMinSizesTotal (start, end) {
        let minSizeCollection = 0
        for (let i = start; i < end; ++i) {
            minSizeCollection += this.panesList[i].minSize
        }
        return minSizeCollection
    }

    // 0, 2 min
    // index = 1
    // 0  size
    getMaxSizeOfElementsUpward (index) {
        let maxSizesSum
        let minSizeCollection
        let otherElementsSizesSum
        let indexeMaxSize
        if(this.activeIndex + 1 === index) {
             minSizeCollection = this.getMinSizesTotal(ZERO, index)
             otherElementsSizesSum = this.getPanesSizeTotal(index + 2, this.panesList.length - 1)
             indexeMaxSize = this.MaxPaneSize - ( minSizeCollection + otherElementsSizesSum)
        } else {
            minSizeCollection = this.getMinSizesTotal(ZERO, this.activeIndex + 1)
            maxSizesSum = this.getPanesMaxSizeSum( this.activeIndex + 1, index - 1 )
            otherElementsSizesSum = this.getPanesSizeTotal(index + 1, this.panesList.length - 1)
            indexeMaxSize = this.MaxPaneSize - ( minSizeCollection + maxSizesSum + otherElementsSizesSum)
        }

        console.log('relative MaxPaneSize',this.activeIndex, index, this.MaxPaneSize, 'min'
        , minSizeCollection, 'otherElementsSizesSum', otherElementsSizesSum,
        'maxSizesSum', maxSizesSum, 'indexeMaxSize:', indexeMaxSize)
        return indexeMaxSize
    }

    // eslint-disable-next-line complexity
    setCurrentLimitingSize () {
        if(this.direction === DIRECTIONS.NONE) {
            return
        }

        if(this.direction === DIRECTIONS.UP) {
            for(let i = 0; i < this.activeIndex + 1; i++) {
                this.panesList[i].resetDefaultMinAndMaxSize()
            }

            for(let i = this.activeIndex + 1; i < this.panesList.length; i++) {
                const relativeMaxSize = this.getMaxSizeOfElementsUpward(i)
                this.panesList[i].setMaxSize(relativeMaxSize)
            }
        } else {

        //Max size not required for elements reducing in size
            for(let i = this.activeIndex + 1; i < this.panesList.length; i++) {
                this.panesList[i].resetDefaultMinAndMaxSize()
            }

            for(let i = this.activeIndex; i > MINUS_ONE; i--) {
                const relativeMaxSize = this.getMaxSizeOfElementsDownward(i)
                this.panesList[i].setMaxSize(relativeMaxSize)

            }
        }

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

            // eslint-disable-next-line no-fallthrough
            case this.limitFinishedAxis
            && this.limitFinishedDirection === DIRECTIONS.DOWN
            && this.limitFinishedAxis >= e.clientY
            && this.direction === DIRECTIONS.UP :

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

        for (let i = this.activeIndex + 1; i < this.panesList.length; i += 1) {
            sizeChange = this.panesList[i].removeSize(sizeChange)
        }

        for(let i = this.activeIndex; i > MINUS_ONE; i -= 1) {
            changeInSizeUpward = this.panesList[i].addSize(changeInSizeUpward)
        }

	   if(sizeChange) {
        this.limitFinishedAxis = e.clientY
        this.limitFinishedDirection = this.direction
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

    setSizeOfElementsUpward (sizeChange, e) {
        let str = 'sizeChange: ' + sizeChange + ', '
        if(sizeChange < ZERO) {
            return
        }
        let sizeChangeUp = sizeChange

        for(let i = this.activeIndex; i > MINUS_ONE; i -= 1) {
            sizeChangeUp = this.panesList[i].removeSize(sizeChangeUp)
        }

        if(sizeChangeUp) {
            this.limitFinishedAxis = e.clientY
            this.limitFinishedDirection = this.direction
            sizeChange = sizeChange - sizeChangeUp
        }

        for(let i = this.activeIndex + 1; i < this.panesList.length; i++) {
            sizeChange = this.panesList[i].addSize(sizeChange)
        }

        if(sizeChange) {
            this.limitFinishedAxis = e.clientY
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
