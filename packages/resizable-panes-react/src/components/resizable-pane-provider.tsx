import React, {useEffect, useState} from 'react'
import {ResizablePaneContext, getResizableContext} from '../context/resizable-panes-context'
import {ResizablePanes} from './resizable-panes'
import {noop} from '../utils/util'
import {useResizableApi} from '../hook/use-resizable-api'

export const ResizablePaneProvider = (props: any) => {
  const [context] = useState(getResizableContext(props))

  useResizableApi(context, props)

  useEffect(() => {
    console.log('v-- contextDetails', context.contextDetails)
  }, [context])

  return (
    <ResizablePaneContext.Provider value={context} >
      <ResizablePanes {...props}/>
    </ResizablePaneContext.Provider>
  )
}

ResizablePaneProvider.defaultProps = {
  onResize: noop,
  onResizeStop: noop,
  onResizeStart: noop,
  onReady: noop,
  onChangeVisibility: noop
}
