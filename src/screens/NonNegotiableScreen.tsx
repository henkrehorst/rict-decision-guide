import {MenuBar} from "../components/menu-bar.tsx";
import {Sustainability} from "@carbon/icons-react";
import {Field, Radio, RadioGroup} from "@headlessui/react";
import {useState} from "react";

export const NonNegotiableScreen = () => {
    const [selected, setSelected] = useState<string|undefined>(undefined);
    return (
        <>
            <MenuBar/>
            <div className={'mx-auto container max-w-screen-lg'}>
                <div className={'m-4'}>
                    <h2 className={'font-inter font-bold text-4xl text-green'}>
                        Non-negotiable
                    </h2>
                    <h1 className={'mt-4 font-inter font-normal text-4xl text-black'}>
                        Specify here which factors you consider non-negotiable in your organization
                    </h1>
                </div>
                <div className={'w-full bg-green rounded-md flex gap-4 items-center p-4'}>
                    <Sustainability size={28} className={'fill-lightgreen'}/>
                    <p className={'font-inter font-normal italic text-lightgreen text-lg'}>
                        Remember: less non-negotiable factors will result in more sustainable choices
                    </p>
                </div>
                <div className={'flex flex-col gap-4 mt-8'}>
                    <div className={'grid grid-cols-2 gap-4'}>
                        <p className={'font-inter text-3xl text-black text-right'}>
                            Depreciation
                        </p>
                        <div>
                            <RadioGroup value={selected} onChange={setSelected}>
                                <Field>
                                    <Radio value="no">
                                        No
                                    </Radio>
                                </Field>
                                <Field>
                                    <Radio value="yes">
                                        Yes
                                    </Radio>
                                </Field>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className={'grid grid-cols-2 gap-4'}>
                        <p className={'font-inter text-3xl text-black text-right'}>
                            Warranty
                        </p>
                    </div>
                    <div className={'grid grid-cols-2 gap-4'}>
                        <p className={'font-inter text-3xl text-black text-right'}>
                            Functional obsolesance
                        </p>
                    </div>
                    <div className={'grid grid-cols-2 gap-4'}>
                        <p className={'font-inter text-3xl text-black text-right'}>
                            Security
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}