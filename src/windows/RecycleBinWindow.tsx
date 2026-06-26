import { useEffect, useMemo, useState } from 'react';
import { WindowWrapper } from "../components/WindowWrapper.tsx";
import { Icon } from '../components/Icon.tsx';
import { windowsStore } from '../store/windowsStore';
import { WindowInstancesHost, type WindowInstanceConfig } from "../components/WindowInstancesHost.tsx";
import { createWindowInstanceId } from "../utils/windowIds.ts";
import '../styles/recycle-bin.css';

export interface BinItem {
    id: string;
    title: string;
    icon: string;
    iconMini: string;
    shouldError?: boolean;
    previewLines: string[];
}

interface BinFileWindowInstance {
    windowId: string;
    item: BinItem;
}

const BIN_FILE_WINDOW_NAMESPACE = 'recycle-file';

export const RecycleBin = () => {
    const { openAdWindow, openWindow, focusOrCenterWindow, windows } = windowsStore();
    const [fileWindows, setFileWindows] = useState<BinFileWindowInstance[]>([]);

    const binItems = useMemo<BinItem[]>(() => ([
        {
            id: "necronomicon",
            title: "Necronomicon.doc",
            icon: "/assets/icons/necronomicon.png",
            iconMini: "/assets/icons-mini/necronomicon-mini.png",
            shouldError: Math.random() < 0.5,
            previewLines: [
                "Инвентарная запись #A-114.",
                "Документ поврежден. Часть страниц недоступна."
            ]
        },
        {
            id: "solid-txt",
            title: "SOLID.txt",
            icon: "/assets/icons/txt-file-gear.ico",
            iconMini: "/assets/icons-mini/temp-file-mini.ico",
            shouldError: Math.random() < 0.5,
            previewLines: [
                "S - Single Responsibility Principle",
                "O - Open/Closed Principle",
                "L - Liskov Substitution Principle",
                "I - Interface Segregation Principle",
                "D - Dependency Inversion Principle"
            ]
        },
        {
            id: "txt-file",
            title: "Кандидаты.txt",
            icon: "/assets/icons/txt-file.ico",
            iconMini: "/assets/icons/txt-file.ico",
            shouldError: Math.random() < 0.5,
            previewLines: [
                "Список кандидатов на проект:",
                "1. Frontend Developer",
                "2. Backend Developer",
                "3. QA Engineer"
            ]
        },
    ]), []);

    useEffect(() => {
        setFileWindows((prev) => {
            const openWindowIds = new Set(windows.map((window) => window.id));
            const next = prev.filter((instance) => openWindowIds.has(instance.windowId));
            return next.length === prev.length ? prev : next;
        });
    }, [windows]);

    const openFileWindowByItemId = useMemo(() => {
        const openWindowIds = new Set(windows.map((window) => window.id));
        const index = new Map<string, string>();

        fileWindows.forEach((instance) => {
            if (openWindowIds.has(instance.windowId) && !index.has(instance.item.id)) {
                index.set(instance.item.id, instance.windowId);
            }
        });

        return index;
    }, [fileWindows, windows]);

    const handleItemClick = (item: BinItem) => {
        if (item.shouldError) {
            const errorWindowId = createWindowInstanceId('error', item.id);

            openAdWindow({
                id: errorWindowId,
                title: "Ошибка",
                content: (
                    <div style={{ padding: 20 }}>
                        <h3 style={{ margin: 0 }}>Невозможно открыть файл</h3>
                        <p>Файл <strong>{item.title}</strong> поврежден или недоступен.</p>
                    </div>
                ),
                icon: "/assets/icons-mini/error.ico",
            });
            return;
        }

        const existingWindowId = openFileWindowByItemId.get(item.id);
        if (existingWindowId) {
            focusOrCenterWindow(existingWindowId);
            return;
        }

        const windowId = createWindowInstanceId(BIN_FILE_WINDOW_NAMESPACE, item.id);
        openWindow(windowId, item.title, item.iconMini);
        setFileWindows((prev) => [...prev, { windowId, item }]);
    };

    const fileWindowConfigs: WindowInstanceConfig[] = fileWindows.map((instance) => ({
        id: instance.windowId,
        title: instance.item.title,
        icon: instance.item.iconMini,
        content: (
            <div className="xp-window-content xp-bin-file-window">
                <div className="xp-panel">
                    <h3 className="xp-bin-file-window-title">{instance.item.title}</h3>
                    <div className="xp-bin-file-window-text">
                        {instance.item.previewLines.map((line, index) => (
                            <p key={`${instance.windowId}-${index}`}>{line}</p>
                        ))}
                    </div>
                </div>
            </div>
        )
    }));

    return (
        <>
            <WindowWrapper
                title="Корзина"
                id="recycle-bin"
                icon="/assets/icons-mini/full-recycle-bin-mini.ico"
            >
                <div className="xp-window-content">
                    <div className="xp-panel xp-recycle-bin">
                        <div className="xp-grid xp-bin-grid">
                            {binItems.map(item => (
                                <div
                                    key={item.id}
                                    className="xp-bin-item"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <Icon
                                        id={item.id}
                                        title={item.title}
                                        icon={item.icon}
                                        iconMini={item.iconMini}
                                        onClick={() => handleItemClick(item)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </WindowWrapper>

            <WindowInstancesHost instances={fileWindowConfigs} />
        </>
    );
};
