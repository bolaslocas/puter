"use client"

import { useState, useEffect } from "react"
import { Save, FileText } from "lucide-react"
import { useSystem } from "../../contexts/system-context"
import type { FileSystemItem } from "../../types/system"

interface TextEditorProps {
  data?: { file?: FileSystemItem }
}

export function TextEditor({ data }: TextEditorProps) {
  const { dispatch } = useSystem()
  const [content, setContent] = useState("")
  const [fileName, setFileName] = useState("Untitled.txt")
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (data?.file) {
      setContent(data.file.content || "")
      setFileName(data.file.name)
    }
  }, [data])

  const handleSave = () => {
    if (data?.file) {
      dispatch({
        type: "UPDATE_FILE",
        payload: {
          id: data.file.id,
          updates: {
            content,
            modifiedAt: new Date(),
            size: content.length,
          },
        },
      })
    } else {
      // Create new file
      const newFile: FileSystemItem = {
        id: `file-${Date.now()}`,
        name: fileName,
        type: "file",
        content,
        parentId: "documents",
        createdAt: new Date(),
        modifiedAt: new Date(),
        size: content.length,
      }
      dispatch({ type: "CREATE_FILE", payload: newFile })
    }
    setHasChanges(false)
  }

  const handleContentChange = (value: string) => {
    setContent(value)
    setHasChanges(true)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-gray-50 border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText size={16} />
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="bg-transparent border-none outline-none font-medium"
          />
          {hasChanges && <span className="text-orange-500">*</span>}
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Save size={14} />
          <span>Save</span>
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        className="flex-1 p-4 border-none outline-none resize-none font-mono text-sm"
        placeholder="Start typing..."
      />
    </div>
  )
}
