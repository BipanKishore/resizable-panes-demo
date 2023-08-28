import './App.css'

import React, {
    createRef, useCallback
} from 'react'

import {
    MAX_SIZES_SET_1, MIN_SIZES_SET_1,
    ONLY_SIZES_SET_1
} from './component/constant'
import {DefaultSizes} from './component/default-sizes'

const set = MIN_SIZES_SET_1
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
        <div className='App' >
            <button onClick={toggleShow} >Buttoib</button>
            <DefaultSizes onReady={onReady} set={set} />
        </div>
    )
}

export default App
