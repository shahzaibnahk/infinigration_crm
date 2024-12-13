import Stat from "../../components/Stat"

import LeadSourcesDoughntChart from "../../components/LeadSourcesDoughntChart";
import LeadsCountBarChart from "../../components/LeadsCountBarChart";

const MarketingDashboard = () => {


    return (
        <section className="">
            <div className="w-full bg-white p-[16px] rounded-lg h-[150px]"></div>
            <div className="stats grid grid-cols-3 gap-[16px] mt-[16px]">
                <Stat number={0} title={"Total Leads Today"} />
                <Stat number={0} title={"Assigned Leads Today"} />
                <Stat number={0} title={"Unassigned Leads Today"} />
                <Stat number={0} title={"Absentees This Month"} />
                <Stat number={0} title={"Leaves Remaining This Month"} />
                <Stat number={0} title={"Salary This Month"} />
            </div>

            <div className="graphs h-[450px] grid grid-cols-[2fr_1fr] gap-[16px] my-[16px]">
                <div className="w-full h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                    <LeadsCountBarChart />
                </div>
                <div className="h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                    <LeadSourcesDoughntChart />
                </div>
            </div>
        </section>
    )
}

export default MarketingDashboard
