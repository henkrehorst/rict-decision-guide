import {ResponsiveRadar} from "@nivo/radar";
import {useState} from "react";
import {MenuBar} from "../components/menu-bar.tsx";
import {Sustainability} from "@carbon/icons-react";

export const RangeScreen = () => {
    const [cost, setCost] = useState(17);
    const [performance, setPerformance] = useState(17);
    const [sustainability, setSustainability] = useState(17);

    return (
        <>
            <MenuBar/>
            <div className={'mx-auto container max-w-screen-lg'}>
                <div className={'my-4'}>
                    <h2 className={'font-inter font-bold text-4xl text-green'}>
                        Non-negotiables
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
                <div className={'grid grid-cols-2 gap-4'}>
                    <div className={'p-4 flex flex-col gap-2'}>
                        <div>
                            <label htmlFor="cost-range"
                                   className="block mb-2 text-sm font-medium text-gray-900">Costs</label>
                            <input id="cost-range" type="range"
                                   min={0} max={99}
                                   value={cost}
                                   onChange={(e) => {
                                       setCost(Number(e.target.value));
                                   }}
                                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
                        </div>
                        <div>
                            <label htmlFor="performance-range"
                                   className="block mb-2 text-sm font-medium text-gray-900">Performance</label>
                            <input id="performance-range" type="range"
                                   min={0} max={99}
                                   value={performance}
                                   onChange={(e) => {
                                       setPerformance(Number(e.target.value));
                                   }}
                                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
                        </div>
                        <div>
                            <label htmlFor="sustainability-range"
                                   className="block mb-2 text-sm font-medium text-gray-900">Sustainability</label>
                            <input id="sustainability-range" type="range"
                                   min={0} max={99}
                                   value={sustainability}
                                   onChange={(e) => {
                                       setSustainability(Number(e.target.value));
                                   }}
                                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
                        </div>

                    </div>
                    <div className={'h-[60vh] w-full'}>
                        <ResponsiveRadar /* or Radar for fixed dimensions */
                            data={[{
                                'factor': 'costs',
                                'profile': cost,
                            },
                                {
                                    'factor': 'performance',
                                    'profile': performance,
                                },
                                {
                                    'factor': 'sustainability',
                                    'profile': sustainability,
                                }]}
                            keys={['profile']}
                            indexBy="factor"
                            margin={{top: 70, right: 80, bottom: 40, left: 80}}
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
        </>
    )
}