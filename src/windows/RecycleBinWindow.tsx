import {WindowWrapper} from "../components/WindowWrapper.tsx";
import { Icon } from '../components/Icon.tsx';
import '../styles/recycle-bin.css'

export const RecycleBin = () => {
    const binItems = [
        {
            id: "deleted-file",
            title: "Necronomicon.doc",
            icon: "src/assets/icons/necronomicon.png",
            iconMini: "src/assets/icons/necronomicon.png"
        },
        {
            id: "deleted-file",
            title: "SOLID.txt",
            icon: "src/assets/icons/txt-file-gear.ico",
            iconMini: "src/assets/icons-mini/temp-file-mini.ico"
        },
    ];

    return (
        <WindowWrapper
            title="Корзина"
            id="recycle-bin"
            icon="src/assets/icons-mini/full-recycle-bin-mini.ico"
        >
            <div className="xp-window-content">
                <div className="xp-panel xp-recycle-bin">
                    <div className="xp-grid xp-bin-grid">
                        {binItems.map((item) => (
                            <div key={item.id} className="xp-bin-item">
                                <Icon
                                    id={item.id}
                                    title={item.title}
                                    icon={item.icon}
                                    iconMini={item.iconMini}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </WindowWrapper>
    );
};