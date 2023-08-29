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
Pane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane ClassPane Class
*/