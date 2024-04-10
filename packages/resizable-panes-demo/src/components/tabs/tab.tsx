import React from 'react'
import { joinClassName } from '../../shared/utils'
import Link from 'next/link'

export interface ITabProps {
  active?: boolean,
  label: string,
  onClick?: any,
  component?: any,
  path: string
}

export const Tab = (props: ITabProps) => {
  const { active, label, path } = props

  const className = joinClassName({
    'tab radius-15': true,
    'tab-active': active,
    'nonactive-tab': !active
  })

  return (
    <Link href={path}>
      <div
        className={className}
      >
        {label}
      </div>
    </Link >
  )
}
