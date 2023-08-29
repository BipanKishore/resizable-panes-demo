import './App.css'

import React, {
    createRef, useCallback
} from 'react'

import {
    CLOSE_MIN_FULLMAX_SET_1,
    MAX_SIZES_SET_1, MIN_FULLMAX_SET_1,
MIN_MAX_SET_1,
MIN_SIZES_SET_1,
    ONLY_SIZES_SET_1} from './component/constant'
import {DefaultSizes} from './component/default-sizes'

const set = CLOSE_MIN_FULLMAX_SET_1
function App () {

    const ref = createRef()

    const toggleShow = useCallback (() => {
        ref.current.setVisibility({
            pane1: true
        })
    }, [
        ref
    ])

    const onReady = (panesService) => {
        ref.current = {
            setVisibility: panesService.setVisibility
        }
    }

    return (
        <div className='App p-relative t-100' >
            <button onClick={toggleShow} >Buttoib</button>
            <DefaultSizes onReady={onReady} set={set} />
        </div>
    )
}

export default App
