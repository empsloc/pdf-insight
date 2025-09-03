
import { Button } from '@/components/ui/button'
import { AIModelResult } from '@/configs/AIModel'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useAction, useMutation } from 'convex/react'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Heading1, Heading2, Highlighter, Italic, List, Loader, Sparkles, ToggleRight, Underline, Undo } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

function EditorExtensions({editor}:any) {
    const SearchAI = useAction(api.myActions.search)
    const { user } = useUser()
    const { fileId } = useParams<any>()
    const saveNotes = useMutation(api.notes.AddNotes)
    const  [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const onAIClick=async()=>{
      setLoading(true)
        toast("AI is working on your answer...", {
            description: "Please wait while it generates response",
            action: {
              label: "Okay",
              onClick: () => console.log("Okay"),
            },
          })
        // console.log("ai button cliked")
        console.log("fileId : ",fileId)
        const selectedText = editor.state.doc.textBetween(editor.state.selection.from,editor.state.selection.to,' ')
        console.log(selectedText)

        const result = await SearchAI({
            query:selectedText,
            fileId:fileId
        })
        const unformattedAns = JSON.parse(result)
        let answer=''
        unformattedAns&&unformattedAns.forEach((item:any)=>{
            answer = answer+item.pageContent
        })
        const PROMPT = "For question : "+selectedText+" and with the given content as answer, "+"please give appropriate answer in HTML format keep in mind that response is used in displaying answer and it should look like just the answer in HTML format nothing extra which might indicate it was AI. The answer content is: "+answer
        const AIModelAnswer = await AIModelResult(PROMPT)
        console.log("Gemini answer",AIModelAnswer)

        const AllText = editor.getHTML()
        editor.commands.setContent(AllText+'<p><strong>Answer: </strong>'+AIModelAnswer.replace('```','').replace('html','').replace('```','')+'</p>')
        await user&&user?.primaryEmailAddress?.emailAddress&&saveNotes({
          notes:editor.getHTML(),
          fileId:fileId,
          createdBy:user?.primaryEmailAddress?.emailAddress
        })
        setLoading(false)
      }

      const saveData=async()=>{
        setSaveLoading(true)

        await user&&user?.primaryEmailAddress?.emailAddress&&saveNotes({
          notes:editor.getHTML(),
          fileId:fileId,
          createdBy:user?.primaryEmailAddress?.emailAddress
        })
        setSaveLoading(false)
        toast('Saved')
      }
  return editor&&(
    <div className='p-5 '>
         <div className="control-group ">
        <div className="button-group flex gap-3 flex-wrap">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''}
          >
            <Bold/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
          >
            <Italic/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()}
            className={editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''}
          >
            <Highlighter/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          >
           <Underline/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <AlignLeft/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <AlignCenter/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <AlignRight/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
          >
            <AlignJustify/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <List/>
          </button>
          
          <button onClick={() => editor.chain().focus().unsetTextAlign().run()}><Undo/></button>
         
          
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive({ level: 1 }) ? 'is-active' : ''}
          >
            <Heading1/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive({ level: 2 }) ? 'is-active' : ''}
          >
           <Heading2/>
          </button>

          <button
            onClick={() => onAIClick()}
            className={ 'hover:text-blue-500 cursor-pointer flex items-center gap-2 p-2 shadow-lg rounded-lg'}
          > Generate response
           {loading?<Loader className='animate-spin'/>:<Sparkles/>}
          </button>

          <Button className='cursor-pointer' onClick={()=>saveData()}>{saveLoading?<Loader className='animate-spin'/>:"Save"}</Button>
          </div>
          </div>
    </div>
  )
}

export default EditorExtensions