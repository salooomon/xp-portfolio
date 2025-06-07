import {WindowWrapper} from "../components/WindowWrapper.tsx";

export const RecycleBin = () => {
    return (
        <WindowWrapper
            title="Корзина"
            id="recycle-bin"
            icon="src/assets/icons-mini/full-recycle-bin-mini.ico"
            width={20}
            height={25}
        >
            <ul>
                <li>Элемент 1</li>
                <li>Элемент 2</li>
            </ul>
        </WindowWrapper>
    )
}