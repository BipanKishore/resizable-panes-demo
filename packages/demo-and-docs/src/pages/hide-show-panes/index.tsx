import React, {Ref, useRef, useState} from 'react'
import {Pane, ResizablePanes, IResizableApi} from 'resizable-panes-react'
import HIDE_SHOW_PANES_MD from './hide-show-panes.md'
import MarkdownPreview from '@uiw/react-markdown-preview'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

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
    ref.current.api.setVisibility(newVisibilityMap)
  }

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Show and hide panes</h3>
        <h6>Note: Hide and show Panes only through the api!</h6>
      </div>
      <div className='m-20-0'>
        You can toggle the visibility of a pane using the ResizablePanes API.
        This action hides or shows the pane without removing the element from the view.
      </div>

      <div className='m-20-0'>
        <strong>Note: </strong> In case you are using your own custom resizer
        provide the <code>resizerSize</code> prop to <code>ResizablePanes</code> Component
        or  <code>Pane</code>  Component
      </div>

      <ResizablePanes
        className='h-300'
        resizer={
          <CustomResizerFirst />
          }
        resizerSize={12}
        sessionStore
        storeKey="visibility-doc"
        unit="ratio"
        vertical

        // visibility={visibilityMap}

        onChangeVisibility={(e:any) => {
          // console.log('onChangeVisibility', e)
        }}

        onReady={onReady}

        onResizeStop={(e:any) => {
          // console.log('onResizeStop', e)
        }}
      >
        <Pane className='pane1' id='pane1' minSize={5} size={20}>
        </Pane>

        <Pane
          className='pane2'
          id='pane2'
          // maxSize={15}
          minSize={5}
          // show={false}
          size={10}
        >
        </Pane>

        <Pane
          className='pane1' id='pane3'
          // maxSize={20}
          minSize={10} size={20}
        >
        </Pane>

        <Pane
          className='pane2' id='pane4'
          // maxSize={25}
          minSize={5} size={20}
        >
        </Pane>
      </ResizablePanes>

      <p>
        Use the checkbox to set the visibility of panes
      </p>
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

      </div>

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={HIDE_SHOW_PANES_MD} />
      </div>
    </div>
  )
}
