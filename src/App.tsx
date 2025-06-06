import 'xp.css'
import './styles/globals.css'

import { useState } from "react";
import { WindowWrapper } from "./components/WindowWrapper.tsx";
import { Taskbar } from "./components/Taskbar.tsx";

export default function App() {
    const [isWindowOpen, setIsWindowOpen] = useState(true);

    return (
        <>
            <div className="desktop">
                {isWindowOpen && (
                    <WindowWrapper
                        title="Мои документы"
                        defaultPosition={{x: 100, y: 50}}
                        defaultSize={{width: 300, height: 200}}
                        onClose={() => setIsWindowOpen(false)}
                    >
                        <p>Содержимое окна здесь!</p>
                        <ul>
                            <li>Файл 1</li>
                            <li>Файл 2</li>
                        </ul>
                    </WindowWrapper>
                )}
            </div>
            <Taskbar/>
        </>
    );
}
