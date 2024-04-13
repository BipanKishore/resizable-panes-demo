import React, {useState} from 'react'
import {Pane, ResizablePanes} from 'resizable-panes-react'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'
import {CheckBox} from '../../components/checkbox'
import {
  MAIN_PANES_INITIAL_VALUE,
  PANE1_IDS, PANE1_INITIAL_VALUE, PANE3_IDS,
  PANE3_INITIAL_VALUE, PANES_LIST, PANES_LIST_PANE1, PANES_LIST_PANE3, updateVisibilityMap
} from './util'

interface IIDMap{
    [id: string]: boolean
}

export const DemoPanes = () => {
  const [visibilityMapMain, setVisibilityMapMain] = useState<IIDMap>(MAIN_PANES_INITIAL_VALUE)
  const [visibilityMapPane1, setVisibilityMapPane1] = useState<IIDMap>(PANE1_INITIAL_VALUE)
  const [visibilityMapPane3, setVisibilityMapPane3] = useState<IIDMap>(PANE3_INITIAL_VALUE)

  const updateVisibilityMapMain = updateVisibilityMap(setVisibilityMapMain)
  const updateVisibilityMapPane1 = updateVisibilityMap(setVisibilityMapPane1)
  const updateVisibilityMapPane3 = updateVisibilityMap(setVisibilityMapPane3)

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Demo</h3>
      </div>

      <div className='m-20-0'>
        <p>
          This library is highly customizable and can be used in various applications
          where flexible layout management is required.
        </p>
      </div>

      <div className="m-20-0">
        <strong>Note: </strong> Only main ResizablePanes is storing data in Session Storage.
      </div>

      <div className=' w-100p h-500'>
        <ResizablePanes
          resizer={
            <CustomResizerFirst size={10} />
          }
          resizerSize={10}
          storageApi={sessionStorage}
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
            className='pane1'
            id='pane1'
            // maxSize={22}
            minSize={18}
            size={25}
          >

            <ResizablePanes
              resizer={<CustomResizerFirst horizontal size={10} />}
              resizerSize={10}
              uniqueId="visibility-doc2"
              unit="ratio"
              visibility={visibilityMapPane1}
            >
              <Pane className='pane1' id={PANE1_IDS.pane1} minSize={17} size={34}></Pane>
              <Pane className='pane2' id={PANE1_IDS.pane2} minSize={17} size={66}> </Pane>
            </ResizablePanes>

          </Pane>

          <Pane
            className='pane2'
            id='pane2'
            // maxSize={15}
            minSize={5}
            size={50}
          >
          </Pane>

          <Pane
            className='pane1' id='pane3'
            // maxSize={20}
            minSize={10}
            size={25}
          >
            <ResizablePanes
              resizer={<CustomResizerFirst horizontal size={10} />}
              resizerSize={10}
              uniqueId="visibility-doc3"
              unit="ratio"
              visibility={visibilityMapPane3}
            >
              <Pane className='pane1' id={PANE3_IDS.pane1} minSize={17} size={34}></Pane>
              <Pane className='pane2' id={PANE3_IDS.pane2} minSize={17} size={66}> </Pane>
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
