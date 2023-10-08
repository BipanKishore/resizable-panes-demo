import React from 'react'
import {GITHUB_URL, LINKEDIN, NPM_URL} from './constant'
import {Icon} from '../icon'

const navigate = (url: string) => {
  window.open(url, '_self')
}

export const Links = () => {
  return (
    <div className='social-icon-top'>
      <Icon name='npm' onClick={() => navigate(NPM_URL)} />
      <Icon name='github' onClick={() => navigate(GITHUB_URL)} />
      <Icon name='linked' onClick={() => navigate(LINKEDIN)} />
    </div>

  )
}
