"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Dashboard from '../page'
import { Layout, Shield } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import UploadPDFDialog from './UploadPDFDialog'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function Sidebar() {
    const { user } = useUser();
    const path = usePathname()
    const fileList = useQuery(api.fileStorage.GetUserFiles, {
      userEmail: user?.primaryEmailAddress?.emailAddress!,
    });
  return (
    <div className='p-7 shadow-md h-screen'>
        <Link href="/" className="cursor-pointer">
        <Image src="/logo.svg" width={120} height={120} alt="logo" />
      </Link>
        <div className='mt-10 flex flex-col gap-2'>
            
            <UploadPDFDialog isMaxFile={fileList&&fileList?.length>=5?true:false}><Button className='w-full'>+ Upload PDF</Button></UploadPDFDialog>
            <Link href={"/dashboard"}><div className={`${path=='/dashboard'&&'bg-slate-300'} flex gap-2 items-center p-3 mt-5 hover:bg-slate-200 rounded-lg cursor-pointer`}>
                <Layout/>
                <h2>Workspace</h2>
            </div>
            </Link>
            <Link href={"/dashboard/upgrade"}> <div className={`${path=='/dashboard/upgrade'&&'bg-slate-300'} flex gap-2 items-center p-3  hover:bg-slate-200 rounded-lg cursor-pointer`}>
                <Shield/>
                <h2>Upgrade</h2>
            </div>
            </Link>
        </div>
        <div className='absolute bottom-24 w-[85%]'>
            <Progress value={fileList&&((fileList?.length/5)*100)}/>
            <p className='text-sm mt-1'>{fileList&&fileList?.length} out of 5 pdf uploaded</p>
            <p className='text-sm text-gray-400 mt-2'>Upgrade to upload more pdfs</p>

        </div>
    </div>
  )
}

export default Sidebar