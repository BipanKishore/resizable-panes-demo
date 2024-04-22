import React from 'react'
import {Tab} from './tab'
import './style.css'
import {ROUTER_LIST_LEVEL_1} from '../../shared/constant'

interface ITabsProps {
}

export const Tabs = (props: ITabsProps) => {

  return (
    <div id='side-menu' className="tab-container  hidden md:block z-40">
      {
        ROUTER_LIST_LEVEL_1.map(
          (item) => <Tab key={item.path} {...item} />
        )
      }
    </div>
  )
}
