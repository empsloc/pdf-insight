"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PDFViewer from "../_components/PDFViewer";
import { useQueries, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from "../_components/TextEditor";

function Workspace() {
  const { fileId } = useParams<any>();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord,{fileId:fileId})
  useEffect(()=>{
console.log(fileInfo)
  },[fileInfo])
  

  return (
    <div className="h-screen flex flex-col">
      <WorkspaceHeader fileName={fileInfo?.fileName}/>
      <div className="flex flex-1 overflow-hidden ">
        {/* Left side: Text Editor (scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
          <TextEditor fileId={fileId}/>
        </div>

        {/* Right side: Fixed PDF Viewer */}
        <div className="w-1/2 border-l p-3 sticky top-0 h-screen">
          {fileInfo && <PDFViewer fileUrl={fileInfo.fileUrl} />}
        </div>
      </div>
    </div>
    // <div>
    //   <WorkspaceHeader />
    //   <div className="grid grid-cols-2 gap-5 ">
    //     <div>{/* Text Editor */}

    //       <TextEditor/>
    //     </div>
    //     <div className=" ">{/* PDF viewer */}{fileInfo&&<PDFViewer fileUrl={fileInfo.fileUrl}/>}</div>
    //   </div>
    // </div>
  );
}

export default Workspace;
