import 'xp.css'
import './styles/globals.css'

import { Taskbar } from "./components/Taskbar.tsx";
import {Desktop} from "./desctop/Desktop.tsx";
import {MyComputer} from "./windows/MyComputerWindow.tsx";

export default function App() {

    return (
        <>
            <Desktop/>
            <Taskbar/>

            <MyComputer />
        </>
    );
}
