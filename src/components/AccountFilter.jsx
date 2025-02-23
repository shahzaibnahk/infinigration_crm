import React from 'react';
import Select from 'react-select';
import { styles } from '../select/styles';
import { accountTypes } from '../select/options';

const AccountFilter = ({ title, setTitle, type, setType }) => {

    // Function to clear filters
    const clearFilters = () => {
        setTitle("");
        setType({ value: "", label: "" });
    };

    return (
        <div className="w-full p-[16px] rounded-lg bg-white grid grid-cols-[1fr_1fr_120px] gap-[16px] items-end">
            <label htmlFor="">
                <span>Filter by Title</span>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Enter Title"
                />
            </label>

            <label htmlFor="">
                <span>Filter by Type</span>
                <Select
                    value={type}
                    onChange={setType}
                    options={accountTypes}
                    styles={styles}
                />
            </label>

            <button className='primary-btn !h-fit' onClick={clearFilters}>
                Clear Filters
            </button>
        </div>
    );
};

export default AccountFilter;
