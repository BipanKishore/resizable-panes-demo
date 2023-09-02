import { PaneModel } from "../models/pane-model"
import { keyConsole } from "./development-util"
import { synPanesMaxToSize, synPanesMinToSize } from "./util"

export const minMaxLogicUp  = (panesList: PaneModel[], value: number, aIndex: number, bIndex: number, sum = 0, maxPaneSize: number) =>{
    const lastIndex = panesList.length -1

    keyConsole({aIndex, bIndex, value, sum}, 'newMinMaxLogicUpnewMinMaxLogicUp')
    let nextValue
    let nextAIndex = aIndex
    let nextBIndex = bIndex
    switch (true) {
      // total 6 combination
      case aIndex > 0 && bIndex < lastIndex:
        switch (true) {
          case value < 0:
            sum += panesList[aIndex].resetMin()
            nextAIndex = aIndex - 1
            nextValue = panesList[nextAIndex].getMinDiff() + value
            break

          case value === 0:
            sum += panesList[aIndex].resetMin()
            sum += panesList[bIndex].resetMax()
            nextAIndex = aIndex - 1
            nextBIndex = bIndex + 1
            nextValue = panesList[nextAIndex].getMinDiff() - panesList[nextBIndex].getMaxDiff()
            break

          case value > 0:
            sum += panesList[bIndex].resetMax()
            nextBIndex = bIndex + 1
            nextValue = value - panesList[nextBIndex].getMaxDiff()
            break
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex === 0 && bIndex < lastIndex:
        switch (true) {
          case value < 0:
            sum += panesList[aIndex].resetMin()
            sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
            panesList[bIndex].maxSize = maxPaneSize - sum
            return

          case value === 0:
            sum += panesList[aIndex].resetMin()
            sum += panesList[bIndex].resetMax()
            sum += synPanesMaxToSize(panesList, bIndex + 1, lastIndex)
            return

          case value > 0:
            // not change from previous switch
            sum += panesList[bIndex].resetMax()
            nextBIndex = bIndex + 1
            nextValue = value - panesList[nextBIndex].getMaxDiff()
            break
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex > 0 && bIndex === lastIndex:
        switch (true) {
          case value < 0:
            sum += panesList[aIndex].resetMin()
            nextAIndex = aIndex - 1
            nextValue = panesList[nextAIndex].getMinDiff() + value
            break

          case value === 0:
            sum += panesList[aIndex].resetMin()
            sum += panesList[bIndex].resetMax()
            sum += synPanesMinToSize(panesList, 0, aIndex - 1)
            return

          case value > 0:
            sum += panesList[bIndex].resetMax()
            sum += synPanesMinToSize(panesList, 0, aIndex - 1)
            panesList[aIndex].minSize = maxPaneSize - sum
            return
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex === 0 && bIndex === lastIndex:
        // return for every case
        switch (true) {
          case value < 0:
            sum += panesList[aIndex].resetMin()
            // synPanesMinToSize(panesList, bIndex + 1, lastIndex) // It wont run
            panesList[bIndex].maxSize = maxPaneSize - sum
            break

          case value === 0:
            sum += panesList[aIndex].resetMin()
            sum += panesList[bIndex].resetMax()

          case value > 0:
            sum += panesList[bIndex].resetMax()
            // synPanesMaxToSize(panesList, 0, aIndex - 1) // It wont Run
            panesList[aIndex].minSize = maxPaneSize - sum
        }
        return
        // ---------------------------------------------------------------------------------
      default:
        console.error('v---------------------------------------------------------------')
        break
    }
    // paneConsole('minSize')
    // paneConsole('maxSize')
    minMaxLogicUp(panesList, nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
  }

  
  export const minMaxLogicDown = (panesList: PaneModel[], value: number, aIndex: number, bIndex: number, sum = 0, maxPaneSize: number) =>{
    const lastIndex = panesList.length -1
    keyConsole({aIndex, bIndex, value, sum})
    let nextValue
    let nextAIndex = aIndex
    let nextBIndex = bIndex
    switch (true) {
      // total 6 combination
      case aIndex > 0 && bIndex < lastIndex:
        switch (true) {
          case value < 0:
            sum += panesList[aIndex].resetMax()
            nextAIndex = aIndex - 1
            nextValue = panesList[nextAIndex].getMaxDiff() + value
            break

          case value === 0:
            sum += panesList[aIndex].resetMax()
            sum += panesList[bIndex].resetMin()
            nextAIndex = aIndex - 1
            nextBIndex = bIndex + 1
            nextValue = panesList[nextAIndex].getMaxDiff() - panesList[nextBIndex].getMinDiff()
            break

          case value > 0:
            sum += panesList[bIndex].resetMin()
            nextBIndex = bIndex + 1
            nextValue = value - panesList[nextBIndex].getMinDiff()
            break
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex === 0 && bIndex < lastIndex:
        switch (true) {
          case value < 0:
            sum += panesList[aIndex].resetMax()
            sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
            panesList[bIndex].minSize = maxPaneSize - sum
            return

          case value === 0:
            sum += panesList[aIndex].resetMax()
            sum += panesList[bIndex].resetMin()
            sum += synPanesMinToSize(panesList, bIndex + 1, lastIndex)
            return

          case value > 0:
            // not change from previous switch
            sum += panesList[bIndex].resetMin()
            nextBIndex = bIndex + 1
            nextValue = value - panesList[nextBIndex].getMinDiff()
            break
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex > 0 && bIndex === lastIndex:
        switch (true) {
          case value < 0:
            sum += panesList[aIndex].resetMax()
            nextAIndex = aIndex - 1
            nextValue = panesList[nextAIndex].getMaxDiff() + value
            break

          case value === 0:
            sum += panesList[aIndex].resetMax()
            sum += panesList[bIndex].resetMin()
            sum += synPanesMaxToSize(panesList, 0, aIndex - 1)
            return

          case value > 0:
            sum += panesList[bIndex].resetMin()
            sum += synPanesMaxToSize(panesList, 0, aIndex - 1)
            panesList[aIndex].maxSize = maxPaneSize - sum
            return
        }
        break
        // ---------------------------------------------------------------------------------
      case aIndex === 0 && bIndex === lastIndex:
        // return for every case
        switch (true) {
          case value < 0:
            sum += panesList[aIndex].resetMax()
            // synPanesMinToSize(panesList, bIndex + 1, lastIndex) // It wont run
            panesList[bIndex].minSize = maxPaneSize - sum
            break

          case value === 0:
            sum += panesList[aIndex].resetMax()
            sum += panesList[bIndex].resetMin()

          case value > 0:
            sum += panesList[bIndex].resetMin()
            // synPanesMaxToSize(panesList, 0, aIndex - 1) // It wont Run
            panesList[aIndex].maxSize = maxPaneSize - sum
        }
        return
        // ---------------------------------------------------------------------------------
      default:
        console.error('v---------------------------------------------------------------')
        break
    }

    minMaxLogicDown(panesList, nextValue, nextAIndex, nextBIndex, sum, maxPaneSize)
  }


  export const setDownMaxLimits = (panesList: PaneModel[], index: number) =>{
    for(let i = 0; i <= index; i++){
      panesList[i].size = panesList[i].maxSize
    }
    
    for(let i = index + 1; i < panesList.length; i++){
      panesList[i].size = panesList[i].minSize
    }
  }

export const  setUpMaxLimits = (panesList: PaneModel[], index: number) => {
    for(let i = 0; i <= index; i++){
      panesList[i].size = panesList[i].minSize
    }
    
    for(let i = index + 1; i < panesList.length; i++){
      panesList[i].size = panesList[i].maxSize
    }
  }
