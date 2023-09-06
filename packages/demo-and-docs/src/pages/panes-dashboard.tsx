import React, {useState} from 'react'
import {Tabs, Router} from '../components'

export const PanesDashboard = () => {
  const [path, setPath] = useState<any>('apiDocs')

  const onClickTabs = (path: any) => {
    setPath(path)
  }

  return (
    <div>
      <Tabs onClick={onClickTabs} />
      <div>
        <Router path={path} />
      </div>
    </div>
  )
}
