"use client"
import { Window } from "./window"
import { useSystem } from "../contexts/system-context"
import { FileExplorer } from "./apps/file-explorer"
import { TextEditor } from "./apps/text-editor"
import { Calculator } from "./apps/calculator"
import { WebBrowser } from "./apps/web-browser"

const componentMap = {
  FileExplorer,
  TextEditor,
  Calculator,
  WebBrowser,
}

export function WindowRenderer() {
  const { state } = useSystem()

  return (
    <>
      {state.windows
        .filter((w) => w.isOpen)
        .map((window) => {
          const Component = componentMap[window.component as keyof typeof componentMap]

          if (!Component) return null

          return (
            <Window key={window.id} window={window}>
              <Component data={window.data} />
            </Window>
          )
        })}
    </>
  )
}
