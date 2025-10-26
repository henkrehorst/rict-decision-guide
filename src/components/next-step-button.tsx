import type {FC} from "react";
import {ArrowRight} from "@carbon/icons-react";
import {useAppDispatch} from "../redux/hooks.ts";
import {goToNextStep} from "../redux/guide-slice.ts";

export const NextStepButton: FC = () => {
    const dispatch = useAppDispatch();

    return (
        <button
            onClick={() => {dispatch(goToNextStep())}}
            className={'flex justify-between w-full mt-32 hover:bg-bluehover bg-blue text-2xl font-bold text-white font-inter py-4 px-8 rounded-xl'}>
            <span>Go to next step</span>
            <ArrowRight className={'fill-current'} size={32} />
        </button>
    )
}