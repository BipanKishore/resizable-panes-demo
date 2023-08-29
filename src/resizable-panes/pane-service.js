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
    isDirectionDown, isDirectionUpFn, keyConsole,
toPx} from './util'

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
        this.panesList.forEach(((pane) => {
		    pane.syncAxisSize()
        }))
    }

    publishPanes (e) {
        this.panesList.forEach((pane) => {
            subscription.publish(pane.id, {...pane,
                Y: e.clientY,
                axisCoordinate : this.axisCoordinate})
        })
    }

    initPanesService ({children,
        containerRef,
        panesRefs,
        resizerSize}) {
        this.containerRef = containerRef
        this.panesRefs = panesRefs
        this.resizerSize = resizerSize
        this.createPaneList(panesRefs, children)
        this.setMaxLimitingSize()
    }

    setMaxLimitingSize () {
        const {bottom, top, height} = this.containerRef.current.getBoundingClientRect()
        this.topAxix = top
        this.bottomAxis = bottom
        this.MaxPaneSize = height - ((this.panesList.length - 1) * this.resizerSize)
    }

    setCurrentMinMax (index = this.activeIndex) {
        // this.setPaneList([
        //     'minSize', 'maxSize'
        //     ])
        //     console.log('v---------------------------------------------------------------------------------------')

        let aMaxChangeUp = this.panesList[index].getMinDiff()
        let bMaxChangeUp = this.panesList[index + 1].getMaxDiff()
        this.minMaxLogicUp(aMaxChangeUp, bMaxChangeUp, index, index + 1)

        let aMaxChangeDown = this.panesList[index + 1].getMinDiff()
        let bMaxChangeDown = this.panesList[index].getMaxDiff()
        this.minMaxLogicDown(bMaxChangeDown, aMaxChangeDown, index + 1, index )

        // Only for Development
        this.minMaxTotal()

    }

        // eslint-disable-next-line max-params
        minMaxLogicDown (bMaxChange, aMaxChange, aIndex, bIndex, sum = 0) {
            // aIndex = index + 1  A - minChange Increase i
            // bIndex = index B - max Change Decrease i
            // aIndex: 3 aMaxChange: 190 bIndex: 0 bMaxChange: 150

            keyConsole({aIndex, aMaxChange,bIndex,bMaxChange})
            let nextAMaxChange = aMaxChange
            let nextBMaxChange = bMaxChange

            if(aMaxChange > bMaxChange) {
                sum += this.panesList[bIndex].resetMax()
                nextAMaxChange = aMaxChange - bMaxChange

                if(bIndex === ZERO) {
                    if(aIndex !== this.panesList.length - 1) {
                        for(let i = aIndex - 1; i > MINUS_ONE; i--) {
                            sum += this.panesList[i].synMinToSize()
                        }
                    }
                    this.panesList[aIndex].minSize = this.MaxPaneSize - sum
                    return
                }

                --bIndex
                nextBMaxChange = this.panesList[bIndex].getMaxDiff()
            } else if(bMaxChange > aMaxChange) {
                    sum += this.panesList[aIndex].resetMin()
                    nextBMaxChange = bMaxChange - aMaxChange

                    if(aIndex === this.panesList.length - 1 ) {
                        const end = bIndex - 1
                        const start = ZERO
                        if(bIndex !== ZERO) {
                            for(let i = start; i <= end; i++) {
                                sum += this.panesList[i].synMaxToSize()
                            }
                        }
                        this.panesList[bIndex].maxSize = this.MaxPaneSize - sum
                        return
                    }

                    ++aIndex
                    nextAMaxChange = this.panesList[aIndex].getMinDiff()

            } else {
                sum += this.panesList[aIndex].resetMin()
                sum += this.panesList[bIndex].resetMax()

                if(aIndex === this.panesList.length - 1 || bIndex === ZERO) {
                    // need to work
                    return
                }
                ++aIndex
                --bIndex
                nextBMaxChange = this.panesList[bIndex].getMaxDiff()
                nextAMaxChange = this.panesList[aIndex].getMinDiff()
            }

            this.minMaxLogicDown(nextBMaxChange, nextAMaxChange, aIndex, bIndex, sum)

        }

        minMaxLogicUp (aMaxChange, bMaxChange, aIndex, bIndex, sum = 0) {

        keyConsole({aIndex, aMaxChange,bIndex,bMaxChange})
            let nextAMaxChange = aMaxChange
            let nextBMaxChange = bMaxChange

            if(aMaxChange > bMaxChange) {
                sum += this.panesList[bIndex].resetMax()
                nextAMaxChange = aMaxChange - bMaxChange
                if(bIndex === this.panesList.length - 1) {
                    if(aIndex !== ZERO) {
                        for(let i = aIndex - 1; i > MINUS_ONE; i--) {
                            sum += this.panesList[i].synMinToSize()
                        }
                    }
                    this.panesList[bIndex].minSize = this.MaxPaneSize - sum
                    return
                }

                ++bIndex
                nextBMaxChange = this.panesList[bIndex].getMaxDiff()
            } else if(bMaxChange > aMaxChange) {
                    sum += this.panesList[aIndex].resetMin()
                    nextBMaxChange = bMaxChange - aMaxChange
                    if(aIndex === ZERO ) {
                        if(bIndex !== this.panesList.length - 1) {
                            for(let i = bIndex + 1; i < this.panesList.length; i++) {
                                sum += this.panesList[i].synMaxToSize()
                            }
                        }
                        this.panesList[bIndex].maxSize = this.MaxPaneSize - sum
                        return
                    }

                    --aIndex
                    nextAMaxChange = this.panesList[aIndex].getMinDiff()

            } else {
                sum += this.panesList[aIndex].resetMin()
                sum += this.panesList[bIndex].resetMax()

                if(aIndex === this.panesList.length - 1 || bIndex === ZERO) {
                    // need to work
                    return
                }
                --aIndex
                ++bIndex
                nextBMaxChange = this.panesList[bIndex].getMaxDiff()
                nextAMaxChange = this.panesList[aIndex].getMinDiff()
            }

        this.minMaxLogicUp(nextAMaxChange, nextBMaxChange, aIndex, bIndex, sum)
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
        const {clientX, clientY} = e

        this.direction = DIRECTIONS.NONE
        this.prevDirection = DIRECTIONS.NONE

        this.axisCoordinate = clientY
        this.limitFinishedAxis = null
        this.resetDefaultMinAndMaxSizes()
        this.syncAxisSizes()
        this.setCurrentMinMax(this.activeIndex)

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
], value = null) {
        this.panesList.forEach((pane) => keys.forEach(key => pane[key] = value) )
       keys.forEach((key) => this.paneConsole(key))
    }

    minMaxTotal () {
        let sum = 0
        this.panesList
        .forEach(({minSize, maxSize}) => {
                                    sum += ( (maxSize ? maxSize : 0) + (minSize ? minSize : 0))
                                })

        //const paneSizeTotal = sum
         const paneSizeTotal = sum / 2
        console.warn('SIZE SUM', paneSizeTotal)
        if(this.MaxPaneSize !== paneSizeTotal) {
            console.error('Max limit cross, Max Pane Size:' + this.MaxPaneSize + ' Sum:' + paneSizeTotal)
          //  throw new Error ('Max limit cross, Max Pane Size:' + this.MaxPaneSize + ' Sum:' + paneSizeTotal)
        }
    }

}

const panesService = new PanesService()

export default panesService
