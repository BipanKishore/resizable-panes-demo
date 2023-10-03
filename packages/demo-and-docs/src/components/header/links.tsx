import React from 'react'
import linkedinSvg from '../../../assets/icons/linkedin-color.svg'
import npmSvg from '../../../assets/icons/npm-color.svg'
import githubSvg from '../../../assets/icons/github-color.svg'
import {GITHUB_URL, LINKEDIN, NPM_URL} from './constant'

const navigate = (url: string) => {
  window.open(url, '_self')
}

export const Links = () => {
  return (

    <div className='social-icon-top'>
      <span>
        <img
          className='m-2px-8px'
          height="auto"
          key='expand'
          src={npmSvg}
          width={20}
          onClick={() => navigate(NPM_URL)}
        />
      </span>
      <span>
        <img
          className='m-2px-8px'
          height="auto"
          key='expand'
          src={githubSvg}
          width={20}
          onClick={() => navigate(GITHUB_URL)}
        />
      </span>
      <span>
        <img
          className='m-2px-8px'
          height="auto"
          key='expand'
          src={linkedinSvg}
          width={20}
          onClick={() => navigate(LINKEDIN)}
        />
      </span>
    </div>

  )
}
