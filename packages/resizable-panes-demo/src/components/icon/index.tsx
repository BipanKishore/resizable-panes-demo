import React from 'react'
import {ICONS_MAP} from './icon-list'
import Link from 'next/link'

interface IIcon{
    name: string,
    url: string,
    className?: string
    onClick?: any
}

export const Icon = (props: IIcon) => {
  const {name, url, ...otherProps} = props
  return (

    <Link href={url}> 
    <span>
      <img
        height="20px"
        key='expand'
        src={ICONS_MAP[name]}
        width={'20px'}
        {...otherProps}
      />
    </span>
    </Link>

  )
}

Icon.defaultProps = {
  className: 'm-2px-8px'
}
