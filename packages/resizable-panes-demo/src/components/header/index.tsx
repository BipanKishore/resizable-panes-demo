import React from 'react'
import { Links } from './links'
const Header = () => {
  return (
    <div className='header bg-gray-100 leading-9 p-1.5 mt-5 mb-10 grid md:grid-cols-3 rounded-xl'>
      <div></div>
      <h2 className='m0 text-center'>Resizable Panes React</h2>
      <Links />

    </div>
  )
}

export default Header
