import {MenuBar} from "../components/menu-bar.tsx";
import {useAppSelector} from "../redux/hooks.ts";
import {
    selectAdvice,
    selectLayerBeforeEndScreen,
    selectNonNegotiableFactors,
    selectValueProfile
} from "../redux/guide-slice.ts";
import {ResultEnum} from "../types/enums/result-enum.ts";
import {
    Checkmark,
    CloseLarge,
    Collaborate,
    IbmDataProductExchange,
    ListChecked,
    ToolKit,
    UserProfile
} from "@carbon/icons-react";
import {LayersEnum, PillarEnum, PriorityEnum} from "../types/config-types.ts";
import {GuideConfig} from "../GuideConfig.tsx";
import {ResponsiveRadar} from "@nivo/radar";

export const ResultsLayer = () => {
    const advice = useAppSelector(selectAdvice);
    const nonNegotiableFactors = useAppSelector(selectNonNegotiableFactors);
    const layerBefore = useAppSelector(selectLayerBeforeEndScreen);
    const valueProfile = useAppSelector(selectValueProfile);

    return <>
        <MenuBar/>
        <div className={'mx-auto container max-w-screen-lg p-4'}>
            <div className={'mt-4 mb-10 mx-4'}>
                <h2 className={'font-inter font-bold text-4xl text-black'}>
                    Hardware Decommissioning Advice
                </h2>
            </div>
            <div className={'grid grid-cols-2 gap-4 px-4'}>
                {advice == ResultEnum.REPLACE &&
                    <div className={'bg-red font-inter px-6 py-6 rounded-3xl'}>
                        <h1 className={'font font-bold text-white text-2xl mb-4 flex gap-2 items-center'}>
                            <IbmDataProductExchange size={32} className={'fill-current'}/>
                            <span>Replace your hardware</span>
                        </h1>
                        <p className={'font-normal text-md text-white'}>
                            Plan a replacement. Document which non-negotiables or thresholds failed and why
                            refurbishment was rejected. Take this into account during procurement. Schedule
                            decommissioning to minimize downtime and ensure responsible recycling or reuse, and capture
                            lessons learned.
                        </p>
                    </div>
                }
                {advice == ResultEnum.REFURBISHMENT &&
                    <div className={'bg-orange-500 font-inter px-6 py-6 rounded-3xl'}>
                        <h1 className={'font font-bold text-white text-2xl mb-4 flex gap-2 items-center'}>
                            <ToolKit size={32} className={'fill-current'}/>
                            <span>Keep & Refurbish your hardware</span>
                        </h1>
                        <p className={'font-normal text-md text-white'}>
                            Keep the asset and execute the refurbishment actions within a reasonable timeframe. Verify
                            the
                            refurbishment lifts each failed pillar to at least its L0-informed threshold for ~12 months.
                            Update the CMDB, warranties/support status, and monitor performance closely. Re-evaluate in
                            one
                            year, or earlier if targets are not met.
                        </p>
                    </div>
                }
                {advice == ResultEnum.KEEP &&
                    <div className={'bg-green font-inter px-6 py-6 rounded-3xl'}>
                        <h1 className={'font font-bold text-white text-2xl mb-4 flex gap-2 items-center'}>
                            <Checkmark size={32} className={'fill-current'}/>
                            <span>Keep your hardware</span>
                        </h1>
                        <p className={'font-normal text-md text-white'}>
                            Plan a replacement. Document which non-negotiables or thresholds failed and why
                            refurbishment
                            was rejected. Take this into account during procurement. Schedule decommissioning to
                            minimize
                            downtime and ensure responsible recycling or reuse, and capture lessons learned.
                        </p>
                    </div>
                }
                <div className={'bg-gray-100 font-inter px-6 py-6 rounded-3xl'}>
                    <h1 className={'font font-bold text-black text-2xl mb-4 flex gap-4 items-center'}>
                        <ListChecked size={32} className={'fill-current'}/>
                        <span>Non-negotiable factors</span>
                    </h1>
                    <p className={'font-normal text-sm italic text-black mb-4'}>
                        If one or more factors are non-negotiable, the hardware must always be replaced, or it should be
                        discussed further whether the factor is truly non-negotiable.
                    </p>
                    {nonNegotiableFactors.map((item, index) => (
                        <div key={index} className={'grid grid-cols-2 gap-4 mt-2 items-center'}>
                            <p className={'text-md font-inter font-bold text-right'}>{item.factor}</p>
                            {item.value === "true" ?
                                <p className={'text-md text-white bg-green font-inter font-bold text-left w-20 p-2 rounded-xl inline-flex justify-between  items-center'}>
                                    Yes
                                    <Checkmark size={20} className={'fill-current'}/>
                                </p>
                                :
                                <p className={'text-md text-white bg-red font-inter font-bold text-left w-20 p-2 rounded-xl inline-flex justify-between items-center'}>
                                    No
                                    <CloseLarge size={20} className={'fill-current'}/>
                                </p>
                            }
                        </div>
                    ))}
                </div>
            </div>
            {layerBefore === LayersEnum.LAYER1 || layerBefore === LayersEnum.LAYER2 &&
                <>
                    <div className={'mx-4 bg-gray-100 font-inter px-6 py-6 rounded-3xl mt-4'}>
                        <h1 className={'font font-bold text-black text-2xl mb-4 flex gap-4 items-center'}>
                            <UserProfile size={32} className={'fill-current'}/>
                            <span>Your value profile</span>
                        </h1>
                        <div className={'grid grid-cols-1 md:grid-cols-2'}>
                            <div className={'items-center'}>
                                <p className={'font-normal text-sm italic text-black mb-4'}>
                                    Your value profile is used to identify which pillars hold the highest priority for
                                    you
                                    in the
                                    context of hardware replacement. The scores you assign are categorized as follows:
                                    LOW
                                    ({GuideConfig.priorityRange[PriorityEnum.LOW].min}-{GuideConfig.priorityRange[PriorityEnum.LOW].max}),
                                    MEDIUM
                                    ({GuideConfig.priorityRange[PriorityEnum.MEDIUM].min}-{GuideConfig.priorityRange[PriorityEnum.MEDIUM].max}),
                                    and HIGH
                                    ({GuideConfig.priorityRange[PriorityEnum.HIGH].min}-{GuideConfig.priorityRange[PriorityEnum.HIGH].max})
                                    for each pillar.
                                </p>
                                {Object.keys(valueProfile).map((name, index) => (
                                    <div key={index} className={'grid grid-cols-2 gap-4 mt-2 items-center'}>
                                        <p className={'text-md font-inter font-bold text-right'}>
                                            {GuideConfig.valueProfileQuestion.values[name as PillarEnum].name}
                                        </p>
                                        {GuideConfig.priorityRange[PriorityEnum.LOW].max >= valueProfile[name as PillarEnum] ?
                                            <p className={'text-md text-white bg-green font-inter font-bold text-left w-40 p-2 rounded-xl inline-flex justify-between  items-center'}>
                                                LOW ({valueProfile[name as PillarEnum]})
                                            </p>
                                            : GuideConfig.priorityRange[PriorityEnum.MEDIUM].max >= valueProfile[name as PillarEnum] ?
                                                <p className={'text-md text-white bg-orange-500 font-inter font-bold text-left w-40 p-2 rounded-xl inline-flex justify-between items-center'}>
                                                    MEDIUM ({valueProfile[name as PillarEnum]})
                                                </p>
                                                :
                                                <p className={'text-md text-white bg-red font-inter font-bold text-left w-40 p-2 rounded-xl inline-flex justify-between items-center'}>
                                                    HIGH ({valueProfile[name as PillarEnum]})
                                                </p>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className={'w-full h-[400px] font-inter'}>
                                <ResponsiveRadar
                                    data={[
                                        {
                                            'factor': GuideConfig.valueProfileQuestion.values[PillarEnum.COST].name,
                                            'Value Profile': valueProfile[PillarEnum.COST],
                                        },
                                        {
                                            'factor': GuideConfig.valueProfileQuestion.values[PillarEnum.PERFORMANCE].name,
                                            'Value Profile': valueProfile[PillarEnum.PERFORMANCE],
                                        },
                                        {
                                            'factor': GuideConfig.valueProfileQuestion.values[PillarEnum.SUSTAINABILITY].name,
                                            'Value Profile': valueProfile[PillarEnum.SUSTAINABILITY],
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
                        </div>
                    </div>
                    <div className={'mx-4 bg-gray-100 font-inter px-6 py-6 rounded-3xl mt-4'}>
                        <h1 className={'font font-bold text-black text-2xl mb-4 flex gap-4 items-center'}>
                            <Collaborate size={32} className={'fill-current'}/>
                            <span>Negotiable Questions</span>
                        </h1>
                        <p className={'font-normal text-sm italic text-black mb-4'}>
                            The negotiable questions help evaluate whether each pillar continues to meet the criteria
                            necessary to maintain its value classification. Using the average score per pillar and its
                            assigned priority, the system determines whether the hardware should be kept or
                            replaced. The priority level defines the threshold for retention as follows: <span className={'font-bold'}>LOW
                            ≥ {GuideConfig.decisionThresholds[PriorityEnum.LOW]},
                            MEDIUM ≥ {GuideConfig.decisionThresholds[PriorityEnum.MEDIUM]}, and HIGH
                            ≥ {GuideConfig.decisionThresholds[PriorityEnum.HIGH]}</span>.
                        </p>
                    </div>
                </>
            }
        </div>
    </>
}