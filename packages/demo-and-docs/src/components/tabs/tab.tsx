import React from 'react'

export interface ITabProps {
    active: boolean,
    label: string,
    onClick?: any,
    component?: any,
    path: string
}

export const Tab = (props: ITabProps) => {
  const {active, label, onClick, path} = props
  let className
  if (active) {
    className = 'tab tab-active radious-5'
  } else {
    className = 'tab radious-5 nonactive-tab'
  }
  // const className = active ? 'radious-5 tab tab-active' : 'radious-5 tab'

  return (
    <div
      className={className}
      onClick={() => onClick(path)}
    >
      {label}
    </div>
  )
}
