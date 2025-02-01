
import Select from "react-select"
import { styles } from "../select/styles"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProgramAsOptions } from "../redux/actions/program"
import { monthOptions } from "../select/options"
import { getDepartment } from "../redux/actions/department"
const ClientsFilter = ({ program, setProgram, month, setMonth, salesPerson, setSalesPerson, phoneNumber, setPhoneNumber, name, setName }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProgramAsOptions())
        dispatch(getDepartment("sales"))
    }, [])

    const { programOptions } = useSelector(state => state.program)
    const { department } = useSelector(state => state.department)

    let departmentOptions = department && department.length > 0 && department.map((d) => ({
        value: d._id,
        label: d.name
    }))

    const clearFilters = () => {
        setProgram("")
        setMonth("")
        setSalesPerson("")
        setPhoneNumber("")
        setName("")
    }
    return (
        <div className="w-full bg-white p-[16px] rounded-lg">
            <form action="" className="w-full grid grid-cols-3 gap-[8px] !p-0">
                <label htmlFor="">
                    <span>Program</span>
                    <Select isClearable options={programOptions} value={program} onChange={setProgram} placeholder="Filter by Program" styles={styles} />
                </label>

                <label htmlFor="">
                    <span>Month</span>
                    <Select isClearable options={monthOptions} value={month} onChange={setMonth} placeholder="Filter by Month" styles={styles} />
                </label>

                <label htmlFor="">
                    <span>Sales Person</span>
                    <Select isClearable options={departmentOptions} value={salesPerson} onChange={setSalesPerson} placeholder="Filter by Sales Person" styles={styles} />
                </label>

                <label htmlFor="">
                    <span>Phone Number</span>
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="Filter by Phone Number" />
                </label>

                <label htmlFor="">
                    <span>Name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Filter by Phone Number" />
                </label>
            </form>

            <button onClick={clearFilters} className="primary-btn !w-fit text-sm !font-[400] !mt-[8px]">Clear Filters</button>
        </div>
    )
}

export default ClientsFilter
