import './App.css'
import {StartScreen} from "./layers/StartScreen.tsx";
import {useAppSelector} from "./redux/hooks.ts";
import {selectCurrentLayer} from "./redux/guide-slice.ts";
import {NonNegotiableLayer} from "./layers/NonNegotiableLayer.tsx";
import {GuideConfig} from "./GuideConfig.tsx";
import {LayersEnum} from "./types/config-types.ts";
import {ValueProfileLayer} from "./layers/ValueProfileLayer.tsx";

function App() {
    const currentLayer = useAppSelector(selectCurrentLayer);
    switch (currentLayer) {
        case LayersEnum.START:
            return <StartScreen/>;
        case LayersEnum.LAYER0:
            return <NonNegotiableLayer config={GuideConfig.nonNegotiableQuestion}/>;
        case LayersEnum.LAYER1:
            return <ValueProfileLayer config={GuideConfig.valueProfileQuestion}/>;
        default:
            return <></>
    }
}

export default App
