import { useEffect } from "react"
import Attendance from "../../components/Attendance"
import Stat from "../../components/Stat"
import { getFinanceStats } from "../../redux/actions/stats"
import moment from "moment-timezone"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../Loading"
import IncomeVsExpense from "../../components/IncomeVsExpense"
import ExpenseDoughnutChart from "../../components/ExpenseDoughtntChart"

const FinanceDashboard = () => {
    const dispatch = useDispatch()
    const { loading, financeStats } = useSelector(state => state.stats)
    const date = moment.tz("Asia/Karachi").format("YYYY-MM-DD")
    useEffect(() => {
        dispatch(getFinanceStats(date))
    }, [date])



    return (
        loading || !financeStats ? <Loading /> : <section className="">
            <Attendance />
            <div className="w-full bg-white p-[16px] rounded-lg h-[150px] flex justify-center items-center">
                <p className="w-[80%] text-center">
                    <i className="text-2xl">{financeStats.quote}</i>
                </p>
            </div>
            <div className="stats grid grid-cols-3 gap-[16px] mt-[16px]">
                <Stat number={financeStats.incomingsToday} title={"Incomings Today"} symbol={" PKR"} />
                <Stat number={financeStats.expensesToday} title={"Expenses Today"} symbol={" PKR"} />
                <Stat number={0} title={"Payments Received Today"} />
                <Stat number={financeStats.invoicesSent} title={"Invoices Sent"} />
                <Stat number={0} title={"Invoices Partially Paid"} />
                <Stat number={0} title={"Salary This Month"} />
            </div>

            <div className="graphs h-[450px] grid grid-cols-[2fr_1fr] gap-[16px] my-[16px]">
                <div className="w-full h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                    <IncomeVsExpense barChartData={financeStats.barChartData} />
                </div>
                <div className="h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center overflow-hidden">
                    <ExpenseDoughnutChart doughnutChartData={financeStats.doughnutChartData} />
                </div>
            </div>
        </section>
    )
}

export default FinanceDashboard
