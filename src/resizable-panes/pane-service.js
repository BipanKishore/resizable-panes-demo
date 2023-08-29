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

    // Not using now
    synSizesToUI () {
        this.panesList.forEach((pane) => pane.synSizeToUI())
    }

    setUISizes (e) {
        this.panesList.forEach(((pane) => {
            pane.setUISize()
        }))
        this.publishPanes(e)
    }

    // Not using now
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
        // this.setMinMaxStore()
    }

    setMaxLimitingSize () {
        const {
            bottom, top, height
        } = this.containerRef.current.getBoundingClientRect()
        this.topAxix = top
        this.bottomAxis = bottom
        this.MaxPaneSize = height - ((this.panesList.length - 1) * this.resizerSize)
    }

    setCurrentMinMax (index = this.activeIndex) {

        let minDiff1Up = this.panesList[index].getMinDiff()
        let maxDiff2Up = this.panesList[index + 1].getMaxDiff()
        // this.setPaneList([
        //     'minSize', 'maxSize'
        //     ])
        this.minMaxLogicUp(minDiff1Up, maxDiff2Up, index, index + 1)

        // this.paneConsole('minSize')
        // this.paneConsole('maxSize')
        // this.minMaxTotal()

        let minDiff1 = this.panesList[index + 1].getMinDiff()
        let maxDiff2 = this.panesList[index].getMaxDiff()
        console.log('v---------------------------------------------------------------------------------------')
        // this.setPaneList([
        //     'minSize', 'maxSize'
        //     ])
        this.minMaxLogicDown(minDiff1, maxDiff2, index, index + 1)

        // this.paneConsole('minSize')
        // this.paneConsole('maxSize')
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
                        this.panesList[minIndex].minSize = this.panesList[minIndex].defaultSize - maxDiff2
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
                            this.panesList[maxIndex].maxSize = this.panesList[minIndex].defaultSize - minDiff1
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

        // this.paneConsole('minSize')
        // this.paneConsole('maxSize')
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
                        this.panesList[minIndex].minSize = this.panesList[minIndex].defaultSize - maxDiff2
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
                            this.panesList[minIndex].maxSize = this.panesList[minIndex].defaultSize - minDiff1
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

	   if(sizeChangeUp || sizeChange) {
        this.limitFinishedAxis = e.clientY
        this.limitFinishedDirection = this.direction
	   }

       const diffTotal = this.getDiffTotalOfPanesSizes()
       this.panesList[this.panesList.length - 1].size = this.panesList[this.panesList.length - 1].size - diffTotal
       console.log('v--  diffTotal' + diffTotal)
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

        if(sizeChangeUp || sizeChange) {
            this.limitFinishedAxis = e.clientY
            this.limitFinishedDirection = this.direction
        }

        const diffTotal = this.getDiffTotalOfPanesSizes()
        this.panesList[0].size = this.panesList[0].size - diffTotal
        console.log('v--  diffTotal' + diffTotal)

        console.log('v-- ', str + ' diffTotal' + diffTotal)
    }

    getDiffTotalOfPanesSizes () {
        const panesSizeSum = this.getPanesSizeTotal(0, this.panesList.length - 1)
        return panesSizeSum - this.MaxPaneSize
    }

    getPanesSizeTotal (start, end) {
        let sum = 0
        for(let i = start; i <= end; i++) {
           sum += this.panesList[i].size
        }
        return sum
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
        // this.fillMinMax(this.activeIndex)

    }

    setMinMaxStore () {
        this.minMaxStore = [
]

    for(let i = 0; i < this.panesList.length - 1; i++) {
        this.setCurrentMinMax(i)
        this.minMaxStore.push(
         {
            max: this.getList('maxSize'),
            min: this.getList('minSize')
         }
        )
    }

        console.log(this.minMaxStore)
    }

    fillMinMax (index) {
        this.panesList.forEach((pane, idx) => {
            pane.minSize = this.minMaxStore[index].min[idx]
            pane.maxSize = this.minMaxStore[index].max[idx]
        })

        console.log('size minmax store', this.minMaxStore[index])
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
        const paneSizeTotal = sum / 2
        if(this.MaxPaneSize !== paneSizeTotal) {
            console.error('Max limit cross, Max Pane Size:' + this.MaxPaneSize + ' Sum:' + paneSizeTotal)
          //  throw new Error ('Max limit cross, Max Pane Size:' + this.MaxPaneSize + ' Sum:' + paneSizeTotal)
        }
    }

}

const panesService = new PanesService()

export default panesService
