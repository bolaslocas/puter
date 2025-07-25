import { SystemProvider } from "../contexts/system-context"
import { Desktop } from "../components/desktop"
import { Taskbar } from "../components/taskbar"
import { StartMenu } from "../components/start-menu"
import { WindowRenderer } from "../components/window-renderer"

export default function PuterOS() {
  return (
    <SystemProvider>
      <div className="h-screen w-screen overflow-hidden">
        <Desktop />
        <WindowRenderer />
        <StartMenu />
        <Taskbar />
      </div>
    </SystemProvider>
  )
}
