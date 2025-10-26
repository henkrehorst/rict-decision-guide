import {MenuBar} from "../components/menu-bar.tsx";
import {type FC, useEffect, useState} from "react";
import type {NegotiableTradeOffQuestion} from "../types/config-types.ts";
import {NextStepButton} from "../components/next-step-button.tsx";
import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {
    selectCurrentTradeOffQuestionValue,
    selectTradeoffQuestionIndex,
    setTradeOffQuestionValue
} from "../redux/guide-slice.ts";
import {Radio, RadioGroup} from "@headlessui/react";
import {cn} from "clsx-for-tailwind";
import {ThumbsDown, ThumbsUp, Unknown} from "@carbon/icons-react";

export const NegotiableTradeOffLayer: FC<{ questions: Array<NegotiableTradeOffQuestion> }> = ({questions}) => {
    const questionIndex = useAppSelector(selectTradeoffQuestionIndex);
    const currentValue = useAppSelector(selectCurrentTradeOffQuestionValue);
    const dispatch = useAppDispatch();
    const [optionValue, setOptionValue] = useState<null | string>(null);

    useEffect(() => {
        if (currentValue !== undefined) {
            setOptionValue(String(currentValue));
        } else {
            setOptionValue(null);
        }
    }, [questionIndex]);

    useEffect(() => {
        dispatch(setTradeOffQuestionValue({
            index: questionIndex,
            value: Number(optionValue)
        }));
    }, [optionValue]);

    return (
        <>
            <MenuBar/>
            <div className={'mx-auto container max-w-screen-lg px-4'}>
                <div className={'m-4'}>
                    <h2 className={'font-inter font-bold text-4xl text-green'}>
                        {questions[questionIndex].title}
                    </h2>
                    <h1 className={'mt-4 font-inter font-normal text-4xl text-black'}>
                        {questions[questionIndex].question}
                    </h1>
                </div>
                <div className={'mt-8 p-4'}>
                    <RadioGroup className={"grid grid-cols-1 md:flex gap-4"} value={optionValue}
                                onChange={setOptionValue}>
                        <Radio
                            value={"1"}
                            className="group"
                        >
                            <button className={cn(
                                'flex gap-2 font-inter items-center text-black text-3xl py-2 px-4 rounded-xl bg-gray-200',
                                'border-gray-200 hover:text-red hover:border-red border-2',
                                'group-aria-checked:bg-red group-aria-checked:text-white group-aria-checked:border-red')}>
                                <span>Insufficient</span>
                                <ThumbsDown size={40} className={'fill-current'}/>
                            </button>
                        </Radio>
                        <Radio
                            value={"2"}
                            className="group"
                        >
                            <button className={cn(
                                'flex gap-2 font-inter items-center text-black text-3xl py-2 px-4 rounded-xl bg-gray-200',
                                'border-gray-200 hover:text-orange-500 hover:border-orange-500 border-2',
                                'group-aria-checked:bg-orange-500 group-aria-checked:text-white group-aria-checked:border-orange-500')}>
                                <span>Adequate</span>
                                <ThumbsUp size={40} className={'fill-current -rotate-90'}/>
                            </button>
                        </Radio>
                        <Radio
                            value={"3"}
                            className="group"
                        >
                            <button className={cn(
                                'flex gap-2 font-inter items-center text-black text-3xl py-2 px-4 rounded-xl bg-gray-200',
                                'border-gray-200 hover:text-correctGreen hover:border-correctGreen border-2',
                                'group-aria-checked:bg-correctGreen group-aria-checked:text-white group-aria-checked:border-correctGreen')}>
                                <span>Excellent</span>
                                <ThumbsUp size={40} className={'fill-current'}/>
                            </button>
                        </Radio>
                        <Radio
                            value={"0"}
                            className="group"
                        >
                            <button className={cn(
                                'flex gap-2 font-inter items-center text-black text-3xl py-2 px-4 rounded-xl bg-gray-200',
                                'border-gray-200 hover:text-black hover:border-black border-2',
                                'group-aria-checked:bg-black group-aria-checked:text-white group-aria-checked:border-black')}>
                                <span>Unknown</span>
                                <Unknown size={40} className={'fill-current'}/>
                            </button>
                        </Radio>
                    </RadioGroup>
                </div>
                {optionValue !== null &&
                    <NextStepButton/>
                }
            </div>
        </>
    )
}