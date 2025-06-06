import {WindowWrapper} from "../components/WindowWrapper.tsx";

export const MyComputer = () => {
    return (
        <WindowWrapper
            title="Мои компютер"
            id="my-computer"
            width={200}
            height={150}
        >
            <p>Обо мне</p>
            <ul>
                <li>Меня зовут Кирилл</li>
                <li>Я frontend-разработчик</li>
            </ul>
        </WindowWrapper>
    )
}