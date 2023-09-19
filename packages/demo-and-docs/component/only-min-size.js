import PropTypes from 'prop-types'
import React from 'react'

import {
  Panes, ResizablePanes
} from '../resizable-panes'
import {TestComp} from './test-comp'

export const OnlyMinSize = ({
  onReady
}) => {
  return (

    <ResizablePanes
      onReady={onReady}
    >
      {
        <Panes className='pane1' id='pane1' minSize={70} size={100} >
          <TestComp name={'Pane 1'} />
        </Panes>
            }

      <Panes className='pane2' id='pane2' minSize={50} size={200} >
        <TestComp name={'Pane 2'} />
      </Panes>

      <Panes className='pane3' id='pane3' minSize={30} size={250} >
        Pane 111
      </Panes>

      <Panes className='pane2' id='pane4' minSize={100} size={250} >
        Pane 1111
      </Panes>
    </ResizablePanes>
  )
}

OnlyMinSize.propTypes = {
  onReady: PropTypes.func
}
