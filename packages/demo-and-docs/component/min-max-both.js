import PropTypes from 'prop-types'
import React from 'react'

import {
  Panes, ResizablePanes
} from '../resizable-panes'
import {TestComp} from './test-comp'

export const MinMaxBoth = ({
  onReady
}) => {
  return (

    <ResizablePanes
      resizerSize={5}
      onReady={onReady}
    >
      {
        <Panes className='pane1' id='pane1' maxSize={150} minSize={70} size={100} >
          <TestComp name={'Pane 1'} />
        </Panes>
            }

      <Panes className='pane2' id='pane2' maxSize={250} minSize={50} size={200} >
        <TestComp name={'Pane 2'} />
      </Panes>

      <Panes className='pane3' id='pane3' maxSize={300} minSize={30} size={250}>
        Pane 111
      </Panes>

      <Panes className='pane2' id='pane4' maxSize={300} minSize={100} size={250}>
        Pane 1111
      </Panes>
    </ResizablePanes>
  )
}

MinMaxBoth.propTypes = {
  onReady: PropTypes.func
}
