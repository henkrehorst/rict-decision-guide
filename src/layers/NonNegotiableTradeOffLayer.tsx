import {MenuBar} from "../components/menu-bar.tsx";
import {Radio, RadioGroup} from "@headlessui/react";
import {type FC, useEffect, useState} from "react";
import {cn} from "clsx-for-tailwind";
import {Checkmark, Close, CloseLarge, InformationFilled} from "@carbon/icons-react";
import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {
    selectCurrentNonNegotiableTradeQuestionAnswer,
    selectCurrentNonNegotiableTradeQuestionIndex, selectNonNegotiableQuestions,
    setNonNegotiableTradeQuestionValue
} from "../redux/guide-slice.ts";
import {NextStepButton} from "../components/next-step-button.tsx";

export const NonNegotiableTradeOffLayer: FC = () => {
    const dispatch = useAppDispatch();
    const questions = useAppSelector(selectNonNegotiableQuestions);
    const currentValue = useAppSelector(selectCurrentNonNegotiableTradeQuestionAnswer);
    const [optionValue, setOptionValue] = useState<string>("-1");
    const currentIndex = useAppSelector(selectCurrentNonNegotiableTradeQuestionIndex);
    const [showHelp, setShowHelp] = useState<boolean>(false);


    useEffect(() => {
        setShowHelp(false);
        if (currentValue !== undefined) {
            setOptionValue(String(currentValue.value));
        } else {
            setOptionValue("-1");
        }
    }, [currentIndex]);

    useEffect(() => {
        let value: -1 | boolean = -1;
        if (optionValue === "false") {
            value = false;
        } else if (optionValue === "true") {
            value = true;
        }

        dispatch(setNonNegotiableTradeQuestionValue({
            index: currentValue.index,
            value: value,
            factor: questions[currentIndex].factor
        }));
    }, [optionValue]);

    return (
        <>
            <MenuBar/>
            <div className={'mx-auto container max-w-screen-lg px-4'}>
                <div className={'m-4'}>
                    <h2 className={'font-inter font-bold text-4xl text-green'}>
                        {questions[currentIndex].title}
                    </h2>
                    <h1 className={'mt-4 font-inter font-normal text-4xl text-black flex items-center'}>
                        {questions[currentIndex].question}
                        {questions[currentIndex].helpInformation &&
                            <InformationFilled onClick={() => {
                                setShowHelp(!showHelp)
                            }} className={'hover:text-green cursor-pointer size-[50px]'}/>
                        }
                    </h1>
                </div>
                {questions[currentIndex].helpInformation && showHelp ?
                    <div className={'w-full bg-lightgreen rounded-md p-4 mb-4'}>
                        <h3 className={'font-inter font-bold text-black text-lg relative'}>
                            What is this about?
                            <Close className={'absolute right-0 top-0 cursor-pointer'} size={24}
                                   onClick={() => {
                                       setShowHelp(false)
                                   }}/>
                        </h3>
                        <p className={'font-inter font-normal text-black text-lg italic'}>
                            {questions[currentIndex].helpInformation}
                        </p>
                    </div> : null
                }
                <div className={'mt-8 p-4'}>
                    <RadioGroup className={"flex flex-col md:flex-row flex-wrap gap-4"} value={optionValue}
                                onChange={setOptionValue}>
                        <Radio
                            value={"true"}
                            className="group"
                        >
                            <button className={cn(
                                'flex gap-2 font-inter items-center text-black text-3xl py-2 px-4 rounded-xl bg-gray-200',
                                'border-gray-200 hover:text-correctGreen hover:border-correctGreen border-2',
                                'group-aria-checked:bg-correctGreen group-aria-checked:text-white group-aria-checked:border-correctGreen')}>
                                <span>Yes</span>
                                <Checkmark size={40} className={'fill-current'}/>
                            </button>
                        </Radio>
                        <Radio
                            value={"false"}
                            className="group"
                        >
                            <button className={cn(
                                'flex gap-2 font-inter items-center text-black text-3xl py-2 px-4 rounded-xl bg-gray-200',
                                'border-gray-200 hover:text-red hover:border-red border-2',
                                'group-aria-checked:bg-red group-aria-checked:text-white group-aria-checked:border-red')}>
                                <span>No</span>
                                <CloseLarge size={40} className={'fill-current'}/>
                            </button>
                        </Radio>
                    </RadioGroup>
                </div>
                {optionValue !== "-1" &&
                    <NextStepButton/>
                }
            </div>
        </>
    )
}