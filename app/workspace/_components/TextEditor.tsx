'use client'
import React, { useEffect } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import EditorExtensions from './EditorExtensions'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { BulletList } from '@tiptap/extension-list'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
function TextEditor({fileId}:any) {

const notes = useQuery(api.notes.GetNotes,{
  fileId:fileId
})
// console.log(notes)

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({
            placeholder: 'Start asking your questions here and prepare your notes...',
          }),Highlight.configure({ multicolor: true }),Underline,TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),BulletList],
        
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        editorProps:{
            attributes:{
                class:'focus:outline-none h-screen p-5'
            }
        }
      })
      useEffect(()=>{
        editor&&editor?.commands.setContent(notes)
      
      },[notes&&editor])
      if (!editor) {
        return null
      }
     
     
  return (
    // 
    <div className="flex flex-col h-full">
    {/* Sticky Toolbar */}
    <div className="sticky top-0 z-10 bg-white shadow-sm p-2">
      <EditorExtensions editor={editor} />
    </div>

    {/* Scrollable Editor Area */}
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <EditorContent editor={editor} className="min-h-full" />
    </div>
  </div>
  )
}

export default TextEditor