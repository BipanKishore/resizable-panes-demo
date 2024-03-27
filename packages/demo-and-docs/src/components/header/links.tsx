import React from 'react'
import {GITHUB_URL, LINKEDIN, NPM_URL} from './constant'
import {Icon} from '../icon'

export const Links = () => {
  return (
    <div className='social-icon-top'>
      <a href={NPM_URL} ><Icon name='npm' /></a>
      <a href={GITHUB_URL} ><Icon name='github' /></a>
      <a href={LINKEDIN} ><Icon name='linkedin' /></a>
    </div>
  )
}
