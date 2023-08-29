/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types'
import React from 'react'

import {
    Panes, ResizablePanes
} from '../resizable-panes'
import {TestComp} from './test-comp'

export const DefaultSizes = ({
    onReady, set
}) => {

    const {
        maxSizes,
        minSizes,
        sizes
    } = set

    return(
        <ResizablePanes resizerSize={5}
            onReady={onReady}
        >

            {
                <Panes id='pane1' className='pane1' size={sizes[0]} maxSize={maxSizes[0]} minSize={minSizes[0]} >
                    <TestComp name={'Pane 1'} />
                </Panes>
            }

            <Panes id='pane2' className='pane2' size={sizes[1]} maxSize={maxSizes[1]} minSize={minSizes[1]} >
                <TestComp name={'Pane 2'} />
            </Panes>

            <Panes id='pane3' className='pane3' size={sizes[2]} maxSize={maxSizes[2]} minSize={minSizes[2]} >
            Pane 111
            </Panes>

            <Panes id='pane4' className='pane2' size={sizes[3]} maxSize={maxSizes[3]} minSize={minSizes[3]} >
            Pane 1111
            </Panes>

        </ResizablePanes>
    )

}

DefaultSizes.propTypes = {
    onReady: PropTypes.func,
    set: PropTypes.object
}