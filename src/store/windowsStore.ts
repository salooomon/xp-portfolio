import { create } from 'zustand';
import React from "react";

interface AdWindow {
    id: string;
    title: string;
    content: React.ReactNode;
    icon: string;
    position: { x: number; y: number };
}

interface Window {
    id: string;
    title: string;
    icon: string;
    minimized: boolean;
    active: boolean;
    position: { x: number; y: number };
    size?: { width: number; height: number };
    hasBeenDragged?: boolean;
}

interface WindowStore {
    windows: Window[];
    activeWindow: string | null;
    openWindow: (id: string, title: string, icon: string) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    restoreWindow: (id: string) => void;
    setActiveWindow: (id: string) => void;
    focusOrCenterWindow: (id: string) => void;
    centerWindow: (id: string) => void;
    setWindowPosition: (id: string, position: { x: number; y: number }) => void;
    setWindowSize: (id: string, size: { width: number; height: number }) => void;
    getWindow: (id: string) => Window | undefined;
    adWindows: AdWindow[];
    openAdWindow: (config?: Partial<AdWindow>) => void;
    closeAdWindow: (id: string) => void;
    closeAllAds: () => void;
}

export const windowsStore = create<WindowStore>((set, get) => ({
    windows: [],
    adWindows: [],
    activeWindow: null,

    openWindow: (id, title, icon,) => {
        const { windows } = get();
        const existingWindow = windows.find(w => w.id === id);

        if (existingWindow) {
            get().focusOrCenterWindow(id);
            return;
        }

        const x = (window.innerWidth) / 2;
        const y = (window.innerHeight) / 2;
        set((state) => ({
            windows: [
                ...state.windows.map(w => ({ ...w, active: false })),
                {
                    id,
                    title,
                    icon,
                    minimized: false,
                    active: true,
                    position: { x, y },
                    hasBeenDragged: false,
                }
            ],
            activeWindow: id,
        }));
    },

    closeWindow: (id) => set(state => ({
        windows: state.windows.filter(w => w.id !== id),
        activeWindow: state.activeWindow === id ? null : state.activeWindow
    })),

    minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map((w) =>
            w.id === id ? { ...w, minimized: true, active: false } : w
        ),
        activeWindow: state.activeWindow === id ? null : state.activeWindow
    })),

    restoreWindow: (id) => set((state) => ({
        windows: state.windows.map((w) =>
            w.id === id ? { ...w, minimized: false, active: true } : { ...w, active: false }
        ),
        activeWindow: id
    })),

    setActiveWindow: (id) => set((state) => ({
        activeWindow: id,
        windows: state.windows.map((w) => ({
            ...w,
            active: w.id === id
        }))
    })),

    focusOrCenterWindow: (id) => {
        const { windows, setActiveWindow, restoreWindow, centerWindow } = get();
        const window = windows.find(w => w.id === id);

        if (!window) return;

        if (window.minimized) {
            restoreWindow(id);
        } else {
            centerWindow(id);
            setActiveWindow(id);
        }
    },

    centerWindow: (id) => {
        const state = get();
        const win = state.windows.find(w => w.id === id);
        if (!win) return;

        const width = win.size?.width ?? 0;
        const height = win.size?.height ?? 0;
        const x = Math.max(0, (window.innerWidth - width) / 2);
        const y = Math.max(0, (window.innerHeight - height) / 2);

        set((state) => ({
            windows: state.windows.map(w =>
                w.id === id
                    ? { ...w, position: { x, y }, hasBeenDragged: false }
                    : w
            )
        }));
    },

    setWindowPosition: (id, position) => set((state) => ({
        windows: state.windows.map(w =>
            w.id === id
                ? { ...w, position, hasBeenDragged: true }
                : w
        )
    })),

    setWindowSize: (id, size) => set((state) => ({
        windows: state.windows.map(w =>
            w.id === id
                ? { ...w, size }
                : w
        )
    })),

    getWindow: (id) => {
        return get().windows.find(w => w.id === id);
    },
    openAdWindow: (config = {}) => {
        const windowWidth = 400;
        const windowHeight = 300;
        const minOffset = 20;
        const minBottomOffset = 100;
        const maxX = Math.max(0, window.innerWidth - windowWidth - minOffset);
        const maxY = Math.max(0, window.innerHeight - windowHeight - minBottomOffset);
        const defaultAd: AdWindow = {
            id: config.id || `ad-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
            title: config.title || 'Важное сообщение!',
            content: config.content,
            icon: config.icon || '/assets/icons-mini/error.ico',
            position: config.position || {
                x: minOffset + Math.random() * maxX,
                y: minOffset + Math.random() * maxY,
            },
        };

        set((state) => ({
            adWindows: [...state.adWindows, { ...defaultAd, ...config }],
            activeWindow: defaultAd.id
        }));
    },

    closeAdWindow: (id) => set((state) => ({
        adWindows: state.adWindows.filter(ad => ad.id !== id)
    })),

    closeAllAds: () => set({ adWindows: [] })
}));
