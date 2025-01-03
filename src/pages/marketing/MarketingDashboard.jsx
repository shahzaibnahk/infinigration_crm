import Stat from "../../components/Stat"

import LeadSourcesDoughntChart from "../../components/LeadSourcesDoughntChart";
import LeadsCountBarChart from "../../components/LeadsCountBarChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarketingStats } from "../../redux/actions/stats";
import Loading from "../Loading";

const MarketingDashboard = () => {
    const { marketingStats, loading } = useSelector(state => state.stats)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMarketingStats())
    }, [])


    return (
        loading || !marketingStats ? <Loading /> : <section className="">
            <div className="w-full bg-white p-[16px] rounded-lg h-[150px] flex justify-center items-center">
                <p className="w-[80%] text-center">
                    <i className="text-2xl">{marketingStats?.quote}</i>
                </p>
            </div>
            <div className="stats grid grid-cols-3 gap-[16px] mt-[16px]">
                <Stat number={marketingStats?.stats?.totalLeadsToday} title={"Total Leads Today"} />
                <Stat number={marketingStats?.stats?.assignedLeadsToday} title={"Assigned Leads Today"} />
                <Stat number={marketingStats?.stats?.unAssignedLeadsToday} title={"Unassigned Leads Today"} />
                <Stat number={0} title={"Absentees This Month"} />
                <Stat number={0} title={"Leaves Remaining This Month"} />
                <Stat number={0} title={"Salary This Month"} />
            </div>

            <div className="graphs h-[450px] grid grid-cols-[2fr_1fr] gap-[16px] my-[16px]">
                <div className="w-full h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                    <LeadsCountBarChart barChartData={marketingStats?.graphData} />
                </div>
                <div className="h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                    <LeadSourcesDoughntChart doughntChartData={marketingStats?.doughnutChartData} />
                </div>
            </div>
        </section>
    )
}

export default MarketingDashboard
