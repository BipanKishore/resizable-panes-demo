import React from 'react'
import stackbiltz from '../../../assets/icons/stackbiltz.svg'

interface IStackBiltzLinkProps {
    link: string,
    label: string
}

export const StackBiltzLink = (props: IStackBiltzLinkProps) => {
  const {label, link} = props
  return (
    <div>
      <img
        className='m-2px-8px'
        height="auto"
        key='expand'
        src={stackbiltz}
        width={20}
      />
      {label}
    </div>
  )
}
