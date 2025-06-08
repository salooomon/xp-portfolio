import {WindowWrapper} from "../components/WindowWrapper.tsx";
import '../styles/my-documents.css'
export const MyDocuments = () => {
    const projects = [
        {
            name: "Учебный проект: Интернет-магазин",
            description: "Полнофункциональный интернет-магазин на React",
            github: "https://github.com/salooomon/ra16-diploma"
        },
        {
            name: "Учебный проект: Биржа Неткоинов",
            description: "Учебный проект на курсе по JavaScript",
            github: "https://github.com/salooomon/bjs-diplom"
        },
        {
            name: "Учебный проект: Приложение для управления финансами",
            description: "Учебный проект на курсе по JavaScript",
            github: "https://github.com/salooomon/bhj-diploma "
        },
        {
            name: "Учебный проект: Ретро игра",
            description: "Учебный проект на курсе по фронтенду",
            github: "https://github.com/salooomon/Retro-Game"
        }
    ];

    return (
        <WindowWrapper
            title="Мои документы"
            id="my-documents"
            icon="src/assets/icons-mini/my-documents-mini.ico"
        >
            <div className="xp-window-content">
                <div className="xp-toolbar">
                    <button>
                        <a
                            href='https://github.com/salooomon'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="xp-link"
                        >
                            Мой gitHub
                        </a>

                    </button>
                </div>

                <div className="xp-panel">
                    <h2 className="xp-title">Мои проекты</h2>

                    <div className="xp-grid">
                        {projects.map((project, index) => (
                            <a
                                key={index}
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="xp-file-link"
                            >
                                <div className="xp-file">
                                    <div className="xp-file-icon">
                                        <img
                                            src="src/assets/icons/document.ico"
                                            alt="Project"
                                            className="xp-icon-large"
                                        />
                                    </div>
                                    <div className="xp-file-details">
                                        <h3 className="xp-file-title">{project.name}</h3>
                                        <p className="xp-file-description">{project.description}</p>
                                        <div className="xp-link">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}

                    </div>
                </div>
            </div>
        </WindowWrapper>
    );
};