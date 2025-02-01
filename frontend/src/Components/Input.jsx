import React from 'react'

const Input = ({lable, type, placeholder, border, width, accept}) => {
  return (
    <div className='flex flex-col gap-1 justify-center w-[30%]'>
        {lable && <lable className="text-base font-semibold">{lable}</lable>}
        <input style={{border, width}} className='focus:outline-none focus: border-none p-2 rounded-[4px] bg-white' type={type} id={type} placeholder={placeholder} accept={accept}/>
    </div>
  )
}

export default Input