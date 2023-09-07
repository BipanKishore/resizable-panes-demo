import React, {useState} from 'react'
import {Tabs, Router} from '../components'
export const PanesDashboard = () => {
  const [path, setPath] = useState<any>('apiDocs')

  const onClickTabs = (path: any) => {
    setPath(path)
  }

  return (
    <div className="display-flex">
      <Tabs onClick={onClickTabs} />
      <div>
        <Router path={path} />
      </div>
    </div>
  )
}
// http://localhost:8080
// Installing shortcut: "C:\\Users\\WINDOW 10\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\SnoreToast\\0.7.0\\SnoreToast.lnk" "C:\\User
// s\\WINDOW 10\\Documents\\Projects\\react-resizable-panes-demo\\node_modules\\webpack-notifier\\node_modules\\node-notifier\\vendor\\snoreToast\\snor
// etoast-x64.exe" Snore.DesktopToasts.0.7.0
