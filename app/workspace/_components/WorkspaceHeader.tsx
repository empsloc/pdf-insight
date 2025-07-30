import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader({fileName}:any) {
  
  return (
    <div className='p-4 flex justify-between shadow-md items-center'>
        <Image src="/logo.svg" width={140} height={100} alt='logo'/>
        <h2 className='font-bold '>{fileName} </h2>
        <div className='flex gap-2 items-center'><UserButton/></div>
        
    </div>
  )
}

export default WorkspaceHeader