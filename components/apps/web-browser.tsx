"use client"

import { useState } from "react"
import { Globe, ArrowLeft, ArrowRight, RotateCcw, Home } from "lucide-react"

export function WebBrowser() {
  const [url, setUrl] = useState("https://www.google.com")
  const [currentUrl, setCurrentUrl] = useState("https://www.google.com")

  const navigate = () => {
    setCurrentUrl(url)
  }

  const goHome = () => {
    setUrl("https://www.google.com")
    setCurrentUrl("https://www.google.com")
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-gray-100 border-b border-gray-300 p-2">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-200 rounded" disabled>
            <ArrowLeft size={16} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" disabled>
            <ArrowRight size={16} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded">
            <RotateCcw size={16} />
          </button>
          <button onClick={goHome} className="p-2 hover:bg-gray-200 rounded">
            <Home size={16} />
          </button>
          <div className="flex-1 flex items-center bg-white border border-gray-300 rounded px-3 py-1">
            <Globe size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && navigate()}
              className="flex-1 outline-none text-sm"
              placeholder="Enter URL..."
            />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <iframe
          src={currentUrl}
          className="w-full h-full border-none"
          title="Web Browser"
          sandbox="allow-same-origin allow-scripts allow-forms"
        />
      </div>
    </div>
  )
}
