// import React from 'react'
// import Sidebar from './_components/Sidebar'
// import Header from './_components/Header'

// function DashboardLayout({children}:any) {
//   return (
//     <div className=''>
//         <div className='hidden md:block md:w-64 h-screen fixed'>
//             <Sidebar/>
//         </div>
//         <div className='md:ml-64'>
//             <Header/>
//             <div className='p-10'>
//         {children}
//         </div>
        

//         </div>
//         </div>
//   )
// }

// export default DashboardLayout
"use client"
import React, { useState } from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

function DashboardLayout({ children }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-64 h-screen fixed">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top bar (Mobile: Menu + Header) */} 
        <div className="flex items-center justify-between p-3 md:p-0 shadow-sm">
          {/* Mobile Sidebar (Drawer) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 z-[9999]">
              <VisuallyHidden>
                <SheetTitle>Sidebar</SheetTitle>
              </VisuallyHidden>
              <Sidebar />
            </SheetContent>
          </Sheet>

          {/* Header (Account button, etc.) */}
          <Header />
        </div>

        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;


