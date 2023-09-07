import React, {useState} from 'react'
import {ITabProps, Tab} from './tab'
import './style.css'
import {PANES_TABS_LIST} from '../../shared/constant'

interface ITabsProps {
  onClick: (clickedLabel: string) => void
}

export const Tabs = (props: ITabsProps) => {
  const {onClick} = props
  const [tabList, setTabList] = useState<ITabProps[]>(PANES_TABS_LIST)

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
