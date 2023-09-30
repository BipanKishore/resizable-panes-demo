import React, {useState} from 'react'
import {Tabs, Router} from '../components'
import Header from '../components/header'
import Footer from '../components/footer'
export const PanesDashboard = () => {
  const [path, setPath] = useState<any>('apiDocs')

  const onClickTabs = (path: any) => {
    setPath(path)
  }

  return (
    <>
      <Header/>
      <div className="display-flex">
        <Tabs onClick={onClickTabs} />
        <div className="router w-100p">
          <Router path={path} />
        </div>
      </div>
      <Footer />
    </>
  )
}
