import {useAppDispatch} from "../redux/hooks.ts";
import {setScreen} from "../redux/guide-slice.ts";
import {ScreenEnum} from "../types/enums/screen-enum.ts";

export const StartScreen = () => {
    const dispatch = useAppDispatch();

    return (
        <div className={'bg-green bg-[url(/background.svg)] bg-repeat bg-[length:160px_160px] bg-move w-full h-screen'}>
            <div className={'container mx-auto max-w-screen-sm pt-12 h-full flex items-center'}>
                <div className={'p-8 bg-white rounded-3xl w-full'}>
                    <h1 className={'text-black font-source text-3xl font-bold mb-16'}>THE IT DECOMMISSION ADVISOR</h1>
                    <button onClick={() => {
                        dispatch(setScreen({screen: ScreenEnum.SLIDER}))
                    }}
                            className={'text-2xl bg-blue hover:bg-bluehover font-inter font-bold text-white px-8 py-4 rounded-xl'}>
                        Start
                    </button>
                </div>
            </div>
        </div>
    )
}