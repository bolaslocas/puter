"use client"

import { useState } from "react"
import { Folder, File, Plus } from "lucide-react"
import { useSystem } from "../../contexts/system-context"
import type { FileSystemItem } from "../../types/system"

export function FileExplorer() {
  const { state, dispatch } = useSystem()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [currentFolder, setCurrentFolder] = useState("desktop")
  const [newItemName, setNewItemName] = useState("")
  const [showNewItemInput, setShowNewItemInput] = useState(false)
  const [newItemType, setNewItemType] = useState<"file" | "folder">("file")

  const getCurrentFolderItems = () => {
    const folder = state.fileSystem.find((item) => item.id === currentFolder)
    return folder?.children || []
  }

  const handleItemDoubleClick = (item: FileSystemItem) => {
    if (item.type === "folder") {
      setCurrentFolder(item.id)
    } else {
      // Open file in text editor
      dispatch({
        type: "OPEN_WINDOW",
        payload: {
          app: {
            id: "text-editor",
            name: "Text Editor",
            component: "TextEditor",
            defaultSize: { width: 600, height: 400 },
          },
          data: { file: item },
        },
      })
    }
  }

  const createNewItem = () => {
    if (!newItemName.trim()) return

    const newItem: FileSystemItem = {
      id: `${newItemType}-${Date.now()}`,
      name: newItemName,
      type: newItemType,
      content: newItemType === "file" ? "" : undefined,
      children: newItemType === "folder" ? [] : undefined,
      parentId: currentFolder,
      createdAt: new Date(),
      modifiedAt: new Date(),
      size: 0,
    }

    dispatch({ type: "CREATE_FILE", payload: newItem })
    setNewItemName("")
    setShowNewItemInput(false)
  }

  const currentFolderData = state.fileSystem.find((item) => item.id === currentFolder)
  const items = getCurrentFolderItems()

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-gray-50 border-b border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentFolder("desktop")}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Desktop
            </button>
            <span className="text-gray-500">/</span>
            <span className="text-sm font-medium">{currentFolderData?.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setNewItemType("folder")
                setShowNewItemInput(true)
              }}
              className="p-2 hover:bg-gray-200 rounded"
              title="New Folder"
            >
              <Folder size={16} />
            </button>
            <button
              onClick={() => {
                setNewItemType("file")
                setShowNewItemInput(true)
              }}
              className="p-2 hover:bg-gray-200 rounded"
              title="New File"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {showNewItemInput && (
          <div className="mt-2 flex items-center space-x-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`New ${newItemType} name`}
              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              onKeyPress={(e) => e.key === "Enter" && createNewItem()}
              autoFocus
            />
            <button
              onClick={createNewItem}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Create
            </button>
            <button
              onClick={() => setShowNewItemInput(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                selectedItem === item.id ? "bg-blue-100 border-blue-300" : "border-transparent"
              } border-2 transition-colors`}
              onClick={() => setSelectedItem(item.id)}
              onDoubleClick={() => handleItemDoubleClick(item)}
            >
              <div className="flex flex-col items-center space-y-2">
                {item.type === "folder" ? (
                  <Folder size={32} className="text-blue-500" />
                ) : (
                  <File size={32} className="text-gray-500" />
                )}
                <span className="text-xs text-center break-words">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
