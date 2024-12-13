import React from 'react'

const Stat = ({ number, title }) => {
    return (
        <div className='w-full bg-white p-[16px] rounded-lg flex items-center gap-[8px]'>
            {/* <div className='w-[70px] h-full bg-accent rounded-md'></div> */}
            <div>
                <p className='text-5xl font-semibold text-text'>{number}</p>
                <p className='text-sec-text text-sm'>{title}</p>
            </div>
        </div>
    )
}

export default Stat
