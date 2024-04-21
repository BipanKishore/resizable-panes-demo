"use client"
import React, {useState} from 'react'
import {Pane, ResizablePanes} from 'resizable-panes-react'
import {CheckBox} from '../../components/checkbox'
import {
  MAIN_PANES_INITIAL_VALUE,
  PANE1_IDS, PANE1_INITIAL_VALUE, PANE3_IDS,
  PANE3_INITIAL_VALUE, PANES_LIST, PANES_LIST_PANE1, PANES_LIST_PANE3, updateVisibilityMap
} from './util'
import { EVEN_PANE_CLASS, ODD_PANE_CLASS } from '@/shared/constant'

interface IIDMap{
    [id: string]: boolean
}

const PanesDemo = () => {
  const [visibilityMapMain, setVisibilityMapMain] = useState<IIDMap>(MAIN_PANES_INITIAL_VALUE)
  const [visibilityMapPane1, setVisibilityMapPane1] = useState<IIDMap>(PANE1_INITIAL_VALUE)
  const [visibilityMapPane3, setVisibilityMapPane3] = useState<IIDMap>(PANE3_INITIAL_VALUE)

  const updateVisibilityMapMain = updateVisibilityMap(setVisibilityMapMain)
  const updateVisibilityMapPane1 = updateVisibilityMap(setVisibilityMapPane1)
  const updateVisibilityMapPane3 = updateVisibilityMap(setVisibilityMapPane3)

  return (
    <div>
      <div className=' w-100p h-500'>
        <ResizablePanes
          storageApi={localStorage}
          uniqueId="visibility-doc"
          unit="ratio"
          vertical

          visibility={visibilityMapMain}

          onChangeVisibility={(e:any) => {
            setVisibilityMapMain(e)
          }}

          onReady={(api: any) => {
            const map = api.getMap('visibility')
            setVisibilityMapMain(map)
          }}

          onResizeStop={(e:any) => {
            // console.log('onResizeStop', e)
          }}
        >
          <Pane
         className={ODD_PANE_CLASS} id='P0'
            // maxSize={22}
            minSize={18}
            size={25}
          >

            <ResizablePanes
              uniqueId="visibility-doc2"
              unit="ratio"
              visibility={visibilityMapPane1}
            >
            <Pane className={ODD_PANE_CLASS} id='P0-P0' minSize={1} size={2}></Pane>
            <Pane className={EVEN_PANE_CLASS} id='P0-P1' minSize={1} size={4}> </Pane>
            </ResizablePanes>

          </Pane>

          <Pane
         className={EVEN_PANE_CLASS} id='P1'
            // maxSize={15}
            minSize={5}
            size={50}
          >
          </Pane>

          <Pane
         className={ODD_PANE_CLASS} id='P2'
            // maxSize={20}
            minSize={10}
            size={25}
          >
            <ResizablePanes
              uniqueId="visibility-doc3"
              unit="ratio"
              visibility={visibilityMapPane3}
            >
              <Pane className={ODD_PANE_CLASS} id='P2-P0' minSize={1} size={2}></Pane>
              <Pane className={EVEN_PANE_CLASS} id='P2-P1' minSize={1} size={4}> </Pane>
            </ResizablePanes>
          </Pane>

        </ResizablePanes>
      </div>

      <div className='m-10-0 d-flex flex-column '>
        <div className='m-10-0 d-flex justify-context'>
          <strong>Use the checkbox to set the visibility of panes</strong>
        </div>
        <div className='w-50p m-auto t-aligin-center' >
          <h5>Main panes</h5>
        </div>

        <div className='d-grid columns-1-1-1-frs w-50p m-auto' >
          {PANES_LIST.map(({id, label}) => (
            <div key={id}>
              <CheckBox
                checked={visibilityMapMain[id]}
                id={id}
                label={label}
                onChange={updateVisibilityMapMain}
              />
            </div>
          ))}

        </div>
        <div className='w-50p m-auto t-aligin-center' >
          <h5>Children panes</h5>
        </div>
        <div className='d-grid columns-1-1-1-frs w-50p m-auto'>
          <div>
            {PANES_LIST_PANE1.map(({id, label}) => (
              <div key={id}>
                <CheckBox
                  checked={visibilityMapPane1[id]}
                  id={id}
                  label={label}
                  onChange={updateVisibilityMapPane1}
                />
              </div>
            ))}
          </div>

          <div></div>

          <div>
            {PANES_LIST_PANE3.map(({id, label}) => (
              <div key={id}>
                <CheckBox
                  checked={visibilityMapPane3[id]}
                  id={id}
                  label={label}
                  onChange={updateVisibilityMapPane3}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
export default PanesDemo