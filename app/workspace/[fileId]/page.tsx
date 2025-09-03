"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PDFViewer from "../_components/PDFViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from "../_components/TextEditor";
import { XCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Workspace() {
  const { fileId } = useParams<any>();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, { fileId: fileId });

  const [isDialogOpen, setIsDialogOpen] = useState(true); // 👈 auto open on load
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);

  return (
    <div className="h-screen flex flex-col">
      <WorkspaceHeader fileName={fileInfo?.fileName} />

      {/* ----------- Auto-open Dialog for instructions ----------- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Note from the developer</DialogTitle>
            <DialogDescription>
  Here’s how you can use this workspace:
</DialogDescription>

<div className="mt-3">
  <ul className="list-disc pl-6 space-y-2 text-sm">
    <li>
      Edit your notes/code in the <b>Text Editor</b> on the left.
    </li>
    <li>
      To use <b>AI responses</b>; write something on the text editor,only select
      the particular text you want answers to and click on the <b>Generate response </b>
       button on the <b>toolbar</b> to generate a response in context of the selected text and
      provided PDF.
    </li>
    <li>
      View the uploaded PDF on the <b>right side</b> (desktop only).
    </li>
    <li>
      On mobile, tap the <b>View PDF</b> button to open the PDF.
    </li>
  </ul>
</div>

          </DialogHeader>
          <DialogFooter>
            <Button className="cursor-pointer" onClick={() => setIsDialogOpen(false)}>Got it!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile PDF button */}
      <div className="px-11 pt-5 md:hidden">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow cursor-pointer hover:bg-gray-700 transition"
        >
          View PDF
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left side: Text Editor */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
          <TextEditor fileId={fileId} />
        </div>

        {/* Right side: PDF Viewer for desktop */}
        <div className="w-1/2 border-l p-3 sticky top-0 h-screen hidden md:block">
          {fileInfo && <PDFViewer fileUrl={fileInfo.fileUrl} />}
        </div>
      </div>

      {/* Modal for mobile PDF view */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl p-4 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 rounded-full p-1 shadow"
              aria-label="Close"
            >
              <XCircle />
            </button>
            {fileInfo && <PDFViewer fileUrl={fileInfo.fileUrl} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Workspace;
