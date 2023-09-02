/* eslint-disable complexity */
/* eslint-disable no-unused-vars */
import { SyntheticEvent } from 'react'
import {
  DIRECTIONS, MINUS_ONE, ONE, ZERO
} from '../constant'
import {PaneModel} from '../models/pane-model'
import {subscription} from '../services/subscription'
import {
  getDirection,
  getMaxSizeSum,
  getMinSizeSum,
  isDirectionDown, isDirectionUpFn,
  synPanesMaxToSize,
  synPanesMinToSize,
  toPx
} from '../utils/util'
import { IInitPaneService, IPanesVisibility } from '../models/pane-service-models'
import { directionBehaviourConsole, keyConsole, minMaxTotal, paneConsole, setPaneList } from '../utils/development-util'
import { minMaxLogicDown, minMaxLogicUp, setDownMaxLimits, setUpMaxLimits } from '../utils/panes'

export class PanesService {
  activeIndex: number = null

  split = 'vertical'

  containerRef: any

  direction = DIRECTIONS.NONE
  prevDirection = DIRECTIONS.NONE

  panesRefs:any = []

  resizerSize: number
  axisCoordinate: number

  maxPaneSize: number
  maxTopAxis: number

  bottomAxis: number
  topAxis: number
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
    this.maxTopAxis = top
    this.maxPaneSize = height - ((this.panesList.length - 1) * this.resizerSize)
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

    minMaxLogicUp(this.panesList, aMaxChangeUp - bMaxChangeUp, index, index + 1, 0, this.maxPaneSize)

    // this.initMinMaxLogic()
    const aMaxChangeDown = this.panesList[index + 1].getMinDiff()
    const bMaxChangeDown = this.panesList[index].getMaxDiff()
    minMaxLogicDown(this.panesList, bMaxChangeDown - aMaxChangeDown, index, index + 1, 0, this.maxPaneSize)
    this.calculateAxes(this.activeIndex)
    this.devMinMaxCheck()
  }

  devMinMaxCheck () {
    // Only for Development
    console.log('v---------------------------------------------------------------------------------------')
    this.paneConsole('minSize')
    this.paneConsole('maxSize')
    this.minMaxTotal()
  }

  calculateAxes(index: number){
    const resizerSizeHalf = Math.floor(this.resizerSize/2)
    this.bottomAxis = this.maxTopAxis  + getMaxSizeSum(this.panesList, 0, index) + index  * this.resizerSize + resizerSizeHalf
    this.topAxis = this.maxTopAxis  + getMinSizeSum(this.panesList, 0, index)  + index * this.resizerSize + resizerSizeHalf
  }

  setDownMaxLimits(index: number){
    for(let i = 0; i <= index; i++){
      this.panesList[i].size = this.panesList[i].maxSize
    }
    
    for(let i = index + 1; i <= this.lastIndex; i++){
      this.panesList[i].size = this.panesList[i].minSize
    }
  }


  setUpMaxLimits(index: number){
    for(let i = 0; i <= index; i++){
      this.panesList[i].size = this.panesList[i].minSize
    }
    
    for(let i = index + 1; i <= this.lastIndex; i++){
      this.panesList[i].size = this.panesList[i].maxSize
    }
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
            this.panesList[bIndex].maxSize = this.maxPaneSize - sum
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
            this.panesList[aIndex].minSize = this.maxPaneSize - sum
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
            this.panesList[bIndex].maxSize = this.maxPaneSize - sum
            break

          case value === 0:
            sum += this.panesList[aIndex].resetMin()
            sum += this.panesList[bIndex].resetMax()

          case value > 0:
            sum += this.panesList[bIndex].resetMax()
            // synPanesMaxToSize(this.panesList, 0, aIndex - 1) // It wont Run
            this.panesList[aIndex].minSize = this.maxPaneSize - sum
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
            this.panesList[bIndex].minSize = this.maxPaneSize - sum
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
            this.panesList[aIndex].maxSize = this.maxPaneSize - sum
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
            this.panesList[bIndex].minSize = this.maxPaneSize - sum
            break

          case value === 0:
            sum += this.panesList[aIndex].resetMax()
            sum += this.panesList[bIndex].resetMin()

          case value > 0:
            sum += this.panesList[bIndex].resetMin()
            // synPanesMaxToSize(this.panesList, 0, aIndex - 1) // It wont Run
            this.panesList[aIndex].maxSize = this.maxPaneSize - sum
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
      const isChangeRequired = this.setAxisConfig(e)

      if(isChangeRequired){
        if (e.movementY > ZERO) {
          this.goingDownLogic(e)
        } else if (e.movementY < ZERO) {
          this.goingUpLogic(e)
        }
      }

      this.setUISizes(e)
    }
  }

  setAxisConfig (e: any) {
    if(e.clientY <= this.topAxis){
      setUpMaxLimits(this.panesList, this.activeIndex)
      this.syncAxisSizes()
      this.axisCoordinate = this.topAxis
    } else if(e.clientY >= this.bottomAxis){
      setDownMaxLimits(this.panesList, this.activeIndex)
      this.syncAxisSizes()
      this.axisCoordinate = this.bottomAxis
    }

    return true
  }

  setDirection (e: any) {
    this.direction = getDirection(e)
    directionBehaviourConsole(this.direction, this.prevDirection)

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
  }

  setMouseDownAndPaneAxisDetails (e: any) {
    const {clientX, clientY} = e
    this.direction = DIRECTIONS.NONE
    this.prevDirection = DIRECTIONS.NONE
    this.axisCoordinate = clientY
    this.syncAxisSizes()
  }

  setVisibility (visibility: IPanesVisibility) {
    for (const key in visibility) {
      //
    }
  }

  paneConsole = (key:string) => paneConsole(this.panesList, key)
  setPaneList =(keys: string[] = [], value: any = null) => setPaneList(this.panesList, keys, value)
  minMaxTotal = () => minMaxTotal(this.panesList, this.maxPaneSize)
}

const panesService = new PanesService()

export default panesService


