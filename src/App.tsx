import './App.css'
import {StartScreen} from "./layers/StartScreen.tsx";
import {useAppSelector} from "./redux/hooks.ts";
import {selectCurrentLayer} from "./redux/guide-slice.ts";
import {NonNegotiableLayer} from "./layers/NonNegotiableLayer.tsx";
import {GuideConfig} from "./GuideConfig.tsx";
import {LayersEnum} from "./types/config-types.ts";
import {ValueProfileLayer} from "./layers/ValueProfileLayer.tsx";
import {NegotiableTradeOffLayer} from "./layers/NegotiableTradeOffLayer.tsx";
import {RefurbishmentLayer} from "./layers/RefurbishmentLayer.tsx";
import {ResultsLayer} from "./layers/ResultsLayer.tsx";
import {NonNegotiableTradeOffLayer} from "./layers/NonNegotiableTradeOffLayer.tsx";

function App() {
    const currentLayer = useAppSelector(selectCurrentLayer);
    switch (currentLayer) {
        case LayersEnum.START:
            return <StartScreen/>;
        case LayersEnum.LAYER0:
            return <NonNegotiableLayer config={GuideConfig.nonNegotiableQuestion}/>;
        case LayersEnum.LAYER1:
            return <ValueProfileLayer config={GuideConfig.valueProfileQuestion}/>;
        case LayersEnum.LAYER15:
            return <NonNegotiableTradeOffLayer/>
        case LayersEnum.LAYER2:
            return <NegotiableTradeOffLayer questions={GuideConfig.negotiableTradeOffQuestions}/>
        case LayersEnum.LAYER3:
            return <RefurbishmentLayer/>
        case LayersEnum.END:
            return <ResultsLayer/>
        default:
            return <></>
    }
}

export default App
