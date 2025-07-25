"use client"
import { Folder, FileText, Calculator, Globe } from "lucide-react"
import { useSystem } from "../contexts/system-context"
import type { AppConfig } from "../types/system"

const desktopApps: AppConfig[] = [
  {
    id: "file-explorer",
    name: "File Explorer",
    icon: "Folder",
    component: "FileExplorer",
    defaultSize: { width: 800, height: 600 },
  },
  {
    id: "text-editor",
    name: "Text Editor",
    icon: "FileText",
    component: "TextEditor",
    defaultSize: { width: 600, height: 400 },
  },
  {
    id: "calculator",
    name: "Calculator",
    icon: "Calculator",
    component: "Calculator",
    defaultSize: { width: 300, height: 400 },
  },
  {
    id: "web-browser",
    name: "Web Browser",
    icon: "Globe",
    component: "WebBrowser",
    defaultSize: { width: 1000, height: 700 },
  },
]

const iconComponents = {
  Folder,
  FileText,
  Calculator,
  Globe,
}

export function Desktop() {
  const { dispatch } = useSystem()

  const handleAppDoubleClick = (app: AppConfig) => {
    dispatch({ type: "OPEN_WINDOW", payload: { app } })
  }

  return (
    <div
      className="h-screen w-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden"
      style={{
        backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      <div className="relative z-10 p-6">
        <div className="grid grid-cols-8 gap-6">
          {desktopApps.map((app, index) => {
            const IconComponent = iconComponents[app.icon as keyof typeof iconComponents]
            return (
              <div
                key={app.id}
                className="flex flex-col items-center space-y-2 cursor-pointer group"
                onDoubleClick={() => handleAppDoubleClick(app)}
              >
                <div className="p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg group-hover:bg-opacity-30 transition-all">
                  <IconComponent size={32} className="text-white" />
                </div>
                <span className="text-white text-sm font-medium text-center drop-shadow-lg">{app.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
