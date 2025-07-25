export interface FileSystemItem {
  id: string
  name: string
  type: "file" | "folder"
  content?: string
  children?: FileSystemItem[]
  parentId?: string
  createdAt: Date
  modifiedAt: Date
  size?: number
}

export interface WindowState {
  id: string
  title: string
  component: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  data?: any
}

export interface AppConfig {
  id: string
  name: string
  icon: string
  component: string
  defaultSize: { width: number; height: number }
}
