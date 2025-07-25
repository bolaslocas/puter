"use client"
import { Menu, Minimize2 } from "lucide-react"
import { useSystem } from "../contexts/system-context"

export function Taskbar() {
  const { state, dispatch } = useSystem()

  const handleStartClick = () => {
    dispatch({ type: "TOGGLE_START_MENU" })
  }

  const handleWindowClick = (windowId: string) => {
    dispatch({ type: "FOCUS_WINDOW", payload: windowId })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-800 border-t border-gray-600 flex items-center px-2 z-40">
      <button
        onClick={handleStartClick}
        className={`flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
          state.startMenuOpen ? "bg-gray-700" : ""
        }`}
      >
        <Menu size={16} className="text-white" />
        <span className="text-white text-sm font-medium">Start</span>
      </button>

      <div className="flex-1 flex items-center space-x-1 ml-4">
        {state.windows
          .filter((w) => w.isOpen)
          .map((window) => (
            <button
              key={window.id}
              onClick={() => handleWindowClick(window.id)}
              className={`flex items-center space-x-2 px-3 py-1 rounded text-sm transition-colors ${
                window.isMinimized ? "bg-gray-600 text-gray-300" : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              <span className="truncate max-w-32">{window.title}</span>
              {window.isMinimized && <Minimize2 size={12} />}
            </button>
          ))}
      </div>

      <div className="text-white text-sm">
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  )
}
