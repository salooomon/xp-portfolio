import { Icon } from '../components/Icon.tsx';

export const Desktop = () => {

    const icons = [
        { id: 'my-computer', name: 'Мой компьютер', image: '/assets/icons/my-computer.ico', iconMini: '/assets/icons-mini/my-pictures-mini.ico' },
        { id: 'my-documents', name: 'Мои документы', image: '/assets/icons/my-documents.ico', iconMini: '/assets/icons-mini/my-documents-mini.ico' },
        { id: 'recycle-bin', name: 'Корзина', image: '/assets/icons/full-recycle-bin.ico', iconMini: '/assets/icons-mini/full-recycle-bin-mini.ico' },
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
                />
            ))}
        </div>
    );
};