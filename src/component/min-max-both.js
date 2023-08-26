import PropTypes from 'prop-types'
import React from 'react'

import {
    Panes, ResizablePanes
} from '../resizable-panes'
import {TestComp} from './test-comp'

export const MinMaxBoth = ({
    onReady
}) => {

    return(

        <ResizablePanes resizerSize={5}
            onReady={onReady}
        >
            {
                <Panes id='pane1' className='pane1' size={100} minSize={70} maxSize={150} >
                    <TestComp name={'Pane 1'} />
                </Panes>
            }

            <Panes id='pane2' className='pane2' size={200} minSize={50} maxSize={250} >
                <TestComp name={'Pane 2'} />
            </Panes>

            <Panes id='pane3' className='pane3' size={250} minSize={30} maxSize={300}>
            Pane 111
            </Panes>

            <Panes id='pane4' className='pane2' size={250} minSize={100} maxSize={300}>
            Pane 1111
            </Panes>
        </ResizablePanes>
    )
}

MinMaxBoth.propTypes = {
    onReady: PropTypes.func
}