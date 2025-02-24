import React from 'react'
import { MobileSidebarMenu } from './MobileSidebarMenu'

export default function Header() {
  return (
    <header className='md:hidden  bg-white w-full border  py-2'>
       <div className='ml-8 my-4'>
       <MobileSidebarMenu/>
       </div>
    </header>
  )
}
