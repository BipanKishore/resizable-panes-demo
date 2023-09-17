import React, {useCallback, useState} from 'react'
import MinMaxViewer from '../../components/min-max-viewer'
import './style.scss'

import {
  Panes, ResizablePanes
} from 'react-resizable-panes'

export const PanesMinMax = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'
  const [pansizes, setPansizes] = useState<any>({})

  const onResize = useCallback((e: any) => {
    setPansizes(e)
  }, [])

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

        onResize={(e: any) => {
          setPansizes(e)
        }}
      >

        <Panes
          className={pane1}
          id={pane1}
          key={pane1}
          maxSize={450}
          minSize={100}
          size={350}
        >
          <MinMaxViewer
            maxSize={450}
            minSize={100}
            size={pansizes.pane1}
          />

        </Panes>

        <Panes
          className={pane2}
          id={pane2}
          key={pane2}
          maxSize={400}
          minSize={120}
          size={300}
        >
          <MinMaxViewer
            maxSize={400}
            minSize={120}
            size={pansizes.pane2}
          />
        </Panes>

        <Panes
          className={pane3}
          id={pane3}
          key={pane3}
          maxSize={500}
          minSize={150}
          size={200}
        >
          <MinMaxViewer
            maxSize={500}
            minSize={150}
            size={pansizes.pane3}
          />
        </Panes>

      </ResizablePanes>

    </div>
  )
}
