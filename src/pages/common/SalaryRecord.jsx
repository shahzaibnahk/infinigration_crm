import { useEffect, useState } from "react";
import Stat from "../../components/Stat";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPayrollByEmployee } from "../../redux/actions/payroll";
import Loading from "../Loading";

const SalaryRecord = () => {
    const { user, isAuthenticated } = useSelector(state => state.user)
    const [active, setActive] = useState("all");
    const { id } = useParams();
    const dispatch = useDispatch();
    const location = useLocation()

    useEffect(() => {

        if (isAuthenticated && location.pathname.split("/").includes("salary_record")) {
            dispatch(getPayrollByEmployee(user._id));

        } else {
            dispatch(getPayrollByEmployee(id));
        }

    }, [dispatch, id, user]);

    const { payrollByEmployee, loading } = useSelector(state => state.payroll);

    let basicSalary = payrollByEmployee?.payroll?.basicSalary || 0;
    let commissions = payrollByEmployee?.payroll?.commissions || [];
    let deductions = payrollByEmployee?.payroll?.deductions || [];

    let totalCommission = commissions.reduce((c, a) => c + a.amount, 0);
    let totalDeductions = deductions.reduce((c, a) => c + a.amount, 0);
    let totalSalary = basicSalary + totalCommission - totalDeductions;

    let filteredData = [];
    if (active === "all") {
        filteredData = [...commissions.map(c => ({ ...c, type: "Commission" })),
        ...deductions.map(d => ({ ...d, type: "Deduction" }))];
    } else if (active === "commissions") {
        filteredData = commissions.map(c => ({ ...c, type: "Commission" }));
    } else if (active === "deductions") {
        filteredData = deductions.map(d => ({ ...d, type: "Deduction" }));
    }

    return (
        loading ? <Loading /> : <section>
            <div className="stats-row grid grid-cols-4 gap-[16px]">
                <Stat number={basicSalary} symbol={" PKR"} title={"Basic Salary"} />
                <Stat number={totalCommission} symbol={" PKR"} title={"Commission This Month"} />
                <Stat number={totalDeductions} symbol={" PKR"} title={"Deduction This Month"} />
                <Stat number={totalSalary} title={"Total Salary"} symbol={" PKR"} />
            </div>

            <div className="filter grid grid-cols-3 gap-[16px] mt-[16px]">
                {[{ value: "all", label: "All" },
                { value: "commissions", label: "Commissions" },
                { value: "deductions", label: "Deductions" }].map((o, index) => (
                    <button
                        onClick={() => setActive(o.value)}
                        key={index}
                        className={`${active === o.value ? "primary-btn" : "primary-btn !bg-white !text-text"}`}
                    >
                        {o.label}
                    </button>
                ))}
            </div>

            <table className="w-full mt-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <tr key={index} className="border">
                                <td className="border p-2">{item.date || "N/A"}</td>
                                <td className="border p-2">{item.amount} PKR</td>
                                <td className="border p-2">{item.type}</td>
                                <td className="border p-2">{item.remark || "No remarks"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default SalaryRecord;
