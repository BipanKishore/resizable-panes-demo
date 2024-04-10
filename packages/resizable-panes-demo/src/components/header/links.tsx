import React from 'react'
import {GITHUB_URL, LINKEDIN, NPM_URL} from './constant'
import {Icon} from '../icon'

export const Links = () => {
  return (
    <div className='social-icon-top flex'>
      <Icon name='npm' url={NPM_URL}  />
      <Icon name='github' url={GITHUB_URL}  />
      <Icon name='linkedin' url={LINKEDIN}  />
    </div>
  )
}
