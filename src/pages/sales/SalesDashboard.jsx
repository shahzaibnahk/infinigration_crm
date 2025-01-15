import Stat from '../../components/Stat'

const SalesDashboard = () => {
    return (
        <section>
            <div className="w-full bg-white p-[16px] rounded-lg h-[150px] flex justify-center items-center">
                <p className="w-[80%] text-center">
                    <i className="text-2xl">{""}</i>
                </p>
            </div>

            <div className="stats grid grid-cols-3 gap-[16px] mt-[16px]">
                <Stat number={0} title={"Assigned Leads Today"} />
                <Stat number={0} title={"Shuffled Leads Today"} />
                <Stat number={0} title={"Returned Today"} />
                <Stat number={0} title={"Clients Closed This Month"} />
                <Stat number={0} title={"Absentees Remaining This Month"} />
                <Stat number={0} title={"Salary This Month"} />
            </div>

            <div className="graphs h-[450px] grid grid-cols-[2fr_1fr] gap-[16px] my-[16px]">
                <div className="w-full h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                </div>
                <div className="h-full bg-white p-[16px] rounded-lg relative flex justify-center items-center">
                </div>
            </div>


        </section>
    )
}

export default SalesDashboard
