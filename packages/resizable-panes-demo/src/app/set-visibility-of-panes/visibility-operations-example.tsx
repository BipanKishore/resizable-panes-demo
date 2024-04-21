"use client"
import React, {useState} from 'react'
import {Pane, ResizablePanes} from 'resizable-panes-react'

interface IIDMap{
    [id: string]: boolean
}

 const VisibilityOperationsExample = () => {

  const [visibilityMap, setVisibilityMap] = useState<IIDMap>({
    
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

          onResizeStop={(e:any) => {
            // console.log('onResizeStop', e)
          }}
        >
      
      <Pane
            className='pane1'
            id='pane1'
            // maxSize={22}
            minSize={5}
            size={20}
          >

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
            minSize={10}
            size={20}
          >
          </Pane>

          <Pane
            className='pane2' id='pane4'
          // maxSize={25}
            minSize={5}
            size={20}
          >
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

export default VisibilityOperationsExample