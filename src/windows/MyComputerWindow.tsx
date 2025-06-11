import {WindowWrapper} from "../components/WindowWrapper.tsx";
import '../styles/my-computer.css'

export const MyComputer = () => {
    const calculateExperience = (startDate: Date, endDate: Date = new Date()) => {
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth());
        return Math.floor(months / 12);
    };

    const learningStartDate = new Date();
    learningStartDate.setFullYear(learningStartDate.getFullYear() - 2);

    const commercialStartDate = new Date();
    commercialStartDate.setFullYear(commercialStartDate.getFullYear() - 1);

    const learningExperience = calculateExperience(learningStartDate);
    const commercialExperience = calculateExperience(commercialStartDate);

    return (
        <WindowWrapper
            title="Мой компьютер"
            id="my-computer"
            icon="assets/icons-mini/my-computer-mini.ico"
        >
            <div className="xp-section">
                <h3 style={{color: '#0058e3', marginBottom: '10px', marginTop: '0'}}>Обо мне</h3>
                <p style={{marginBottom: '10px'}}>
                    Привет! Меня зовут Кирилл, я frontend-разработчик.
                </p>
                <ul className="tree-view">
                    <li>Учебный опыт: {learningExperience} года</li>
                    <li>Коммерческий опыт: {commercialExperience} год</li>
                    <li>Увлекаюсь созданием удобных и современных интерфейсов</li>
                    <li>Постоянно изучаю новые технологии и улучшаю свои навыки</li>
                </ul>
            </div>

            <ul className="tree-view">
                <li>
                    <details open>
                        <summary>
                            <div className="icon-item">
                                <img src="/assets/icons/gear.png" alt="Code" className="icon"/>
                                Технологии разработки
                            </div>
                        </summary>
                        <ul>
                            <li>
                                <details open>
                                    <summary>
                                        <div className="icon-item">
                                            <img src="/assets/icons/programming-languages.png" alt="Languages"
                                                 className="icon spin-constant"/>
                                            Языки программирования
                                        </div>
                                    </summary>
                                    <ul>
                                        <li>
                                            <div className="icon-item">
                                                <div className="icon-spin">
                                                    <img src="/assets/icons/javascript.png" alt="JavaScript"
                                                         className="icon spin-constant"/>
                                                </div>
                                                JavaScript
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon-item">
                                                <div className="icon-spin">
                                                    <img src="/assets/icons/typescript.png" alt="TypeScript"
                                                         className="icon spin-constant"/>
                                                </div>
                                                TypeScript
                                            </div>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            <li>
                                <details open>
                                    <summary>
                                        <div className="icon-item">
                                            <img src="/assets/icons/framework.png" alt="Frameworks" className="icon"/>
                                            Фреймворки
                                        </div>
                                    </summary>
                                    <ul>
                                        <li>
                                            <div className="icon-item">
                                                <div className="icon-spin">
                                                    <img src="/assets/icons/react-native.png" alt="React"
                                                         className="icon spin-constant"/>
                                                </div>

                                                React
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon-item">
                                                <div className="icon-spin">
                                                    <img src="/assets/icons/vue.png" alt="Vue"
                                                         className="icon spin-constant"/>
                                                </div>
                                                Vue
                                            </div>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            <li>
                                <details open>
                                    <summary>
                                        <div className="icon-item">

                                            <img src="/assets/icons/state.png" alt="Libraries" className="icon"/>
                                            Библиотеки управления состоянием
                                        </div>
                                    </summary>
                                    <ul>
                                        <li>
                                            <div className="icon-item">
                                                <div className="icon-spin">
                                                    <img src="/assets/icons/redux.png" alt="Redux"
                                                         className="icon spin-constant"/>
                                                </div>
                                                Redux
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon-item">
                                                <div className="icon-spin">
                                                    <img src="/assets/icons/vue.png" alt="Vuex"
                                                         className="icon spin-constant"/>
                                                </div>
                                                Vuex
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon-item">
                                                <div className="icon-spin">
                                                    <img src="/assets/icons/pinias.png" alt="Languages"
                                                         className="icon spin-constant"/>
                                                </div>
                                                Pinia
                                            </div>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            <li>
                                <details open>
                                    <summary>
                                        <div className="icon-item">
                                            <img src="/assets/icons/markup.png" alt="Styles" className="icon"/>
                                            Стили и разметка
                                        </div>
                                    </summary>
                                    <ul>
                                        <li>
                                            <div className="icon-item">
                                                <div className="icon-spin">
                                                    <img src="/assets/icons/css3.png" alt="CSS"
                                                         className="icon spin-constant"/>
                                                </div>
                                                CSS
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon-item">
                                                <div className="icon-spin">
                                                    <img src="/assets/icons/sass.png" alt="SCSS"
                                                         className="icon spin-constant"/>
                                                </div>
                                                SCSS/SASS
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon-item">
                                                <div className="icon-spin">
                                                    <img src="/assets/icons/html5.png" alt="HTML"
                                                         className="icon spin-constant"/>
                                                </div>
                                                HTML
                                            </div>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </WindowWrapper>
    )
}