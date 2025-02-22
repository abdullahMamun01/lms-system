import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full">
        <Sidebar/>
        <div className='w-full'>
            {children}
        </div>
    </div>
  )
}
