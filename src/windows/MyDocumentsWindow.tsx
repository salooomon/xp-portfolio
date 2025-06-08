import {WindowWrapper} from "../components/WindowWrapper.tsx";

export const MyDocuments = () => {
    return (
        <WindowWrapper
            title="Мои документы"
            id="my-documents"
            icon="src/assets/icons-mini/my-documents-mini.ico"
        >
            <p>Мои проекты</p>
            <ul>
                <li>Проект 1</li>
                <li>Проект 2</li>
            </ul>
        </WindowWrapper>
    )
}