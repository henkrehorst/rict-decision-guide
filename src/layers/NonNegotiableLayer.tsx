import {MenuBar} from "../components/menu-bar.tsx";
import {Radio, RadioGroup} from "@headlessui/react";
import {type FC, useState} from "react";
import type {NoNNegotiableQuestion} from "../types/config-types.ts";
import {cn} from "clsx-for-tailwind";
import {Checkmark, Close, CloseLarge, InformationFilled} from "@carbon/icons-react";
import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {
    selectIsNonNegotiableFactorsSelectionComplete,
    selectNonNegotiableFactors,
    setNonNegotiableFactorValue
} from "../redux/guide-slice.ts";
import {NextStepButton} from "../components/next-step-button.tsx";


export const NonNegotiableLayer: FC<{ config: NoNNegotiableQuestion }> = ({config}) => {
    const dispatch = useAppDispatch();
    const selectionComplete = useAppSelector(selectIsNonNegotiableFactorsSelectionComplete)
    const factors = useAppSelector(selectNonNegotiableFactors);
    const [showHelp, setShowHelp] = useState<boolean>(false)

    return (
        <>
            <MenuBar/>
            <div className={'mx-auto container max-w-screen-lg px-4'}>
                <div className={'m-4'}>
                    <h2 className={'font-inter font-bold text-4xl text-green'}>
                        {config.title}
                    </h2>
                    <h1 className={'mt-4 font-inter font-normal text-4xl text-black flex items-center'}>
                        <span>{config.question}</span>
                        {config.helpInformation &&
                            <InformationFilled onClick={() => {
                                setShowHelp(!showHelp)
                            }} className={'hover:text-green cursor-pointer size-[50px]'}/>
                        }
                    </h1>
                </div>
                {config.helpInformation && showHelp ?
                    <div className={'w-full bg-lightgreen rounded-md p-4 mb-4'}>
                        <h3 className={'font-inter font-bold text-black text-lg relative'}>
                            What is this about?
                            <Close className={'absolute right-0 top-0 cursor-pointer'} size={24}
                                   onClick={() => {
                                       setShowHelp(false)
                                   }}/>
                        </h3>
                        <p className={'font-inter font-normal text-black text-lg italic'}>
                            {config.helpInformation}
                        </p>
                    </div> : null
                }
                <div className={'w-full bg-green rounded-md flex gap-4 items-center p-4'}>
                    {config.tipIcon}
                    <p className={'font-inter font-normal italic text-lightgreen text-lg'}>
                        {config.tip}
                    </p>
                </div>
                <div className={'flex flex-col gap-8 mt-8 p-4'}>
                    {factors?.map((item, index) => (
                        <div key={index} className={'grid grid-cols-1 md:grid-cols-2 gap-4 items-center'}>
                            <p className={'font-inter text-3xl text-black text-left md:text-right'}>
                                {item.factor}
                            </p>
                            <div>
                                <RadioGroup className={"flex gap-4"} value={item.value} onChange={(value) => {
                                    dispatch(setNonNegotiableFactorValue({index: index, value: value}))
                                }}>
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
                        </div>
                    ))}
                </div>
                {selectionComplete &&
                    <NextStepButton/>
                }
            </div>
        </>
    )
}