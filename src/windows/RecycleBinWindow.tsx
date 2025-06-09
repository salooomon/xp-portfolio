import { WindowWrapper } from "../components/WindowWrapper.tsx";
import { Icon } from '../components/Icon.tsx';
import { windowsStore } from '../store/windowsStore';
import '../styles/recycle-bin.css';

export interface BinItem {
    id: string;
    title: string;
    icon: string;
    iconMini: string;
    shouldError?: boolean;
}

export const RecycleBin = () => {
    const { openAdWindow } = windowsStore();

    const binItems: BinItem[] = [
        {
            id: "necronomicon",
            title: "Necronomicon.doc",
            icon: "src/assets/icons/necronomicon.png",
            iconMini: "src/assets/icons-mini/necronomicon-mini.png",
            shouldError: Math.random() < 0.5,
        },
        {
            id: "solid-txt",
            title: "SOLID.txt",
            icon: "src/assets/icons/txt-file-gear.ico",
            iconMini: "src/assets/icons-mini/temp-file-mini.ico",
            shouldError: Math.random() < 0.5,
        },
    ];

    const handleItemClick = (item: BinItem) => {
        if (item.shouldError) {
            const errorWindowId = `error-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

            openAdWindow({
                id: errorWindowId,
                title: "Ошибка",
                content: (
                    <div style={{ padding: 20}}>
                        <h3 style={{ margin: 0 }}>Невозможно открыть файл</h3>
                        <p>Файл <strong>{item.title}</strong> повреждён или недоступен.</p>
                    </div>
                ),
                icon: "src/assets/icons-mini/error.ico",
            });
            return;
        }
    };

    return (
        <WindowWrapper
            title="Корзина"
            id="recycle-bin"
            icon="src/assets/icons-mini/full-recycle-bin-mini.ico"
        >
            <div className="xp-window-content">
                <div className="xp-panel xp-recycle-bin">
                    <div className="xp-grid xp-bin-grid">
                        {binItems.map(item => (
                            <div key={item.id} className="xp-bin-item">
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
    );
};
