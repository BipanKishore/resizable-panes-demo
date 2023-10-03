[![Open in StackBiltz](https://img.shields.io/badge/Open%20in-StackBiltz-blue?logo=StackBlitz)](https://stackblitz.com/edit/stackblitz-starters-qphr7j?file=src%2FApp.tsx)



```jsx mdx:preview
import React, {Ref, useRef, useState} from 'react'
import {Panes, ResizablePanes, IResizableApi} from 'resizable-panes-react'

import React, {Ref, useRef, useState} from 'react'
import {Pane, ResizablePanes, IResizableApi} from 'resizable-panes-react'

interface IIDMap{
    [id: string]: boolean
}

export const HideShowPanes = () => {
  const ref: Ref<any> = useRef({})

  const [visibilityMap, setVisibilityMap] = useState<IIDMap>({
    pane1: true,
    pane2: true,
    pane3: true,
    pane4: true
  })

  const onReady = (api: IResizableApi) => {
    ref.current.api = api
  }
  const updateVisibilityMap = (e: any) => {
    const {name, checked} = e.currentTarget
    const newVisibilityMap = {
      ...visibilityMap,
      [name]: checked
    }
    setVisibilityMap(newVisibilityMap)
  }

  const setVisibility = () => {
    ref.current.api.setVisibility(visibilityMap)
  }

  return (
    <div>
      <ResizablePanes
        className='h-300'
        resizer={
          <Your Custom Resizer />
          }
        resizerSize={height or width depending up the split type of Panes }
        sessionStore
        storeKey="visibility-doc"
        unit="ratio"
        vertical

        onChangeVisibility={(e:any) => {
          console.log('onChangeVisibility', e)
        }}

        onReady={onReady}

        onResizeStop={(e:any) => {
          console.log('onResizeStop', e)
        }}
      >
        <Pane className='pane1' id='pane1' minSize={5} size={20}>
        </Pane>

        <Pane className='pane2' id='pane2' maxSize={15} minSize={5} size={10}>
        </Pane>

        <Pane className='pane1' id='pane3' maxSize={20} minSize={10} size={20}>
        </Pane>

        <Pane className='pane2' id='pane4' maxSize={25} minSize={5} size={20}>
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