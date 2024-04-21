import React from 'react'
import {GITHUB_URL, LINKEDIN, NPM_URL} from './constant'
import {Icon} from '../icon'

export const Links = () => {
  return (
    <div className='inline-flex md:justify-self-end justify-self-center self-center mr-2'>
      <Icon name='npm' url={NPM_URL}  />
      <Icon name='github' url={GITHUB_URL}  />
      <Icon name='linkedin' url={LINKEDIN}  />
    </div>
  )
}
