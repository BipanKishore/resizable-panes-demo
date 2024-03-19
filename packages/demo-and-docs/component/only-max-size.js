import PropTypes from 'prop-types'
import React from 'react'

import {
  Panes, ResizablePanes
} from '../resizable-panes'
import {TestComp} from './test-comp'

export const OnlyMaxSize = ({
  onReady
}) => {
  return (

    <ResizablePanes
      uniqueId='OnlyMaxPanes1'
      onReady={onReady}
    >
      {
        <Panes
          className='pane1'
          id='pane1'
          maxSize={200} size={200}
        >
          <TestComp name={'Pane 1'} />
        </Panes>
            }

      <Panes
        className='pane2' id='pane2' maxSize={100} size={50 }
      >
        <TestComp name={'Pane 2'} />
      </Panes>

      <Panes className='pane3' id='pane3' maxSize={130} size={100}>
        Pane 111
      </Panes>

      <Panes className='pane2' id='pane4' maxSize={300} size={250}>
        Pane 1111
      </Panes>
    </ResizablePanes>
  )
}

OnlyMaxSize.propTypes = {
  onReady: PropTypes.func
}
