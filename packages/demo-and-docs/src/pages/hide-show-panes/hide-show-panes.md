[![Open in StackBiltz](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=StackBlitz)](https://codesandbox.io/embed/react-markdown-preview-co1mj?fontsize=14&hidenavigation=1&theme=dark)



```jsx mdx:preview
import React, {Ref, useRef, useState} from 'react'
import {Panes, ResizablePanes, IResizableApi} from 'resizable-panes-react'

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
        vertical onChangeVisibility={(e:any) => {
          console.log('onChangeVisibility', e)
        }}
        onReady={onReady}
      >
        <Panes id='pane1' minSize={50} size={200}>
        ...Your Element...
        </Panes>

        <Panes id='pane2' maxSize={150} minSize={50} size={100}>
        ...Your Element...
        </Panes>

        <Panes id='pane3' maxSize={200} minSize={100} size={200}>
        ...Your Element...
        </Panes>

        <Panes id='pane4' maxSize={250} minSize={50} size={200}>
        ...Your Element...
        </Panes>
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