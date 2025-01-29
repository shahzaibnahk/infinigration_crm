
import Select from "react-select"
import { styles } from "../select/styles"
const ClientsFilter = ({ program, setProgram, month, setMonth, salesPerson, setSalesPerson, phoneNumber, setPhoneNumber, name, setName }) => {

    return (
        <div className="w-full bg-white p-[16px] rounded-lg">
            <form action="" className="w-full grid grid-cols-3 gap-[8px] !p-0">
                <label htmlFor="">
                    <span>Program</span>
                    <Select value={program} onChange={(option) => setProgram(option?.value)} placeholder="Filter by Program" styles={styles} />
                </label>

                <label htmlFor="">
                    <span>Month</span>
                    <Select value={month} onChange={(option) => setMonth(option?.value)} placeholder="Filter by Month" styles={styles} />
                </label>

                <label htmlFor="">
                    <span>Sales Person</span>
                    <Select value={salesPerson} onChange={(option) => setSalesPerson(option?.value)} placeholder="Filter by Sales Person" styles={styles} />
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

            <button className="primary-btn !w-fit text-sm !font-[400] !mt-[8px]">Clear Filters</button>
        </div>
    )
}

export default ClientsFilter
