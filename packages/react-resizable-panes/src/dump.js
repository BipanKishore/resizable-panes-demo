/*

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

Pane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane Class

    setMaxSize (limit) {
        // It will still have to run for no finite
        if(this.isFiniteMaxSize) {

            if(limit < this.size) {
                this.maxSize = this.size
                return
            }

            this.maxSize = limit < this.defaultMaxSize ? limit : this.defaultMaxSize
        } else {
            this.maxSize = limit
        }
        console.log('maxSize', this.maxSize, 'limit', limit, 'defaut', this.defaultMaxSize)
    }

    setMinSize (limit) {
        if(limit > this.size) {
            this.minSize = this.size
            return
        }
        this.minSize = limit > this.defaultMinSize ? limit : this.defaultMinSize
    }

  setMaxSize (newMaxSize) {
    if (this.defaultMaxSize < newMaxSize) {
      this.maxSize = this.defaultMaxSize
      console.log('size newMaxSize', this.maxSize, newMaxSize)
    } else {
      this.maxSize = newMaxSize
    }
  }

  setMinSize (newMinSize) {
    if (this.defaultMinSize > newMinSize) {
      this.minSize = this.defaultMaxSize
      console.log('size newMinSize', this.maxSize, newMinSize)
    } else {
      this.minSize = newMinSize
    }
  }

    setMinChangePossible (aMaxChange, bMaxChange, nextAMaxChange) {
    let aMaxChangePossible
    const orignalAMaxChange = this.getMinDiff()
    if (orignalAMaxChange === aMaxChange) {
      aMaxChangePossible = bMaxChange
    } else {
      aMaxChangePossible = orignalAMaxChange - nextAMaxChange
    }
    keyConsole({aMaxChange, aMaxChangePossible, nextAMaxChange, orignalAMaxChange})
    this.minSize = this.size - aMaxChangePossible
  }

  // (bMaxChange, aMaxChange, nextBMaxChange)
  setMaxChangePossible (bMaxChange, aMaxChange, nextBMaxChange) {
    let aMaxChangePossible
    const orignalBMaxChange = this.getMaxDiff()
    if (orignalBMaxChange === bMaxChange) {
      aMaxChangePossible = aMaxChange
    } else {
      aMaxChangePossible = orignalBMaxChange - nextBMaxChange
    }
    keyConsole({aMaxChangePossible, bMaxChange, nextBMaxChange, orignalBMaxChange})
    this.maxSize = this.size + aMaxChangePossible
  }

Pane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane Class

export const getMovementDirection = (e) => {
  const {
    movementX, movementY
  } = e
  const direction = movementY < ZERO ? DIRECTIONS.UP : DIRECTIONS.DOWN
  return direction
}

export const isDirectionUpFn = (e) => e.movementY < ZERO

export const isDirectionDown = (e) => e.movementY > ZERO

*/
