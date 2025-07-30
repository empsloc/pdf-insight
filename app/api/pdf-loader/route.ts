import { NextResponse } from "next/server";
// const pdfUrl = "https://uncommon-panda-15.convex.cloud/api/storage/fd415a31-f906-4118-b861-31a7a3ce2864"
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
export async function GET(req:any) {
const reqUrl = req.url
const {searchParams} = new URL(reqUrl)

const pdfUrl=searchParams.get('pdfUrl')
console.log(pdfUrl)
    //load the pdf file
    const response = await fetch(pdfUrl!)
    const data =await  response.blob()
    const loader = new WebPDFLoader(data)
    const docs = await loader.load()

    let pdfTextContent = '';
    docs.forEach(doc=>{
        pdfTextContent=pdfTextContent+doc.pageContent
    })

    //Split the text into smaller chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
      });
      const output = await splitter.createDocuments([pdfTextContent]);
      let splitterList:any=[]
      output.forEach(doc=>{
        splitterList.push(doc.pageContent)
      })



    return NextResponse.json({result:splitterList})
    
}