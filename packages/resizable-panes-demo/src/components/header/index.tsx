"use client"
import React from 'react'
import { Links } from './links'
import bar from '../../../assets/icons/bar.svg'
import { toggleSideMenu } from '@/shared/utils'


const Header = () => {
  return (
    <div className='header bg-gray-100 leading-9 p-1.5 mt-5 mb-10  rounded-xl py-3 px-2.5 sticky top-0 z-40'>
      <div className='md:grid grid-cols-8 hidden'>
        <div />
        <h2 className='m0 text-center col-span-6 text-3xl'>Resizable Panes React</h2>
        <Links  className='md:inline-flex hidden mr-2' />
      </div>


      <div className='md:hidden grid grid-cols-9 '>
      <div className=' self-center ml-2.5'>
          <span className='' onClick={toggleSideMenu}>
            <img
              alt='Menu'
              height="20px"
              src={bar.src}
              width={'20px'}
            />
          </span>
        </div>
        <h2 className='m0 text-center col-span-6 text-2xl'>Resizable Panes React</h2>
        <Links  className='inline-flex col-span-2' />
      </div>
    </div>
  )
}

export default Header
