import { useState } from "react"
import Stat from "../../components/Stat"

const SalaryRecord = () => {
    const [active, setActive] = useState("all")
    return (
        <section>
            <div className="stats-row grid grid-cols-4 gap-[16px]">
                <Stat number={0} title={"Basic Salary"} />
                <Stat number={0} title={"Commission This Month"} />
                <Stat number={0} title={"Deduction This Month"} />
                <Stat number={0} title={"Total Salary"} />
            </div>
            <div className="filter grid grid-cols-3 gap-[16px] mt-[16px]">
                {[{ value: "all", label: "All" },
                { value: "commissions", label: "Commissions" },
                { value: "deductions", label: "Deductions" }].map((o, index) =>
                    <button onClick={() => setActive(o.value)} key={index} className={`${active === o.value ? "primary-btn" : "primary-btn !bg-white !text-text"}`}>{o.label}</button>)}

            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Remark</th>
                    </tr>
                </thead>
            </table>
        </section>
    )
}

export default SalaryRecord
