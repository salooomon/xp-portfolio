import {WindowWrapper} from "../components/WindowWrapper.tsx";

export const MyComputer = () => {
    return (
        <WindowWrapper
            title="Мои компютер"
            id="my-computer"
            icon="src/assets/icons-mini/my-computer-mini.ico"
            width={20}
            height={15}
        >
            <p>Обо мне</p>
            <ul>
                <li>Меня зовут Кирилл</li>
                <li>Я frontend-разработчик</li>
            </ul>
        </WindowWrapper>
    )
}