import {ArrowLeft, ArrowRight, Restart} from "@carbon/icons-react";
import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {
    goToNextStep,
    goToPreviousStep,
    resetState,
    selectIsNextStepPossible,
    selectProgress
} from "../redux/guide-slice.ts";

export const MenuBar = () => {
    const dispatch = useAppDispatch();
    const progress = useAppSelector(selectProgress);
    const nextStepPossible = useAppSelector(selectIsNextStepPossible)

    return (
        <>
            <div className={'absolute top-0 left-0 right-0'}>
                <div className={'w-full bg-white h-1'}>
                    <div className={'block h-1.5 bg-green'} style={{width: `${progress}%`}}></div>
                </div>
                <div className={'w-full px-6 pt-4 flex justify-between'}>
                    <button onClick={() => {
                        dispatch(goToPreviousStep())
                    }} className={'bg-gray-300 p-2 rounded-3xl hover:bg-gray-200'}>
                        <ArrowLeft size={28} className={'fill-black'}/>
                    </button>
                    <div className={'flex gap-2'}>
                        {nextStepPossible &&
                            <button onClick={() => {
                                dispatch(goToNextStep())
                            }} className={'bg-gray-300 p-2 rounded-3xl hover:bg-gray-200'}>
                                <ArrowRight size={28} className={'fill-black'}/>
                            </button>
                        }
                        <button onClick={() => {
                            dispatch(resetState())
                        }} className={'bg-gray-300 p-2 rounded-3xl hover:bg-gray-200'}>
                            <Restart size={28} className={'fill-black'}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={'w-full h-16'}></div>
        </>
    )
}