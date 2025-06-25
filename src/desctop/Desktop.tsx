import { Icon } from '../components/Icon.tsx';

export const Desktop = () => {

    const icons = [
        { id: 'my-computer', name: 'Мой компьютер', image: '/assets/icons/my-computer.ico', iconMini: '/assets/icons-mini/my-computer-mini.ico' },
        { id: 'my-documents', name: 'Мои документы', image: '/assets/icons/my-documents.ico', iconMini: '/assets/icons-mini/my-documents-mini.ico' },
        { id: 'recycle-bin', name: 'Корзина', image: '/assets/icons/full-recycle-bin.ico', iconMini: '/assets/icons-mini/full-recycle-bin-mini.ico' },
        { id: 'telegram', name: 'Телеграм', image: '/assets/icons/telegram-48.png', iconMini: '/assets/icons/telegram-48.png' },
    ];

    return (
        <div className="desktop">
            {icons.map((icon) => (
                <Icon
                    key={icon.id}
                    id={icon.id}
                    title={icon.name}
                    icon={icon.image}
                    iconMini={icon.iconMini}
                    onClick={icon.id === 'telegram'
                        ? () => window.open('https://t.me/kirillpopoov', '_blank')
                        : undefined}
                />
            ))}
        </div>
    );
};