import { useDispatch, useSelector } from 'react-redux'
import Stat from '../../components/Stat'
import { useEffect } from 'react'
import { getSalesStats } from '../../redux/actions/stats'
import moment from 'moment-timezone'
import Loading from '../Loading'
import AssignedLeadsCountBarChar from '../../components/AssignedLeadsCountBarChar'
import AssignedLeadsCountDoughnutChart from '../../components/AssignedLeadsCountDoughnutChart'
import Attendance from '../../components/Attendance'

const SalesDashboard = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSalesStats(moment.tz("Asia/Karachi").format("YYYY-MM-DD")))
    }, [])

    const { salesStats, loading } = useSelector(state => state.stats)

    return (
        loading || !salesStats ? <Loading /> : <section>
            <Attendance />
            <div className="w-full bg-white p-[16px] rounded-lg h-[150px] flex justify-center items-center">
                <p className="w-[80%] text-center">
                    <i className="text-2xl">{salesStats.quote}</i>
                </p>
            </div>

            <div className="stats grid grid-cols-3 gap-[16px] mt-[16px]">
                <Stat number={salesStats.assignedLeadsToday} title={"Assigned Leads Today"} />
                <Stat number={salesStats.shuffledLeadsToday} title={"Shuffled Leads Today"} />
                <Stat number={salesStats.returnedLeadsToday} title={"Returned Today"} />
                <Stat number={salesStats.clientsClosedThisMonth} title={"Clients Closed This Month"} />
                <Stat number={salesStats.absenteesRemainingThisMonth} title={"Absentees Remaining This Month"} />
                <Stat number={salesStats.salaryThisMonth} title={"Salary This Month"} />
            </div>

            <div className="graphs h-[450px] grid grid-cols-[2fr_1fr] gap-[16px] my-[16px]">
                <div className="w-full h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                    <AssignedLeadsCountBarChar lineChartData={salesStats?.lineChart || []} />
                </div>
                <div className="h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                    <AssignedLeadsCountDoughnutChart doughnutChartData={salesStats.doughnutChart} />
                </div>
            </div>


        </section>
    )
}

export default SalesDashboard
