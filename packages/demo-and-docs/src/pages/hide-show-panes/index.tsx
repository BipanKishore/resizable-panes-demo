import React, {Ref, useCallback, useRef, useState} from 'react'
import {Panes, ResizablePanes, IResizableApi} from 'react-resizable-panes'

interface IIDMap{
    [id: string]: boolean
}

export const HideShowPanes = () => {
  const ref: Ref<any> = useRef({})

  const [visibilityMap, setVisibilityMap] = useState<IIDMap>({
    pane1: true,
    pane2: true,
    pane3: true
  })

  const onReady = useCallback((api: IResizableApi) => {
    ref.current.api = api
  }, [])

  const updateVisibilityMap = (id: string) => {
    const newVisibilityMap = {
      ...visibilityMap,
      [id]: !visibilityMap[id]
    }
    setVisibilityMap(newVisibilityMap)
    ref.current.api.setVisibility(newVisibilityMap)
  }

  return (
    <div>

      {Object
        .keys(visibilityMap)
        .map((id, index) => (
          <button
            onClick={() => updateVisibilityMap(id)}
          >
            {visibilityMap[id] ? 'Hide' : 'Show'} pane {index}
          </button>
        ))}

      <ResizablePanes
        className='h-300' split='vertical' onChangeVisibility={(e:any) => {
          console.log(e)
        }}

        onReady={onReady}
      >
        <Panes className={'pane1'} id={'pane1'} size={350}>
        </Panes>

        <Panes className={'pane2'} id={'pane2'} size={300}>
        </Panes>

        <Panes className={'pane3'} id={'pane3'} size={200}>
        </Panes>
      </ResizablePanes>
    </div>
  )
}
