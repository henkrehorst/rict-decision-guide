import './App.css'
import {StartScreen} from "./screens/StartScreen.tsx";
import {useAppSelector} from "./redux/hooks.ts";
import {selectCurrentScreen} from "./redux/guide-slice.ts";
import {ScreenEnum} from "./types/enums/screen-enum.ts";
import {NonNegotiableScreen} from "./screens/NonNegotiableScreen.tsx";

function App() {
    const screen = useAppSelector(selectCurrentScreen);
    switch (screen) {
        case ScreenEnum.START:
            return <StartScreen/>;
        case ScreenEnum.SLIDER:
            return <NonNegotiableScreen/>;
        default:
            return <></>
    }
}

export default App
