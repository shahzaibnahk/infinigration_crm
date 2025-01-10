import { useEffect } from 'react'
import Select from 'react-select'
import { styles } from '../select/styles'
import { useParams } from 'react-router-dom'
import { freshLeadsOptions, monthOptions, returnedLeadOptions } from '../select/options'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartment } from '../redux/actions/department'
import moment from 'moment-timezone'

const MarketingFilter = ({ date, setDate, tag, setTag, employee, setEmployee, month, setMonth, unassignedLimit, setUnassignedLimit }) => {
    const { id } = useParams();
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getDepartment("sales"));
    }, []);

    const { department } = useSelector(state => state.department);

    const employeeOptions = department && department.length > 0 && department.map((e) => ({
        value: e._id,
        label: e.name
    }));

    const resetFilters = () => {
        setDate(moment.tz("Asia/Karachi").format("YYYY-MM-DD"));
        setTag({value: "all", label: "All Leads"});
        setEmployee("");
        setMonth("");
        setUnassignedLimit("");
    };

    return (
        <div className='w-full grid grid-cols-4 bg-white p-[16px] mt-[16px] rounded-lg gap-[8px]'>
            <label htmlFor="">
                <span>Tags</span>
                <Select
                    options={freshLeadsOptions}
                    value={freshLeadsOptions.find((option) => option.value === tag)}
                    onChange={(selectedOption) => setTag(selectedOption.value)}
                    styles={styles}
                    placeholder="Filter By Tags"
                />
            </label>

            <label htmlFor="">
                <span>Employee</span>
                <Select
                    options={employeeOptions} // List of employees
                    value={employeeOptions && employeeOptions.length > 0 && employeeOptions.find((option) => option.value === employee)}
                    onChange={(selectedOption) => setEmployee(selectedOption.value)}
                    styles={styles}
                    placeholder="Filter By Employee"
                />
            </label>

            <label htmlFor="">
                <span>Date</span>
                <input value={date} onChange={(e) => setDate(e.target.value)} type="date" />
            </label>

            <label htmlFor="">
                <span>Month</span>
                <Select
                    options={monthOptions}
                    value={monthOptions.find((option) => option.value === month)}
                    onChange={(selectedOption) => setMonth(selectedOption)}
                    styles={styles}
                    placeholder="Filter By Month"
                />
            </label>

            <label htmlFor="">
                <span>Select Unassigned Leads</span>
                <input
                    type="number"
                    value={unassignedLimit}
                    onChange={(e) => setUnassignedLimit(Number(e.target.value))}
                    placeholder="Enter unassigned leads limit"
                />
            </label>

            <button onClick={resetFilters} className='primary-small-btn col-span-4'>
                Reset Filters
            </button>
        </div>
    );
};

export default MarketingFilter;

