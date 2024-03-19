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
    pane1: true,
    pane2: true,
    pane3: true,
    pane4: true
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
      <div className=' w-100p h-300'>
        <ResizablePanes
          resizer={
            <CustomResizerFirst size={12} />
          }
          resizerSize={12}
          storageApi={sessionStorage}
          uniqueId="visibility-doc-1"
          unit="ratio"
          vertical
          visibility={visibilityMap}
          onChangeVisibility={(e:any) => {
            setVisibilityMap(e)
          }}
          onReady={(api: any) => {
            const map = api.getMap('visibility')
            setVisibilityMap(map)
          }}
        >
          <Pane className='pane1' id='pane1' minSize={5} size={20}>
          </Pane>

          <Pane className='pane2' id='pane2' minSize={5} size={10}>
          </Pane>

          <Pane className='pane1' id='pane3' minSize={10} size={20}>
          </Pane>

          <Pane className='pane2' id='pane4' minSize={5} size={20}>
          </Pane>
        </ResizablePanes>
      </div>

      <div className='m-10-0 d-flex flex-column '>
        <div className='m-10-0 d-flex justify-context'>
          <strong>Use the checkbox to set the visibility of panes</strong>
        </div>

        <div className=' d-flex justify-context'>
          {Object
            .keys(visibilityMap)
            .map((id) => (

              <label className='m-r-10' htmlFor={id} key={id}>
                <input
                  checked={visibilityMap[id]}
                  id={id}
                  name={id}
                  type="checkbox"
                  onChange={updateVisibilityMap}
                />
                <span className='m-l-5' >
                  {id}
                </span>

              </label>

            ))}
        </div>
      </div>
    </div>
  )
}


```
