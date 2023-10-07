import React, {useState} from 'react'
import {Pane, ResizablePanes} from 'resizable-panes-react'
import HIDE_SHOW_PANES_MD from './hide-show-panes.md'
import MarkdownPreview from '@uiw/react-markdown-preview'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

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
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Show and hide panes</h3>
      </div>
      <div className='m-20-0'>
        You can toggle the visibility of a pane using the visibility prop of <code>ResizablePanes</code>.
        It is a object that uses the id of <code>Pane</code> component to set the visibility of Panes.
        This action hides or shows the pane without removing the element from the view.
      </div>

      <div className='m-20-0'>
        <strong>Note: </strong> In case you are using your own custom resizer
        provide the <code>resizerSize</code> prop to <code>ResizablePanes</code> component
        or  <code>Pane</code> component. It is only required when you when you want to
        display or hide the <code>Pane</code> components.
      </div>

      <div className=' w-100p h-300'>
        <ResizablePanes
          resizer={
            <CustomResizerFirst />
          }
          resizerSize={12}
          // sessionStore
          // storeKey="visibility-doc"
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

          </Pane>

          <Pane
            className='pane2'
            id='pane2'
          // maxSize={15}
            minSize={5}
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
      </div>

      <div className='m-10-0 display-flex flex-column '>
        <div className='m-10-0 display-flex justify-context'>

          <strong>   Use the checkbox to set the visibility of panes</strong>

        </div>

        <div className=' display-flex justify-context'>
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

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={HIDE_SHOW_PANES_MD} />
      </div>
    </div>
  )
}
