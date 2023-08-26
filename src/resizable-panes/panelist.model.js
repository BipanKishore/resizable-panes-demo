import {Pane} from './pane.model'

export class PanesList {
	paneList = [
]

	panesRefs = [
]

	constructor (panesRefs = [
]) {
		this.panesRefs = panesRefs

		panesRefs?.current?.forEach((pane, index) => {
			this.paneList.push(
				new Pane(
					pane,
					index
				)
			)
		})
	}

	setSize (i, size) {
		this.paneList[i].size = size
	}

	setUISizes () {
// 		const sizesList = [
// ]
		this.paneList.forEach(((pane) => {
			pane.setUISize()
		}))
		// console.log('sizesList',sizesList, sizesList.reduce((p, c) => p + c, 0))
	}

	syncAxisSizes () {
		const axisSizes = [
]
		this.paneList.forEach(((pane) => {
		  const a =	pane.syncAxisSize()
		  axisSizes.push(a)
		}))
	}

	log () {
		let str = ''
		this.paneList.forEach(({
size
}) => str+=size +', ')
		str +=';'
		this.paneList.forEach(({
axisSize
}) => str+=axisSize+', ')
		console.log('panes', str)
	}

}