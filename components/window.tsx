"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Minus, Square, RotateCcw } from "lucide-react"
import { useSystem } from "../contexts/system-context"
import type { WindowState } from "../types/system"

interface WindowProps {
  window: WindowState
  children: React.ReactNode
}

export function Window({ window, children }: WindowProps) {
  const { dispatch } = useSystem()
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains("window-header")) {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y,
      })
      dispatch({ type: "FOCUS_WINDOW", payload: window.id })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !window.isMaximized) {
      dispatch({
        type: "UPDATE_WINDOW",
        payload: {
          id: window.id,
          updates: {
            position: {
              x: Math.max(0, e.clientX - dragOffset.x),
              y: Math.max(0, e.clientY - dragOffset.y),
            },
          },
        },
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragOffset])

  if (window.isMinimized) return null

  const windowStyle = window.isMaximized
    ? { top: 0, left: 0, width: "100vw", height: "100vh" }
    : {
        top: window.position.y,
        left: window.position.x,
        width: window.size.width,
        height: window.size.height,
      }

  return (
    <div
      ref={windowRef}
      className="absolute bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
      style={{
        ...windowStyle,
        zIndex: window.zIndex,
      }}
      onMouseDown={() => dispatch({ type: "FOCUS_WINDOW", payload: window.id })}
    >
      <div
        className="window-header bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-medium text-gray-800">{window.title}</span>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => dispatch({ type: "MINIMIZE_WINDOW", payload: window.id })}
            className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500"
          >
            <Minus size={12} />
          </button>
          <button
            onClick={() => dispatch({ type: "MAXIMIZE_WINDOW", payload: window.id })}
            className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center hover:bg-green-500"
          >
            {window.isMaximized ? <RotateCcw size={12} /> : <Square size={12} />}
          </button>
          <button
            onClick={() => dispatch({ type: "CLOSE_WINDOW", payload: window.id })}
            className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center hover:bg-red-500"
          >
            <X size={12} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
