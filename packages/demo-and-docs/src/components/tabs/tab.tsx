import React from 'react'
import {joinClassName} from '../../shared/utils'

export interface ITabProps {
  active?: boolean,
  label: string,
  onClick?: any,
  component?: any,
  path: string
}

export const Tab = (props: ITabProps) => {
  const {active, label, onClick, path} = props

  const className = joinClassName({
    'tab radius-15': true,
    'tab-active': active,
    'nonactive-tab': !active
  })

  return (

    <div
      className={className}
      onClick={() => onClick(path)}
    >
      {label}
    </div>
  )
}
