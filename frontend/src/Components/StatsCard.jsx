import React from 'react'
import Text from './Text';

const StatsCard = ({title, value, icon, trend, ColTrend, path}) => {
  return (
    <div className='p-6 rounded-3xl bg-white relative w-[25%] cursor-pointer shadow-[6px_6px_10px_0px_#0000000D]'>
        <div className='flex flex-col'>
            <Text text={title} fontSize="2.5vh" width="70%" color="#202224" fontWeight="300"/>
            <Text text={value} fontSize="4vh" fontWeight="500"/>
            <div className='flex gap-2 items-center' >
                <img src={path} alt="Path Icon" style={{width: "23px", height: "13px"}}/>
                <Text color="#00B69B" text={ColTrend} fontSize="2.4vh" fontWeight="500"/>
                <Text color="#606060" text={trend} width="fitContent" fontSize="2.4vh" fontWeight="400"/>
            </div>
        </div>
        <div className='absolute top-5 right-5 w-[20%]'>
            <img src={icon} alt="Logo" />
        </div>   
    </div>
  )
}

export default StatsCard; 