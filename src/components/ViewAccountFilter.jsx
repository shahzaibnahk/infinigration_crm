import React from 'react'
import Select from 'react-select'
import { styles } from '../select/styles'
import { accountFilterTags, accountTypeFilter } from '../select/options'

const ViewAccountFilter = ({ type, setType, tag, setTag }) => {
    return (
        <div className="filter w-full bg-white p-[16px] rounded-lg my-[16px] grid grid-cols-2 gap-[16px]">
            <label htmlFor="">
                <span>Filter By Type</span>
                <Select value={type} onChange={setType} options={accountTypeFilter} placeholder="Choose Type" styles={styles} isClearable />
            </label>

            <label htmlFor="">
                <span>Filter By Tags</span>
                <Select value={tag} onChange={setTag} options={accountFilterTags} placeholder="Choose Type" styles={styles} />
            </label>


        </div>
    )
}

export default ViewAccountFilter
