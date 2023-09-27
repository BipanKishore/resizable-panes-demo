import React, {Ref, useRef, useState} from 'react'
import {Panes, ResizablePanes, IResizableApi} from 'resizable-panes-react'
import HIDE_SHOW_PANES_MD from './hide-show-panes.md'
import MarkdownPreview from '@uiw/react-markdown-preview'

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
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Show and hide panes</h3>
        <h6>Note: Experimental features!</h6>
      </div>
      <div className='m-20-0'>
        You can toggle the visibility of a pane using the ResizablePanes API.
        This action hides or shows the pane without removing the element from the view.
      </div>

      <ResizablePanes
        className='h-300'
        vertical
        onChangeVisibility={(e:any) => {
          console.log('onChangeVisibility', e)
        }}
        onReady={onReady}
      >
        <Panes className={'pane1'} id={'pane1'} minSize={50} size={200}>
        </Panes>

        <Panes className={'pane2'} id={'pane2'} maxSize={150} minSize={50} size={100}>
        </Panes>

        <Panes className={'pane3'} id={'pane3'} maxSize={200} minSize={100} size={200}>
        </Panes>

        <Panes className={'pane1'} id={'pane4'} maxSize={250} minSize={50} size={200}>
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

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={HIDE_SHOW_PANES_MD} />
      </div>
    </div>
  )
}
