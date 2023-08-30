/* eslint-disable complexity */
/* eslint-disable no-unused-vars */
import { SyntheticEvent } from 'react'
import {
  DIRECTIONS, MINUS_ONE, ONE, ZERO
} from './constant'
import {PaneModel} from './pane-model'
import {subscription} from './subscription'
import {
  getDirection,
  isDirectionDown, isDirectionUpFn, keyConsole,
  synPanesMaxToSize,
  synPanesMinToSize,
  toPx
} from './util'
import { IInitPaneService, IPanesVisibility } from './pane-service-models'

class PanesService {
  activeIndex: number = null

  split = 'vertical'

  containerRef: any

  direction = DIRECTIONS.NONE
  prevDirection = DIRECTIONS.NONE

  limitFinishedAxis: number = null
  limitFinishedDirection = DIRECTIONS.NONE

  panesRefs:any = []

  resizerSize: number
  axisCoordinate: number
  topAxix: number
  bottomAxis: number
  MaxPaneSize: number
  topAxisCrossed: boolean
  bottomAxisCrossed: boolean
  panesList: PaneModel[] = []

  get panes () {
    return this.panesRefs.current
  }

  get lastIndex () {
    return this.panesList.length - 1
  }

  constructor () {
    this.setVisibility = this.setVisibility.bind(this)
  }

  createPaneList (panesRefs: any, children: any[]) {
    this.panesRefs = panesRefs
    this.panesList = []
    panesRefs?.current?.forEach((pane: any, index: number) => {
      this.panesList.push(
        new PaneModel(pane, index, children[index])
      )
    })
  }

  // Not using now
  synSizesToUI () {
    this.panesList.forEach((pane) => pane.synSizeToUI())
  }

  setUISizes (e: SyntheticEvent) {
    this.panesList.forEach((pane) => {
      pane.setUISize()
    })
    this.publishPanes(e)
  }

  syncAxisSizes () {
    this.panesList.forEach((pane) => {
      pane.syncAxisSize()
    })
  }

  publishPanes (e:any) {
    this.panesList.forEach((pane) => {
      subscription.publish(pane.id, {
        ...pane,
        Y: e.clientY,
        axisCoordinate: this.axisCoordinate
      })
    })
  }

  initPanesService ({
    children,
    containerRef,
    panesRefs,
    resizerSize
  }: IInitPaneService) {
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

  initMinMaxLogic () {
    this.setPaneList([
      'minSize'
    ], 0)

    this.setPaneList([
      'maxSize'
    ], Infinity)
  }

  setCurrentMinMax (index: number) {
    // this.initMinMaxLogic()
    const aMaxChangeUp = this.panesList[index].getMinDiff()
    const bMaxChangeUp = this.panesList[index + 1].getMaxDiff()
    this.minMaxLogicUp(aMaxChangeUp - bMaxChangeUp, index, index + 1)

    const aMaxChangeDown = this.panesList[index + 1].getMinDiff()
    const bMaxChangeDown = this.panesList[index].getMaxDiff()
    this.minMaxLogicDown(bMaxChangeDown - aMaxChangeDown, index, index + 1)
    this.devMinMaxCheck()
  }

  devMinMaxCheck () {
    // Only for Development
    console.log('v---------------------------------------------------------------------------------------')
    this.paneConsole('minSize')
    this.paneConsole('maxSize')
    this.minMaxTotal()
  }

  minMaxLogicUp (value: number, aIndex: number, bIndex: number, sum = 0) {
    keyConsole({aIndex, bIndex, value, sum}, 'newMinMaxLogicUpnewMinMaxLogicUp')
    let nextValue
    let nextAIndex = aIndex
    let nextBIndex = bIndex
    switch (true) {
      // total 6 combination
      case aIndex > 0 && bIndex < this.lastIndex:
        switch (true) {
          case value < 0:
            sum += this.panesList[aIndex].resetMin()
            nextAIndex = aIndex - 1
            nextValue = this.panesList[nextAIndex].getMinDiff() + value
            break

          case value === 0:
            sum += this.panesList[aIndex].resetMin()
            sum += this.panesList[bIndex].resetMax()
            nextAIndex = aIndex - 1
            nextBIndex = bIndex + 1
            nextValue = this.panesList[nextAIndex].getMinDiff() - this.panesList[nextBIndex].getMaxDiff()
            break

          case value > 0:
            sum += this.panesList[bIndex].resetMax()
            nextBIndex = bIndex + 1
            nextValue = value - this.panesList[nextBIndex].getMaxDiff()
            break
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex === 0 && bIndex < this.lastIndex:
        switch (true) {
          case value < 0:
            sum += this.panesList[aIndex].resetMin()
            sum += synPanesMaxToSize(this.panesList, bIndex + 1, this.lastIndex)
            this.panesList[bIndex].maxSize = this.MaxPaneSize - sum
            return

          case value === 0:
            sum += this.panesList[aIndex].resetMin()
            sum += this.panesList[bIndex].resetMax()
            sum += synPanesMaxToSize(this.panesList, bIndex + 1, this.lastIndex)
            return

          case value > 0:
            // not change from previous switch
            sum += this.panesList[bIndex].resetMax()
            nextBIndex = bIndex + 1
            nextValue = value - this.panesList[nextBIndex].getMaxDiff()
            break
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex > 0 && bIndex === this.lastIndex:
        switch (true) {
          case value < 0:
            sum += this.panesList[aIndex].resetMin()
            nextAIndex = aIndex - 1
            nextValue = this.panesList[nextAIndex].getMinDiff() + value
            break

          case value === 0:
            sum += this.panesList[aIndex].resetMin()
            sum += this.panesList[bIndex].resetMax()
            sum += synPanesMinToSize(this.panesList, 0, aIndex - 1)
            return

          case value > 0:
            sum += this.panesList[bIndex].resetMax()
            sum += synPanesMinToSize(this.panesList, 0, aIndex - 1)
            this.panesList[aIndex].minSize = this.MaxPaneSize - sum
            return
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex === 0 && bIndex === this.lastIndex:
        // return for every case
        switch (true) {
          case value < 0:
            sum += this.panesList[aIndex].resetMin()
            // synPanesMinToSize(this.panesList, bIndex + 1, this.lastIndex) // It wont run
            this.panesList[bIndex].maxSize = this.MaxPaneSize - sum
            break

          case value === 0:
            sum += this.panesList[aIndex].resetMin()
            sum += this.panesList[bIndex].resetMax()

          case value > 0:
            sum += this.panesList[bIndex].resetMax()
            // synPanesMaxToSize(this.panesList, 0, aIndex - 1) // It wont Run
            this.panesList[aIndex].minSize = this.MaxPaneSize - sum
        }
        return
        // ---------------------------------------------------------------------------------
      default:
        console.error('v---------------------------------------------------------------')
        break
    }
    // this.paneConsole('minSize')
    // this.paneConsole('maxSize')
    this.minMaxLogicUp(nextValue, nextAIndex, nextBIndex, sum)
  }

  minMaxLogicDown (value: number, aIndex: number, bIndex: number, sum = 0) {
    keyConsole({aIndex, bIndex, value, sum})
    let nextValue
    let nextAIndex = aIndex
    let nextBIndex = bIndex
    switch (true) {
      // total 6 combination
      case aIndex > 0 && bIndex < this.lastIndex:
        switch (true) {
          case value < 0:
            sum += this.panesList[aIndex].resetMax()
            nextAIndex = aIndex - 1
            nextValue = this.panesList[nextAIndex].getMaxDiff() + value
            break

          case value === 0:
            sum += this.panesList[aIndex].resetMax()
            sum += this.panesList[bIndex].resetMin()
            nextAIndex = aIndex - 1
            nextBIndex = bIndex + 1
            nextValue = this.panesList[nextAIndex].getMaxDiff() - this.panesList[nextBIndex].getMinDiff()
            break

          case value > 0:
            sum += this.panesList[bIndex].resetMin()
            nextBIndex = bIndex + 1
            nextValue = value - this.panesList[nextBIndex].getMinDiff()
            break
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex === 0 && bIndex < this.lastIndex:
        switch (true) {
          case value < 0:
            sum += this.panesList[aIndex].resetMax()
            sum += synPanesMinToSize(this.panesList, bIndex + 1, this.lastIndex)
            this.panesList[bIndex].minSize = this.MaxPaneSize - sum
            return

          case value === 0:
            sum += this.panesList[aIndex].resetMax()
            sum += this.panesList[bIndex].resetMin()
            sum += synPanesMinToSize(this.panesList, bIndex + 1, this.lastIndex)
            return

          case value > 0:
            // not change from previous switch
            sum += this.panesList[bIndex].resetMin()
            nextBIndex = bIndex + 1
            nextValue = value - this.panesList[nextBIndex].getMinDiff()
            break
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex > 0 && bIndex === this.lastIndex:
        switch (true) {
          case value < 0:
            sum += this.panesList[aIndex].resetMax()
            nextAIndex = aIndex - 1
            nextValue = this.panesList[nextAIndex].getMaxDiff() + value
            break

          case value === 0:
            sum += this.panesList[aIndex].resetMax()
            sum += this.panesList[bIndex].resetMin()
            sum += synPanesMaxToSize(this.panesList, 0, aIndex - 1)
            return

          case value > 0:
            sum += this.panesList[bIndex].resetMin()
            sum += synPanesMaxToSize(this.panesList, 0, aIndex - 1)
            this.panesList[aIndex].maxSize = this.MaxPaneSize - sum
            return
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex === 0 && bIndex === this.lastIndex:
        // return for every case
        switch (true) {
          case value < 0:
            sum += this.panesList[aIndex].resetMax()
            // synPanesMinToSize(this.panesList, bIndex + 1, this.lastIndex) // It wont run
            this.panesList[bIndex].minSize = this.MaxPaneSize - sum
            break

          case value === 0:
            sum += this.panesList[aIndex].resetMax()
            sum += this.panesList[bIndex].resetMin()

          case value > 0:
            sum += this.panesList[bIndex].resetMin()
            // synPanesMaxToSize(this.panesList, 0, aIndex - 1) // It wont Run
            this.panesList[aIndex].maxSize = this.MaxPaneSize - sum
        }
        return
        // ---------------------------------------------------------------------------------
      default:
        console.error('v---------------------------------------------------------------')
        break
    }

    this.minMaxLogicDown(nextValue, nextAIndex, nextBIndex, sum)
  }

  setActiveIndex (index: number) {
    this.activeIndex = index
  }

  calculateAndSetHeight (e: any) {
    if (e.movementY) {
      this.setDirection(e)
      if (!this.limitFinishedAxis) {
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

  setAxisConfig (e: any) {
    this.topAxisCrossed = false
    this.bottomAxisCrossed = false

    if (e.clientY <= this.topAxix) {
      this.axisCoordinate = this.topAxix
      this.syncAxisSizes()
      this.topAxisCrossed = true
    } else if (e.clientY >= this.bottomAxis) {
      this.axisCoordinate = this.bottomAxis
      this.syncAxisSizes()
      this.bottomAxisCrossed = true
    }
  }

  setDirection (e: any) {
    this.direction = getDirection(e)
    switch (true) {
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

    switch (true) {
      case this.limitFinishedAxis &&
            this.limitFinishedDirection === DIRECTIONS.UP &&
            this.limitFinishedAxis <= e.clientY &&
            this.direction === DIRECTIONS.DOWN :

      case this.limitFinishedAxis &&
            this.limitFinishedDirection === DIRECTIONS.DOWN &&
            this.limitFinishedAxis >= e.clientY &&
            this.direction === DIRECTIONS.UP :

        this.axisCoordinate = this.limitFinishedAxis
        this.limitFinishedAxis = null
        this.limitFinishedDirection = DIRECTIONS.NONE
    }

    if (this.prevDirection !== this.direction) {
      this.directionChangeActions(e)
      this.prevDirection = this.direction
    }
  }

  directionChangeActions (e: any) {
    this.axisCoordinate = e.clientY
    this.syncAxisSizes()
    this.setCurrentMinMax(this.activeIndex)
  }

  goingDownLogic (e: any) {
    let sizeChange = e.clientY - this.axisCoordinate
    if (sizeChange < ZERO) {
      return
    }
    let sizeChangeUp = sizeChange

    for (let i = this.activeIndex; i > MINUS_ONE; i -= 1) {
      sizeChangeUp = this.panesList[i].addSize(sizeChangeUp)
    }

    sizeChange -= sizeChangeUp

    for (let i = this.activeIndex + 1; i < this.panesList.length; i += 1) {
      sizeChange = this.panesList[i].removeSize(sizeChange)
    }

    if (sizeChangeUp || sizeChange) {
      this.limitFinishedAxis = e.clientY
      this.limitFinishedDirection = this.direction
    }
  }

  goingUpLogic (e: any) {
    let sizeChange = this.axisCoordinate - e.clientY
    if (sizeChange < ZERO) {
      return
    }
    let sizeChangeUp = sizeChange

    for (let i = this.activeIndex + 1; i < this.panesList.length; i++) {
      sizeChangeUp = this.panesList[i].addSize(sizeChangeUp)
    }

    sizeChange -= sizeChangeUp
    for (let i = this.activeIndex; i > MINUS_ONE; i -= 1) {
      sizeChange = this.panesList[i].removeSize(sizeChange)
    }

    if (sizeChangeUp || sizeChange) {
      this.limitFinishedAxis = e.clientY
      this.limitFinishedDirection = this.direction
    }
  }

  setMouseDownAndPaneAxisDetails (e: any) {
    const {clientX, clientY} = e

    this.direction = DIRECTIONS.NONE
    this.prevDirection = DIRECTIONS.NONE

    this.axisCoordinate = clientY
    this.limitFinishedAxis = null
    this.syncAxisSizes()
  }

  setVisibility (visibility: IPanesVisibility) {
    for (const key in visibility) {
      //
    }
  }

  getList (key: string) {
    return this.panesList.map((pane: any) => pane[key])
  }

  paneConsole (key: string) {
    console.log('v-- ' + key, this.getList(key))
  }

  setPaneList (keys: string[] = [], value: any = null) {
    this.panesList.forEach((pane: any) => keys.forEach((key: string) => (pane[key] = value)))
    keys.forEach((key) => this.paneConsole(key))
  }

  minMaxTotal () {
    let sum = 0
    this.panesList
      .forEach(({minSize, maxSize}) => {
        maxSize = Number.isFinite(maxSize) ? maxSize : 0
        sum += ((maxSize || 0) + (minSize || 0))
      })

    // const paneSizeTotal = sum
    const paneSizeTotal = sum / 2
    console.warn('SIZE SUM', sum, paneSizeTotal, 'max allowd', this.MaxPaneSize)
    if ((this.MaxPaneSize !== sum && this.MaxPaneSize !== paneSizeTotal)) {
      console.error('Max limit cross, Max Pane Size:' + this.MaxPaneSize + ' Sum:' + paneSizeTotal)
      //  throw new Error ('Max limit cross, Max Pane Size:' + this.MaxPaneSize + ' Sum:' + paneSizeTotal)
    }
  }
}

const panesService = new PanesService()

export default panesService
