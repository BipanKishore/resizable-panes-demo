import React, {
  createRef, useCallback, useRef, useState
} from 'react'

import {
  CLOSE_MIN_FULLMAX_SET_1,
  FIRST_SIZE_AND_MAX_SAME_SET_1, MIN_FULLMAX_SET_1,
  MIN_MAX_SET_1,
  MIN_SIZES_SET_1,
  MIN_ZERO_FULLMAX_SET_1,
  ONLY_SIZES_SET_1,
  SECOND_SIZE_MAX_SIZE_SAME_SET_1
} from './component/constant'
import {DefaultSizes} from './component/default-sizes'
import { Tabs } from './src/components/tabs'


const PaneConfigSet: any = {
  SECOND_SIZE_MAX_SIZE_SAME_SET_1,
  CLOSE_MIN_FULLMAX_SET_1,
  FIRST_SIZE_AND_MAX_SAME_SET_1, MIN_FULLMAX_SET_1,
  MIN_MAX_SET_1,
  MIN_SIZES_SET_1,
  MIN_ZERO_FULLMAX_SET_1,
  ONLY_SIZES_SET_1
}

const configKeys: string[] = Object.keys(
  PaneConfigSet
)





function App () {
let [count, setCount] = useState(0)

const ref: any = useRef()

const [split, setSplit] = useState('vertical')

const toggleShow = useCallback(() => {
  setCount(++count)
}, [
  count
])

const toggleSplit = useCallback(() => {
  setSplit(split ? 'vertical': 'horizontal')
}, [
  split
])


  const key =  configKeys [count%configKeys.length]

  return (
    <div className='App p-relative t-100' >
       <div>
    
    <button onClick={() => ref.current.toFullSize('pane1') }>toFullSize </button>
    <button onClick={() => ref.current.closeFullSize() }>closeFullSize </button>

</div>
      <Tabs />
    <button onClick={toggleShow} >Buttoib</button> <b>{key}</b>
      <button onClick={toggleSplit} >Buttoib</button> <b>{split}</b>

      <DefaultSizes set={PaneConfigSet[key]} onReady={(api)=>{
        ref.current = api
      }} split={split} />
    </div>
  )
}

export default App
