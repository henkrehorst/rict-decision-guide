import {ResponsiveRadar} from "@nivo/radar";
import {type FC, useEffect, useState} from "react";
import {MenuBar} from "../components/menu-bar.tsx";
import {PillarEnum, type ValueProfileQuestion} from "../types/config-types.ts";
import {Tooltip} from "react-tooltip";
import {NextStepButton} from "../components/next-step-button.tsx";
import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {selectValueProfile, setValueProfile} from "../redux/guide-slice.ts";

export const ValueProfileLayer: FC<{ config: ValueProfileQuestion }> = ({config}) => {
    const [cost, setCost] = useState(0);
    const [performance, setPerformance] = useState(0);
    const [sustainability, setSustainability] = useState(0);
    const valueProfile = useAppSelector(selectValueProfile);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setCost(valueProfile[PillarEnum.COST]);
        setPerformance(valueProfile[PillarEnum.PERFORMANCE]);
        setSustainability(valueProfile[PillarEnum.SUSTAINABILITY]);
    }, []);

    useEffect(() => {
        dispatch(setValueProfile({
            [PillarEnum.PERFORMANCE]: performance,
            [PillarEnum.COST]: cost,
            [PillarEnum.SUSTAINABILITY]: sustainability
        }));
    }, [cost, performance, sustainability]);

    return (
        <>
            <MenuBar/>
            <div className={'mx-auto container max-w-screen-lg p-4'}>
                <div className={'my-4 mx-4'}>
                    <h2 className={'font-inter font-bold text-4xl text-green'}>
                        {config.title}
                    </h2>
                    <h1 className={'mt-4 font-inter font-normal text-4xl text-black'}>
                        {config.question}
                    </h1>
                </div>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-8'}>
                    <div className={'p-4 flex flex-col gap-6'}>
                        <div>
                            <label htmlFor="cost-range"
                                   className="block mb-4 text-xl font-bold font-inter text-gray-900">
                                {config.values[PillarEnum.COST].name} ({cost})
                            </label>
                            <div className={'flex'}>
                                <input id="cost-range" type="range"
                                       min={0} max={99 - (performance + sustainability)}
                                       style={{width: `${99 - (performance + sustainability) + 1}%`}}
                                       value={cost}
                                       onChange={(e) => {
                                           setCost(Number(e.target.value));
                                       }}
                                       className="w-full h-2 bg-green rounded-lg appearance-none cursor-pointer"/>
                                <span className={'bg-red h-2 rounded out-of-range'}
                                      style={{width: `${(performance + sustainability)}%`}}></span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="performance-range"
                                   className="block mb-4 text-xl font-bold font-inter text-gray-900">
                                {config.values[PillarEnum.PERFORMANCE].name} ({performance})
                            </label>
                            <div className={'flex'}>
                                <input id="performance-range" type="range"
                                       min={0} max={99 - (cost + sustainability)}
                                       style={{width: `${99 - (cost + sustainability) + 1}%`}}
                                       value={performance}
                                       onChange={(e) => {
                                           setPerformance(Number(e.target.value));
                                       }}
                                       className="w-full h-2 bg-green rounded-lg appearance-none cursor-pointer"/>
                                <span className={'bg-red h-2 rounded out-of-range'}
                                      style={{width: `${(cost + sustainability)}%`}}></span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="sustainability-range"
                                   className="block mb-4 text-xl font-bold font-inter text-gray-900">
                                {config.values[PillarEnum.SUSTAINABILITY].name} ({sustainability})
                            </label>
                            <div className={'flex'}>
                                <input id="sustainability-range" type="range"
                                       min={0} max={99 - (cost + performance)}
                                       style={{width: `${99 - (cost + performance) + 1}%`}}
                                       value={sustainability}
                                       onChange={(e) => {
                                           setSustainability(Number(e.target.value));
                                       }}
                                       className="w-full h-2 bg-green rounded-lg appearance-none cursor-pointer"/>
                                <span className={'bg-red h-2 rounded out-of-range'}
                                      style={{width: `${(cost + performance)}%`}}></span>
                            </div>
                        </div>
                        <h3 className={'font-normal font-inter italic text-xl'}>
                            {cost + performance + sustainability}/99 points assigned.
                            {cost + performance + sustainability < 99 ? ' Please assign up to 99.' : ''}</h3>
                    </div>
                    <div className={'w-full h-[400px] font-inter'}>
                        <ResponsiveRadar
                            data={[
                                {
                                    'factor': config.values[PillarEnum.COST].name,
                                    'Value Profile': cost,
                                },
                                {
                                    'factor': config.values[PillarEnum.PERFORMANCE].name,
                                    'Value Profile': performance,
                                },
                                {
                                    'factor': config.values[PillarEnum.SUSTAINABILITY].name,
                                    'Value Profile': sustainability,
                                }]}
                            keys={['Value Profile']}
                            indexBy="factor"
                            margin={{top: 40, right: 40, bottom: 40, left: 40}}
                            gridLabelOffset={36}
                            dotSize={10}
                            dotColor={{theme: 'background'}}
                            dotBorderWidth={2}
                            blendMode="multiply"
                            maxValue={99}
                        />
                    </div>
                    <Tooltip anchorSelect=".out-of-range" place="top" className={'font-inter'}>
                        All tokens are assigned, please give less priority to the other dimensions first
                    </Tooltip>
                </div>
                {cost + performance + sustainability >= 99 && <NextStepButton/>}
            </div>
        </>
    )
}