[![Open in StackBiltz](https://img.shields.io/badge/Open%20in-StackBiltz-blue?logo=StackBlitz)](https://stackblitz.com/edit/stackblitz-starters-qphr7j?file=src%2FApp.tsx)



```jsx mdx:preview
import React, {useState} from 'react'
import {Pane, ResizablePanes} from 'resizable-panes-react'

import React, {Ref, useRef, useState} from 'react'
import {Pane, ResizablePanes, IResizableApi} from 'resizable-panes-react'

interface IIDMap{
    [id: string]: boolean
}

export const HideShowPanes = () => {
   const [visibilityMap, setVisibilityMap] = useState<IIDMap>({
    pane1: false,
    pane2: true,
    pane3: true,
    pane4: false
  })

  const updateVisibilityMap = (e: any) => {
    const {name, checked} = e.currentTarget
    const newVisibilityMap = {
      ...visibilityMap,
      [name]: checked
    }
    setVisibilityMap(newVisibilityMap)
  }

  return (
    <div>
      <ResizablePanes
        className='h-300'
        resizer={
          <Your Custom Resizer />
          }
        resizerSize={resizer Size}
        unit="ratio"
        vertical

        visibility={visibilityMap}

        onChangeVisibility={(e:any) => {
          console.log('onChangeVisibility', e)
        }}

        onResizeStop={(e:any) => {
          console.log('onResizeStop', e)
        }}
      >
        <Pane className='pane1' id='pane1' minSize={5} size={20}>
        ...Your Element...
        </Pane>

        <Pane className='pane2' id='pane2' minSize={5} size={10}>
        ...Your Element...
        </Pane>

        <Pane className='pane1' id='pane3' minSize={10} size={20}>
        </Pane>

        <Pane className='pane2' id='pane4' minSize={5} size={20}>
        ...Your Element...
        </Pane>
      </ResizablePanes>

      <div className='m-20-0'>
        {Object
          .keys(visibilityMap)
          .map((id) => (

            <label key={id}>
              <input
                checked={visibilityMap[id]}
                name={id}
                type="checkbox"
                onChange={updateVisibilityMap}
              />
              {id}
            </label>

          ))}

        <button onClick={setVisibility} >Submit</button>
      </div>
    </div>
  )
}

```