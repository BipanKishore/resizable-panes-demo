/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
/* eslint-disable complexity */
/* eslint-disable no-unused-vars */
import {
    DIRECTIONS, MINUS_ONE, ONE, ZERO
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
        const minSizeCollection = this.getMinSizesTotal(this.activeIndex + 1, this.panesList.length - 1)
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
        for (let i = start; i <= end; ++i) {
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
             minSizeCollection = this.getMinSizesTotal(ZERO, index - ONE)
             otherElementsSizesSum = this.getPanesSizeTotal(index + 2, this.panesList.length - 1)
             indexeMaxSize = this.MaxPaneSize - ( minSizeCollection + otherElementsSizesSum)
        } else {
            minSizeCollection = this.getMinSizesTotal(ZERO, this.activeIndex)
            maxSizesSum = this.getPanesMaxSizeSum( this.activeIndex + 1, index - 1 )
            otherElementsSizesSum = this.getPanesSizeTotal(index + 1, this.panesList.length - 1)
            indexeMaxSize = this.MaxPaneSize - ( minSizeCollection + maxSizesSum + otherElementsSizesSum)
        }

        console.log('relative MaxPaneSize',this.activeIndex, index, this.MaxPaneSize, 'min'
        , minSizeCollection, 'otherElementsSizesSum', otherElementsSizesSum,
        'maxSizesSum', maxSizesSum, 'indexeMaxSize:', indexeMaxSize)
        return indexeMaxSize
    }

   MIN_MAX_SET_1 = {
        maxSizes: [
            500,200,220,250
        ],
        minSizes: [
            10, 100, 100, 10
        ],
        sizes: [
            200, 150, 200, 200
        ]
    }

    setCurrentMinMax () {

        let minDiff1Up = this.panesList[this.activeIndex].getMinDiff()
        let maxDiff2Up = this.panesList[this.activeIndex + 1].getMaxDiff()
        // this.setPaneList([
        //     'minSize', 'maxSize'
        //     ])
        this.minMaxLogicUp(minDiff1Up, maxDiff2Up, this.activeIndex, this.activeIndex + 1)

        this.paneConsole('minSize')
        this.paneConsole('maxSize')
        this.minMaxTotal()

        let minDiff1 = this.panesList[this.activeIndex + 1].getMinDiff()
        let maxDiff2 = this.panesList[this.activeIndex].getMaxDiff()
        console.log('v---------------------------------------------------------------------------------------')
        // this.setPaneList([
        //     'minSize', 'maxSize'
        //     ])
        this.minMaxLogicDown(minDiff1, maxDiff2, this.activeIndex, this.activeIndex + 1)

        this.paneConsole('minSize')
        this.paneConsole('maxSize')
        this.minMaxTotal()

    }

        // eslint-disable-next-line max-params
        minMaxLogicDown (minDiff1, maxDiff2, maxIndex, minIndex, sum = 0) {
            if(maxDiff2 < minDiff1) {
                const t = this.panesList[maxIndex].resetMax()
                sum += t
                if(maxIndex === ZERO) {
                    if(minIndex === this.panesList.length - 1) {
                        this.panesList[minIndex].minSize = this.MaxPaneSize - sum
                    } else {
                        this.panesList[minIndex].minSize = this.panesList[minIndex].size - maxDiff2
                        for(let i = minIndex - 1; i < this.panesList.length; i++) {
                            this.panesList[i].synMinToSize()
                        }
                    }
                    return
                }

                minDiff1 = minDiff1 - maxDiff2
                --maxIndex
                maxDiff2 = this.panesList[maxIndex].getMaxDiff()
            } else if(maxDiff2 > minDiff1) {
                    const t = this.panesList[minIndex].resetMin()
                    sum += t
                    if(minIndex === this.panesList.length - 1 ) {
                        if(maxIndex === ZERO) {
                            this.panesList[maxIndex].maxSize = this.MaxPaneSize - sum
                        } else {
                            this.panesList[maxIndex].maxSize = this.panesList[minIndex].size - minDiff1
                            for(let i = maxIndex + 1; i < this.panesList.length; i++) {
                                this.panesList[i].synMaxToSize()
                            }
                        }
                        return
                    }

                    maxDiff2 = maxDiff2 - minDiff1
                    ++minIndex
                    minDiff1 = this.panesList[minIndex].getMinDiff()
                } else {
                sum += this.panesList[minIndex].resetMin()
                sum += this.panesList[maxIndex].resetMax()
                ++minIndex
                --maxIndex
                maxDiff2 = this.panesList[maxIndex].getMaxDiff()
                minDiff1 = this.panesList[minIndex].getMinDiff()
            }
            this.minMaxLogicDown(minDiff1, maxDiff2, maxIndex, minIndex, sum)

        }

        // eslint-disable-next-line max-params
        minMaxLogicUp (minDiff1, maxDiff2, minIndex, maxIndex, sum = 0) {

            if(maxDiff2 < minDiff1) {
                sum += this.panesList[maxIndex].resetMax()
                minDiff1 = minDiff1 - maxDiff2

                if(maxIndex === this.panesList.length - 1) {
                    if(minIndex === ZERO) {
                        this.panesList[minIndex].minSize = this.MaxPaneSize - sum
                    } else {
                        this.panesList[minIndex].minSize = this.panesList[minIndex].size - maxDiff2
                        for(let i = minIndex - 1; i > MINUS_ONE; i--) {
                            this.panesList[i].synMinToSize()
                        }
                    }
                    return
                }

                ++maxIndex
                maxDiff2 = this.panesList[maxIndex].getMaxDiff()
            } else if (maxDiff2 > minDiff1) {
                if(maxDiff2 > minDiff1) {
                    sum += this.panesList[minIndex].resetMin()
                    maxDiff2 = maxDiff2 - minDiff1
                    if(minIndex === ZERO ) {

                        if(maxIndex === this.panesList.length - 1) {
                            this.panesList[maxIndex].maxSize = this.MaxPaneSize - sum
                        } else {
                            this.panesList[minIndex].maxSize = this.panesList[minIndex].size - minDiff1
                            for(let i = maxIndex + 1; i < this.panesList.length; i++) {
                                this.panesList[i].synMaxToSize()
                            }
                        }
                        return
                    }

                    --minIndex
                    minDiff1 = this.panesList[minIndex].getMinDiff()
                }
            } else {
                sum += this.panesList[minIndex].resetMin()
                sum += this.panesList[maxIndex].resetMax()

                if(minIndex === this.panesList.length - 1 || maxIndex === ZERO) {
                    return
                }
                --minIndex
                ++maxIndex
                maxDiff2 = this.panesList[maxIndex].getMaxDiff()
                minDiff1 = this.panesList[minIndex].getMinDiff()
            }

            this.minMaxLogicUp(minDiff1, maxDiff2, minIndex, maxIndex, sum)
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

        } else if(e.clientY > this.bottomAxis) {
            this.axisCoordinate = this.bottomAxis
            this.syncAxisSizes()
            this.bottomAxisCrossed = true

        }

    }

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
    }

    goingDownLogic (e) {
        let sizeChange = e.clientY - this.axisCoordinate
        if(sizeChange < ZERO) {
            return
        }
        let sizeChangeUp = sizeChange

        for(let i = this.activeIndex; i > MINUS_ONE; i -= 1) {
            sizeChangeUp = this.panesList[i].addSize(sizeChangeUp)
        }

        sizeChange -= sizeChangeUp

        for (let i = this.activeIndex + 1; i < this.panesList.length; i += 1) {
            sizeChange = this.panesList[i].removeSize(sizeChange)
        }

	   if(sizeChangeUp) {
        this.limitFinishedAxis = e.clientY
        this.limitFinishedDirection = this.direction
	   }
    }

    goingUpLogic (e) {
        let str = ''
        let sizeChange = this.axisCoordinate - e.clientY
        if(sizeChange < ZERO) {
            return
        }
        let sizeChangeUp = sizeChange

        for(let i = this.activeIndex + 1; i < this.panesList.length; i++) {
            sizeChangeUp = this.panesList[i].addSize(sizeChangeUp)
        }
        str = 'sizeChangeUp ' + sizeChangeUp
        sizeChange -= sizeChangeUp
        for(let i = this.activeIndex; i > MINUS_ONE; i -= 1) {
            sizeChange = this.panesList[i].removeSize(sizeChange)
        }

        str += 'sizeChange ' + sizeChange

        if(sizeChangeUp) {
            this.limitFinishedAxis = e.clientY
            this.limitFinishedDirection = this.direction
        }
        console.log('v-- ', str)
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
        this.setCurrentMinMax()
    }

    setVisibility (visibility) {
        for(const key in visibility) {
            this.sizesList[ZERO] = 0
            this.setUISizes()
        }
    }

    resetDefaultMinAndMaxSizes () {
        this.panesList.forEach((pane) => {
            pane.restoreLimits()
        })
    }

    getList (key) {
        return this.panesList.map((pane) => pane[key])
    }

    paneConsole (key) {
        const list =
        console.log('v-- ' + key, this.getList(key))
    }

    setPaneList (keys = [
], value) {
        this.panesList.forEach((pane) => keys.forEach(key => pane[key] = value) )
       keys.forEach((key) => this.paneConsole(key))
    }

    minMaxTotal () {
        let sum = 0
        this.panesList.forEach(({
                                minSize, maxSize
                                }) => {
                                    sum += ( (maxSize ? maxSize : 0) + (minSize ? minSize : 0))
                                        })

        console.warn('size SSSSUUUUUUMMMM', sum)

        if(this.MaxPaneSize === sum) {
          ///  throw ('Max limit cross, Max Pane Size:' + this.MaxPaneSize + ' Sum:', sum)
        }
    }

}

const panesService = new PanesService()

export default panesService
