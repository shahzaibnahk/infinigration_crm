import React from 'react';
import Select from 'react-select';
import { styles } from '../select/styles';
import { accountTypes, expenseTags, incomeTags } from '../select/options';
import moment from 'moment-timezone';

const IncomeFilter = ({ filter, date, setDate, category, setCategory }) => {

    // Function to clear filters
    const clearFilters = () => {
        setDate(moment().tz("Asia/Karachi").format("YYYY-MM-DD"));
        setCategory({ value: "all", label: "All" });
    };

    return (
        <div className="w-full p-[16px] rounded-lg bg-white grid grid-cols-[1fr_1fr_120px] gap-[16px] items-end">
            <label htmlFor="">
                <span>Filter by Date</span>
                <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    placeholder="Enter Title"
                />
            </label>

            <label htmlFor="">
                <span>Filter by Category</span>
                <Select
                    value={category}
                    onChange={setCategory}
                    options={filter == "income" ? incomeTags : expenseTags}
                    styles={styles}
                />
            </label>

            <button className='primary-btn !h-fit' onClick={clearFilters}>
                Clear Filters
            </button>
        </div>
    );
};

export default IncomeFilter;
