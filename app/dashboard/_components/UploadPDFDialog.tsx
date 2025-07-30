"use client"
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { api } from "@/convex/_generated/api";
import { useAction, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { ingest } from "@/convex/myActions";

function UploadPDFDialog({ children, isMaxFile }: any) {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const [file, setFile] = useState<any>()
    const embedDocument = useAction(api.myActions.ingest)
    const getFileUrl = useMutation(api.fileStorage.getFileUrl)
    const [loading,setLoading] = useState(false)
    const {user} =useUser()
    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDB)
    const [fileName, setFileName] = useState<any>()
    const [open,setOpen] = useState(false)
    const OnFileSelect=(event:any)=>{
        setFile(event.target.files[0])

    }
    const OnUpload=async()=>{
        setLoading(true)
        // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type! },
        body: file,
      });
      const { storageId } = await result.json();
      console.log('storageId',storageId)
      const fileUrl = await getFileUrl({storageId:storageId})
       // Step 3: Save the newly allocated storage id to the database
      const fileId = uuidv4();
      const resp = await addFileEntry({
        fileId:fileId,
        storageId:storageId,
        fileUrl:fileUrl!,
        fileName:fileName??'untitledFile',
        createdBy:user?.primaryEmailAddress?.emailAddress!
      })
    //   api call to fetch pdf processed data
      const ApiResp = await axios.get("/api/pdf-loader?pdfUrl="+fileUrl)
      console.log(ApiResp.data.result)
      await embedDocument({
        splitText:ApiResp.data.result,
        fileId:fileId
      })
    //   console.log(embeddedResult)
      setLoading(false)
      setOpen(false)
    }
  return (
    <Dialog open={open}>
      <DialogTrigger asChild><Button className="w-full" disabled={isMaxFile} onClick={()=>setOpen(true)}>+ Upload PDF File</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF file</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-10">
            <h2 className="div">Select a file to upload</h2>

              <div className=" gap-2 p-3 rounded-md ">
                <input accept="application/pdf" type="file" onChange={(event)=>OnFileSelect(event)}/>
              </div>
              <div className="mt-2 ">
                <label>File Name</label>
                <Input placeholder="File name" onChange={(e)=>setFileName(e.target.value)}/>
              </div>
              
              
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button disabled={loading} onClick={OnUpload}>{loading?<Loader2Icon className="animate-spin"/>:"Upload"}</Button>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPDFDialog;
