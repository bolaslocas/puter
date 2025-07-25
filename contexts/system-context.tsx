"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { FileSystemItem, WindowState, AppConfig } from "../types/system"

interface SystemState {
  windows: WindowState[]
  fileSystem: FileSystemItem[]
  currentPath: string
  nextZIndex: number
  startMenuOpen: boolean
}

type SystemAction =
  | { type: "OPEN_WINDOW"; payload: { app: AppConfig; data?: any } }
  | { type: "CLOSE_WINDOW"; payload: string }
  | { type: "MINIMIZE_WINDOW"; payload: string }
  | { type: "MAXIMIZE_WINDOW"; payload: string }
  | { type: "UPDATE_WINDOW"; payload: { id: string; updates: Partial<WindowState> } }
  | { type: "FOCUS_WINDOW"; payload: string }
  | { type: "TOGGLE_START_MENU" }
  | { type: "SET_CURRENT_PATH"; payload: string }
  | { type: "CREATE_FILE"; payload: FileSystemItem }
  | { type: "DELETE_FILE"; payload: string }
  | { type: "UPDATE_FILE"; payload: { id: string; updates: Partial<FileSystemItem> } }
  | { type: "LOAD_FILESYSTEM"; payload: FileSystemItem[] }

const initialState: SystemState = {
  windows: [],
  fileSystem: [
    {
      id: "desktop",
      name: "Desktop",
      type: "folder",
      children: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    },
    {
      id: "documents",
      name: "Documents",
      type: "folder",
      children: [
        {
          id: "welcome",
          name: "Welcome.txt",
          type: "file",
          content:
            "Welcome to Puter Web OS!\n\nThis is a fully functional web-based operating system running on Vercel.",
          parentId: "documents",
          createdAt: new Date(),
          modifiedAt: new Date(),
          size: 95,
        },
      ],
      createdAt: new Date(),
      modifiedAt: new Date(),
    },
    {
      id: "pictures",
      name: "Pictures",
      type: "folder",
      children: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    },
  ],
  currentPath: "desktop",
  nextZIndex: 1000,
  startMenuOpen: false,
}

function systemReducer(state: SystemState, action: SystemAction): SystemState {
  switch (action.type) {
    case "OPEN_WINDOW":
      const newWindow: WindowState = {
        id: `${action.payload.app.id}-${Date.now()}`,
        title: action.payload.app.name,
        component: action.payload.app.component,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + state.windows.length * 30, y: 100 + state.windows.length * 30 },
        size: action.payload.app.defaultSize,
        zIndex: state.nextZIndex,
        data: action.payload.data,
      }
      return {
        ...state,
        windows: [...state.windows, newWindow],
        nextZIndex: state.nextZIndex + 1,
      }

    case "CLOSE_WINDOW":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.payload),
      }

    case "FOCUS_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload ? { ...w, zIndex: state.nextZIndex, isMinimized: false } : w,
        ),
        nextZIndex: state.nextZIndex + 1,
      }

    case "UPDATE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) => (w.id === action.payload.id ? { ...w, ...action.payload.updates } : w)),
      }

    case "TOGGLE_START_MENU":
      return {
        ...state,
        startMenuOpen: !state.startMenuOpen,
      }

    case "CREATE_FILE":
      return {
        ...state,
        fileSystem: [...state.fileSystem, action.payload],
      }

    case "LOAD_FILESYSTEM":
      return {
        ...state,
        fileSystem: action.payload,
      }

    default:
      return state
  }
}

const SystemContext = createContext<{
  state: SystemState
  dispatch: React.Dispatch<SystemAction>
} | null>(null)

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(systemReducer, initialState)

  useEffect(() => {
    const saved = localStorage.getItem("puter-filesystem")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        dispatch({ type: "LOAD_FILESYSTEM", payload: parsed })
      } catch (e) {
        console.error("Failed to load filesystem:", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("puter-filesystem", JSON.stringify(state.fileSystem))
  }, [state.fileSystem])

  return <SystemContext.Provider value={{ state, dispatch }}>{children}</SystemContext.Provider>
}

export function useSystem() {
  const context = useContext(SystemContext)
  if (!context) {
    throw new Error("useSystem must be used within SystemProvider")
  }
  return context
}
