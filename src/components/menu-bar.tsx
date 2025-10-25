import {ArrowLeft} from "@carbon/icons-react";

export const MenuBar = () => {
    return (
        <>
            <div className={'absolute top-0 left-0 right-0'}>
                <div className={'w-full bg-white h-1'}>
                    <div className={'block h-1.5 bg-green'} style={{width: '33%'}}></div>
                </div>
                <div className={'w-full px-6 pt-4'}>
                    <button className={'bg-gray-300 p-2 rounded-3xl hover:bg-gray-200'}>
                        <ArrowLeft size={28} className={'fill-black'}/>
                    </button>
                </div>
            </div>
            <div className={'w-full h-16'}></div>
        </>
    )
}