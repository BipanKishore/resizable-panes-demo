"use client"
import React from 'react'
import { joinClassName } from '../../shared/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export interface ITabProps {
  label: string,
  onClick?: any,
  component?: any,
  path: string
}

export const Tab = (props: ITabProps) => {
  const { label, path } = props
  
const currentPath = usePathname();

const active = currentPath === `/${path}` || currentPath === path

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
