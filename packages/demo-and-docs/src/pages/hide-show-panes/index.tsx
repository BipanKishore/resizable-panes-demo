import React, {Ref, useCallback, useRef, useState, SyntheticEvent} from 'react'
import {Panes, ResizablePanes, IResizableApi} from 'react-resizable-panes'

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

  const onReady = useCallback((api: IResizableApi) => {
    ref.current.api = api
  }, [])

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

        <Panes className={'pane1'} id={'pane4'} size={200}>
        </Panes>
      </ResizablePanes>
    </div>
  )
}
