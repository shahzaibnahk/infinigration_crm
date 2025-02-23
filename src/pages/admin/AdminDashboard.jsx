import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFinanceStats, getMarketingStats, getOperationsStats } from "../../redux/actions/stats"
import Stat from "../../components/Stat"
import LeadsCountBarChart from "../../components/LeadsCountBarChart"
import LeadSourcesDoughntChart from "../../components/LeadSourcesDoughntChart"
import ClientsBarChart from "../../components/ClientsBarChart"
import ProgramsSplitDoughntChart from "../../components/ProgramsSplitDoughntChart"
import moment from "moment-timezone"
import Loading from "../Loading"
import IncomeVsExpense from "../../components/IncomeVsExpense"
import ExpenseDoughnutChart from "../../components/ExpenseDoughtntChart"

const AdminDashboard = () => {
    const { marketingStats, loading } = useSelector(state => state.stats)
    const date = moment.tz("Asia/Karachi").format("YYYY-MM-DD")

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMarketingStats())
    }, [])


    useEffect(() => {
        dispatch(getOperationsStats(date))
    }, [date])

    const { operationStats, loading: oLoading } = useSelector(state => state.stats)


    const { loading: fLoading, financeStats } = useSelector(state => state.stats)

    useEffect(() => {
        dispatch(getFinanceStats(date))
    }, [date])

    return (
        <section className="w-full flex flex-col relative">
            {loading || !marketingStats ? < Loading /> :
                <div>
                    <h2>Marketing Stats</h2>
                    <div className="stats grid grid-cols-3 gap-[8px] mt-[16px]">
                        <Stat number={marketingStats?.stats?.totalLeadsToday} title={"Total Leads Today"} />
                        <Stat number={marketingStats?.stats?.assignedLeadsToday} title={"Assigned Leads Today"} />
                        <Stat number={marketingStats?.stats?.unAssignedLeadsToday} title={"Unassigned Leads Today"} />
                    </div>

                    <div className="graphs h-[450px] grid grid-cols-[2fr_1fr] gap-[8px] my-[8px]">
                        <div className="w-full h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                            <LeadsCountBarChart barChartData={marketingStats?.graphData} />
                        </div>
                        <div className="h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                            <LeadSourcesDoughntChart doughntChartData={marketingStats?.doughnutChartData} />
                        </div>
                    </div>
                </div>}

            {
                oLoading || !operationStats ? <Loading /> :
                    <div className="mt-[16px]">
                        <h2 className="inline-block">Operations Stats</h2>
                        <div className="stats grid grid-cols-4 gap-[8px] mt-[8px]">
                            <Stat number={operationStats?.closedLeadsToday} title={"Closed Leads Today"} />
                            <Stat number={operationStats?.totalClients} title={"Total Clients"} />
                            <Stat number={operationStats?.totalPrograms} title={"Total Programs"} />
                            <Stat number={operationStats?.totalTemplates} title={"Total Templates"} />

                        </div>

                        <div className="graphs h-[450px] grid grid-cols-[1fr_2fr] gap-[8px] mt-[8px]">
                            <div className="h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center overflow-hidden">
                                <ProgramsSplitDoughntChart doughnutChartData={operationStats?.doughnutChartData} />
                            </div>

                            <div className="w-full h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                                <ClientsBarChart barChartData={operationStats?.barChartData} />
                            </div>

                        </div>
                    </div>
            }

            {
                fLoading || !financeStats ? <Loading /> :
                    <div className="mt-[24px]">
                        <h2>Finance</h2>
                        <div className="stats grid grid-cols-4 gap-[8px] mt-[8px]">
                            <Stat number={financeStats.incomingsToday} title={"Incomings Today"} symbol={" PKR"} />
                            <Stat number={financeStats.expensesToday} title={"Expenses Today"} symbol={" PKR"} />
                            <Stat number={financeStats.invoicesSent} title={"Invoices Sent"} />
                            <Stat number={0} title={"Invoices Partially Paid"} />
                        </div>

                        <div className="graphs h-[450px] grid grid-cols-[2fr_1fr] gap-[8px] my-[8px]">
                            <div className="w-full h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                                <IncomeVsExpense barChartData={financeStats.barChartData} />
                            </div>
                            <div className="h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center overflow-hidden">
                                <ExpenseDoughnutChart doughnutChartData={financeStats.doughnutChartData} />
                            </div>
                        </div>
                    </div>
            }


        </section>
    )
}

export default AdminDashboard
