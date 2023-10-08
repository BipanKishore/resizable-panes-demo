import React from 'react'
import {ICONS_MAP} from './icon-list'

interface IIcon{
    name: string,
    className?: string
    onClick?: any
}

export const Icon = (props: IIcon) => {
  const {name, ...otherProps} = props
  return (

    <span>
      <img
        height="auto"
        key='expand'
        src={ICONS_MAP[name]}
        width={20}
        {...otherProps}
      />
    </span>

  )
}

Icon.defaultProps = {
  className: 'm-2px-8px'
}
