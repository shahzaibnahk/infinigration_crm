import { useDispatch, useSelector } from "react-redux"
import Attendance from "../../components/Attendance"
import Stat from "../../components/Stat"
import { useEffect } from "react"
import { getOperationsStats } from "../../redux/actions/stats"
import moment from "moment-timezone"
import Loading from "../Loading"
import ClientsBarChart from "../../components/ClientsBarChart"
import ProgramsSplitDoughntChart from "../../components/ProgramsSplitDoughntChart"


const OperationDashboard = () => {
    const date = moment.tz("Asia/Karachi").format("YYYY-MM-DD")
    const disptach = useDispatch()

    useEffect(() => {
        disptach(getOperationsStats(date))
    }, [date])

    const { operationStats, loading } = useSelector(state => state.stats)

    return (
        loading || !operationStats ? <Loading /> : <section className='w-full'>
            <Attendance />
            <div className="w-full bg-white p-[16px] rounded-lg h-[150px] flex justify-center items-center">
                <p className="w-[80%] text-center">
                    <i className="text-2xl">{operationStats.quote}</i>
                </p>
            </div>

            <div className="stats grid grid-cols-3 gap-[16px] mt-[16px]">
                <Stat number={operationStats.closedLeadsToday} title={"Closed Leads Today"} />
                <Stat number={operationStats.totalClients} title={"Total Clients"} />
                <Stat number={operationStats.totalPrograms} title={"Total Programs"} />
                <Stat number={operationStats.totalTemplates} title={"Total Templates"} />
                <Stat number={0} title={"Absentees Remaining This Month"} />
                <Stat number={0} title={"Salary This Month"} />
            </div>

            <div className="graphs h-[450px] grid grid-cols-[2fr_1fr] gap-[16px] my-[16px]">
                <div className="w-full h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                    <ClientsBarChart barChartData={operationStats.barChartData}/>
                </div>
                <div className="h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                    <ProgramsSplitDoughntChart doughnutChartData={operationStats.doughnutChartData}/>
                </div>
            </div>
        </section>
    )
}

export default OperationDashboard
