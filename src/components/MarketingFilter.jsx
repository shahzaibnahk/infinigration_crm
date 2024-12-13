import React from 'react'
import Select from 'react-select'
import { styles } from '../select/styles'

const MarketingFilter = () => {
    return (
        <div className='w-full grid grid-cols-4 bg-white p-[16px] mt-[16px] rounded-lg gap-[8px]'>
            <label htmlFor="">
                <span>Tags</span>
                <Select styles={styles} placeholder='Filter By Tags' />
            </label>

            <label htmlFor="">
                <span>Employee</span>
                <Select styles={styles} placeholder='Filter By Employee' />
            </label>

            <label htmlFor="">
                <span>Date</span>
                <input type="date" />
            </label>

            <label htmlFor="">
                <span>Month</span>
                <Select styles={styles} placeholder='Filter By Month' />
            </label>

            <label htmlFor="">
                <span>Select Unassigned Leads</span>
                <Select styles={styles} className='Choose Ta' />
            </label>
        </div>
    )
}

export default MarketingFilter
