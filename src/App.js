import './App.css'

import React, {
    createRef, useCallback
} from 'react'

import {
    Panes,ResizablePanes
} from './resizable-panes'

const TestComp = ({
// eslint-disable-next-line react/prop-types
    name
}) => {

    console.log('v-- rendering ', name)
    return <div>{name}</div>

}

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
            <ResizablePanes resizerSize={5}
                onReady={onReady}
            >
                {

                    <Panes id='pane1' className='pane1' size={204} >
                        <TestComp name={'Pane 1'} />
                    </Panes>
                }

                <Panes id='pane2' className='pane2' size={204}>
                    <TestComp name={'Pane 2'} />
                </Panes>

                <Panes id='pane3' className='pane3' size={204}>
        Pane 111
                </Panes>

                <Panes id='pane4' className='pane2' size={203}>
        Pane 1111
                </Panes>

            </ResizablePanes>
        </div>
    )
}

export default App
