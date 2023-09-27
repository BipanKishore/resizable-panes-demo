import React, {useEffect, useState} from 'react'
import {ITabProps, Tab} from './tab'
import './style.css'
import {GETTING_STARTED_PATH, ROUTER_LIST_LEVEL_1} from '../../shared/constant'

interface ITabsProps {
  onClick: (clickedLabel: string) => void
}

export const Tabs = (props: ITabsProps) => {
  const {onClick} = props
  const [tabList, setTabList] = useState<ITabProps[]>(ROUTER_LIST_LEVEL_1)

  const onClickTab = (path: string) => {
    const newTabList = tabList.map((item) => {
      if (item.path === path) {
        return {...item, active: true}
      }
      return {...item, active: false}
    })
    setTabList(newTabList)
    localStorage.setItem('path', path)
    onClick(path)
  }

  useEffect(() => {
    const path = localStorage.getItem('path') || GETTING_STARTED_PATH
    onClickTab(path)
  }, [])

  return (
    <div className="tab-container">
      {
        tabList.map(
          (item) => <Tab key={item.path} {...item} onClick={onClickTab} />
        )
      }
    </div>
  )
}
