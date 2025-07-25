"use client"
import { Calculator, FileText, Folder, Globe, Settings, Power } from "lucide-react"
import { useSystem } from "../contexts/system-context"
import type { AppConfig } from "../types/system"

const apps: AppConfig[] = [
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
  Settings,
  Power,
}

export function StartMenu() {
  const { state, dispatch } = useSystem()

  if (!state.startMenuOpen) return null

  const handleAppClick = (app: AppConfig) => {
    dispatch({ type: "OPEN_WINDOW", payload: { app } })
    dispatch({ type: "TOGGLE_START_MENU" })
  }

  return (
    <div className="absolute bottom-12 left-4 w-80 bg-white border border-gray-300 rounded-lg shadow-xl z-50">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Applications</h2>
      </div>

      <div className="p-2">
        {apps.map((app) => {
          const IconComponent = iconComponents[app.icon as keyof typeof iconComponents]
          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IconComponent size={24} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">{app.name}</span>
            </button>
          )
        })}
      </div>

      <div className="border-t border-gray-200 p-2">
        <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={24} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors">
          <Power size={24} className="text-red-500" />
          <span className="text-sm font-medium text-gray-700">Shutdown</span>
        </button>
      </div>
    </div>
  )
}
