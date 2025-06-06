import { windowsStore } from '../store/windowsStore.ts';
import '../styles/desctop-icon.css';

interface IProps {
    id: string;
    title: string;
    icon: string;
    iconMini: string;
}

export const Icon = ({id, title, icon, iconMini} : IProps) => {
    const { openWindow, focusOrCenterWindow, centerWindow, windows } = windowsStore();
    const windowState = windows.find(w  => w.id === id);

    const handleClick = () => {
        if (windowState) {
            if (windowState.minimized) {
                focusOrCenterWindow(id);
            } else {
                centerWindow(id);
            }
        } else {
            openWindow(id, title, iconMini);
        }
    };

    return (
        <div className="desktop-icon" onClick={handleClick}>
            <img className="icon-img" src={icon} alt={title} />
            <span className="icon-title">{title}</span>
        </div>
    );
};