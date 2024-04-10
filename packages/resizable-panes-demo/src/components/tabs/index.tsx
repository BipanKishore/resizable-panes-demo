import React, {useEffect, useState} from 'react'
import {ITabProps, Tab} from './tab'
import './style.css'
import {GETTING_STARTED_PATH, ROUTER_LIST_LEVEL_1} from '../../shared/constant'

interface ITabsProps {
  onClick: (clickedLabel: string) => void
}

export const Tabs = (props: ITabsProps) => {

  return (
    <div className="tab-container">
      {
        ROUTER_LIST_LEVEL_1.map(
          (item) => <Tab key={item.path} {...item} />
        )
      }
    </div>
  )
}
