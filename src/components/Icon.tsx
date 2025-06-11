import { windowsStore } from '../store/windowsStore';
import '../styles/desctop-icon.css';

interface IProps {
    title: string;
    icon: string;
    iconMini: string;
    onClick?: () => void;
    id?: string;
}

export const Icon = ({ id, title, icon, iconMini, onClick }: IProps) => {
    const { openWindow, focusOrCenterWindow, centerWindow, windows } = windowsStore();
    const windowState = windows.find(w => w.id === id);

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        console.log(windowState);
        if (id) {
            if (windowState) {

                if (windowState.minimized) {
                    focusOrCenterWindow(id);
                } else {
                    centerWindow(id);
                }
            } else {
                openWindow(id, title, iconMini);
            }
        }
    };

    return (
        <div className="desktop-icon" onClick={handleClick}>
            <img className="icon-img" src={icon} alt={title} />
            <span className="icon-title">{title}</span>
        </div>
    );
};
