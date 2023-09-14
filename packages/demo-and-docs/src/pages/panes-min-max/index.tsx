import React from 'react'
import {
  Panes, ResizablePanes
} from 'react-resizable-panes'

export const PanesMinMax = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'
  return (
    <div>
      <div>
        <h4>Some Title</h4>
      </div>

      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries.
        versions of Lorem Ipsum.
      </div>

      <ResizablePanes
        className='h-300'
        split='vertical'

        onResize={(e) => {
          console.log(e, 'vvsfasfsfasdf')
        }}
      >

        <Panes
          className={pane1}
          id={pane1}
          key={pane1}
          size={350}
        >
        </Panes>

        <Panes
          className={pane2}
          id={pane2}
          key={pane2}
          size={300}
        >
        </Panes>

        <Panes
          className={pane3}
          id={pane3}
          key={pane3}
          size={200}
        >
        </Panes>

      </ResizablePanes>

    </div>
  )
}
