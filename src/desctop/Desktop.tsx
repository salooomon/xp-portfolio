import { Icon } from '../components/Icon.tsx';

export const Desktop = () => {

    const icons = [
        { id: 'my-computer', name: 'Мой компьютер', image: 'src/assets/icons/my-computer.ico', iconMini: 'src/assets/icons-mini/my-computer-mini.ico' },
        { id: 'my-document', name: 'Мои документы', image: 'src/assets/icons/my-documents.ico', iconMini: 'src/assets/icons-mini/my-documents-mini.ico' },
        { id: 'recycle-bin', name: 'Корзина', image: 'src/assets/icons/full-recycle-bin.ico', iconMini: 'src/assets/icons-mini/full-recycle-bin-mini.ico' },
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