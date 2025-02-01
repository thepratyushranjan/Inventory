import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

const DetailedBtn = ({border, color}) => {
  return (
    <button style={{border, color}} className='flex items-center justify-center rounded-[3px] px-2 py-1'>
      <BsThreeDotsVertical className='w-4 h-4'/>
    </button>
  )
}

export default DetailedBtn