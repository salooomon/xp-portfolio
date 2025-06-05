import { create } from 'zustand'

type WindowState = {
    isExplorerOpen: boolean
    openExplorer: () => void
    closeExplorer: () => void
}

export const useWindowStore = create<WindowState>((set) => ({
    isExplorerOpen: true,
    openExplorer: () => set({ isExplorerOpen: true }),
    closeExplorer: () => set({ isExplorerOpen: false }),
}))
