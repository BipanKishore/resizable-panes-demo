import React, {useEffect, useState} from 'react'
import {ITabProps, Tab} from './tab'
import './style.css'
import {ROUTER_LIST_LEVEL_1} from '../../shared/constant'

interface ITabsProps {
  onClick: (clickedLabel: string) => void
}

export const Tabs = (props: ITabsProps) => {
  const {onClick} = props
  const [tabList, setTabList] = useState<ITabProps[]>(ROUTER_LIST_LEVEL_1)

  const onClickTab = (path: string) => {
    console.log(path)
    const newTabList = tabList.map((item) => {
      if (item.path === path) {
        return {...item, active: true}
      }
      return {...item, active: false}
    })
    setTabList(newTabList)
    onClick(path)
  }

  useEffect(() => {
    onClick(ROUTER_LIST_LEVEL_1[0].path)
  }, [])

  return (
    <div className="tab-container">
      {
        tabList.map(
          (item) => <Tab {...item} onClick={onClickTab} />
        )
      }
    </div>
  )
}
