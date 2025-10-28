import {useAppDispatch} from "../redux/hooks.ts";
import {goToNextStep} from "../redux/guide-slice.ts";
import {LogoGithub} from "@carbon/icons-react";

export const StartScreen = () => {
    const dispatch = useAppDispatch();

    return (
        <div className={'bg-green bg-[url(/background.svg)] bg-repeat bg-[length:160px_160px] bg-move w-full h-screen'}>
            <div className={'container mx-auto max-w-screen-sm pt-12 h-full flex items-center'}>
                <div className={'p-8 bg-white rounded-3xl w-full'}>
                    <h1 className={'text-black font-source text-3xl font-bold'}>
                        Welcome to the IT decommissioning advisor!
                    </h1>
                    <p className={'font-normal font-inter text-md py-4'}>
                        This guide helps you make smarter, more sustainable choices when it comes to replacing or
                        keeping your IT hardware. By answering a few quick questions about performance, cost, and
                        sustainability, you’ll receive clear advice on whether to keep, refurbish, or replace your
                        devices. The goal is simple: to make responsible hardware decisions easier, more transparent,
                        and better for both your organization and the environment!
                    </p>
                    <button onClick={() => {
                        dispatch(goToNextStep())
                    }}
                            className={'text-2xl w-full bg-blue hover:bg-bluehover font-inter font-bold text-white px-8 py-4 rounded-xl'}>
                        Start Quick Scan
                    </button>
                </div>
            </div>
            <a href={'https://github.com/henkrehorst/rict-decision-guide'} target={'_blank'}
               className={'cursor-pointer absolute bottom-0 right-0 bg-white p-2 rounded-tl-3xl'}>
                <LogoGithub size={40}/>
            </a>
        </div>
    )
}