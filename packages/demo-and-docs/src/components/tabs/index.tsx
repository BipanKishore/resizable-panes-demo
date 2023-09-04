import React, { useState } from "react";
import { ITabProps, Tab } from "./tab";
import './style.css'

export const Tabs = () => {


    const [tabList, setTabList] = useState<ITabProps[]> ([
        {
            text: 'Tab 1',
            active: true
        },
        {
            text: 'Tab 2',
            active: false
        },
        {
            text: 'Tab 33',
            active: false
        },
        {
            text: 'Tab 2444',
            active: false
        }
    ])

    const onClickTab = (text: string) => {
        const index = tabList.findIndex((item) => {
                return  item.text === text
            })

            tabList.forEach((item) => {
                item.active = false
            })

        const newTabList = [...tabList]
        newTabList[index].active = true
        setTabList(newTabList)
    }

    return  (
       <div>
         {
            tabList.map((item) => <Tab onClick={onClickTab}  active={item.active} text={item.text} />)
        }
       </div>
    )
}