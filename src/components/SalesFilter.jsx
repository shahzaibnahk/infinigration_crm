import React from 'react'
import Select from 'react-select'
import { styles } from '../select/styles'
import { salesFilterTags } from '../select/options'

const SalesFilter = () => {
    return (
        <div className="filter my-[16px] grid grid-cols-4 bg-white p-[16px] rounded-lg gap-[8px]">
            <label htmlFor="">
                <span>Tags</span>
                <Select options={salesFilterTags} placeholder="Filter by Tags" styles={styles} />
            </label>

            <label htmlFor="">
                <span>Date</span>
                <input type="date" />
            </label>

            <label htmlFor="">
                <span>Phone Number</span>
                <input type="text" placeholder='Filter by phone number' />
            </label>

            <label htmlFor="">
                <span>Name</span>
                <input type="text" placeholder='Filter by name' />
            </label>

            <button className='primary-btn !w-fit !text-sm !font-[400] !py-[10px]'>Reset Filters</button>

        </div>
    )
}

export default SalesFilter
