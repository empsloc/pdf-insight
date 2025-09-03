// "use client";
// import { api } from "@/convex/_generated/api";
// import { query } from "@/convex/_generated/server";
// import { useUser } from "@clerk/nextjs";
// import { useQuery } from "convex/react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// function Dashboard() {
//   const { user } = useUser();
//   const fileList = useQuery(api.fileStorage.GetUserFiles, {
//     userEmail: user?.primaryEmailAddress?.emailAddress!,
//   });
//   // console.log(fileList)
//   return (
//     <div>
//       <h2 className="font-medium text-3xl">Dashboard</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
//         {fileList&&fileList.length > 0
//             ? fileList?.map((file, index) => (
//               <Link key={index} href={'/workspace/'+file.fileId}>
//                 <div

//                   className="cursor-pointer hover:scale-105 transition-all flex p-5 shadow-md rounded-md flex-col items-center justify-center border"
//                 >
//                   <Image src={"/pdf.png"} width={70} height={70} alt="pdf" />
//                   <h2 className="mt-3 font-medium text-xl">{file?.fileName}</h2>
//                   <h2>{file?._creationTime}</h2>
//                 </div>
//                 </Link>
//               ))
//             : [1, 2, 3, 4, 5, 6].map((item: any, index: any) => (
//                 <div key={index} className="bg-slate-200 rounded-md h-[150px] animate-pulse"></div>
//               ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const { user } = useUser();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress!,
  });

  const [showInfoDialog, setShowInfoDialog] = useState(false);

  // 👇 Auto open dialog on first reload
  useEffect(() => {
    if (fileList?.length===0) {
      setShowInfoDialog(true);
    }
  }, [fileList]);

  return (
    <div>
      <h2 className="font-medium text-3xl">Dashboard</h2>

      {/* ---------- Info Dialog (How to Use) ---------- */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Your Dashboard 🎉</DialogTitle>
            <DialogDescription>Steps to get started:</DialogDescription>

            {/* ✅ Put list outside DialogDescription */}
            <div className="mt-3 text-sm text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Upload your PDFs from the <b>+ Upload PDF</b> button.
                </li>
                <li>
                  Open any PDF to access a <b>workspace</b> with a text editor
                  and PDF viewer.
                </li>
               
              </ul>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowInfoDialog(false)}>Got it!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---------- PDF List ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {fileList && fileList.length > 0
          ? fileList.map((file, index) => (
              <Link key={index} href={"/workspace/" + file.fileId}>
                <div className="cursor-pointer hover:scale-105 transition-all flex p-5 shadow-md rounded-md flex-col items-center justify-center border">
                  <Image src={"/pdf.png"} width={70} height={70} alt="pdf" />
                  <h2 className="mt-3 font-medium text-xl">{file?.fileName}</h2>
                  <h2>{new Date(file?._creationTime).toLocaleDateString()}</h2>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-md h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
