import React, {
  useCallback, useRef, useState
} from 'react'

import {
  CLOSE_MIN_FULLMAX_SET_1,
  FIRST_SIZE_AND_MAX_SAME_SET_1, MIN_FULLMAX_SET_1,
  MIN_MAX_SET_1,
  MIN_SIZES_SET_1,
  MIN_ZERO_FULLMAX_SET_1,
  ONLY_SIZES_SET_1
  , SECOND_SIZE_MAX_SIZE_SAME_SET_1
} from '../../component/constant'
import {DefaultSizes} from '../../component/default-sizes'
import {ResizerNode1} from '../components/resizer-nodes/resize-node-1'

const PaneConfigSet: any = {
  SECOND_SIZE_MAX_SIZE_SAME_SET_1,
  CLOSE_MIN_FULLMAX_SET_1,
  FIRST_SIZE_AND_MAX_SAME_SET_1,
  MIN_FULLMAX_SET_1,
  MIN_MAX_SET_1,
  MIN_SIZES_SET_1,
  MIN_ZERO_FULLMAX_SET_1,
  ONLY_SIZES_SET_1
}

const configKeys: string[] = Object.keys(
  PaneConfigSet
)

export const ApiDocs = () => {
  let [count, setCount] = useState(0)
  const [justUpdate, setJustUpdate] = useState(true)

  const ref: any = useRef()

  const [split, setSplit] = useState('vertical')

  const toggleShow = useCallback(() => {
    setCount(++count)
  }, [
    count
  ])

  const toggleSplit = useCallback(() => {
    setSplit(split ? 'vertical' : 'horizontal')
  }, [
    split
  ])

  const key = configKeys[count % configKeys.length]

  return (
    <div>
      <div className='App p-relative t-100' ></div>

      <button className='btn btn-secondary btn-sm ms-1' onClick={() => setJustUpdate(!justUpdate)}>setJustUpdate </button>
      <button className='btn btn-secondary btn-sm ms-1' onClick={() => ref.current.toFullSize('pane1')}>toFullSize </button>
      <button className='btn btn-secondary btn-sm ms-1' onClick={() => ref.current.closeFullSize()}>closeFullSize </button>
      <button className='btn btn-secondary btn-sm ms-1' onClick={() => ref.current.restoreDefault()}>restoreDefault </button>
      <button className='btn btn-secondary btn-sm ms-1' onClick={() => ref.current.toFullPage('pane1')}>toFullPage </button>
      <button className='btn btn-secondary btn-sm ms-1' onClick={() => ref.current.setVisibility({pane1: false, pane4: false})}>Hide Pane 1 & 4 </button>
      <button className='btn btn-secondary btn-sm ms-1' onClick={() => ref.current.setVisibility({pane1: true, pane4: true})}>Show Pane 1 & 4 </button>

      <button className='btn btn-secondary btn-sm ms-1' onClick={toggleShow} >Buttoib</button> <b>{key}</b>
      <button className='btn btn-secondary btn-sm ms-1' onClick={toggleSplit} >Buttoib</button> <b>{split}</b>
      <ResizerNode1 />
      <DefaultSizes
        justUpdate={justUpdate}
        set={PaneConfigSet[key]} split={split} onReady={(api) => {
          ref.current = api
        }}
      />
    </div>
  )
}
