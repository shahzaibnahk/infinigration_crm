import React from 'react'

const AccountStat = ({ icon: Icon, title, currency, amount }) => {
    return (
        <div className=' bg-white rounded-lg p-[16px] flex flex-col justify-between'>
            <div className='flex flex-col gap-[8px] mb-[16px]'>
                <Icon className='text-5xl font-semibold text-accent' />
                <p className='text-text'>{title}</p>
            </div>

            <p className='text-5xl text-text font-semibold uppercase'>{currency} {amount}</p>


        </div>
    )
}

export default AccountStat
