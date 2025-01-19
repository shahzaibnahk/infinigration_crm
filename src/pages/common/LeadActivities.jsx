import { useEffect, useState } from "react"
import LeadLogs from "../marketing/leads/LeadLogs"
import ClientProfile from "../../components/ClientProfile"
import { useParams } from "react-router-dom"
import Documents from "../../components/Documents"
import Remarks from "../../components/Remarks"
import { useDispatch, useSelector } from "react-redux"
import { getClientProfile } from "../../redux/actions/lead"


const LeadActivities = () => {
    const [active, setActive] = useState("task_summary")
    const { id } = useParams()
    const dispatch = useDispatch()

    const { profile } = useSelector(state => state.lead)

    useEffect(() => {
        dispatch(getClientProfile(id))
    }, [])

    return (
        <section className="w-full">

            <div className="w-full bg-white p-4 mb-[16px] rounded-lg flex items-center space-x-4">
                {profile && profile.timelineProcess && profile.timelineProcess.length > 0 && (
                    profile.timelineProcess.map((p, index) => (
                        <div key={p._id} className="flex items-center w-full justify-center">
                            {/* Milestone */}
                            <div className={`relative flex flex-col items-center`}>
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center ${p.status === "completed" ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`text-xs font-bold text-white`}
                                    >
                                        {index + 1}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 mt-2">{p.title}</p>
                            </div>

                            {/* Line between milestones */}
                            {index < profile.timelineProcess.length - 1 && (
                                <div
                                    className={`h-[2px] w-8 ${profile.timelineProcess[index].status === "completed"
                                            ? "bg-blue-500"
                                            : "bg-gray-300"
                                        }`}
                                ></div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="w-full grid grid-cols-4 gap-[8px]">
                {[{
                    value: "task_summary",
                    label: "Task Summary"
                },
                {
                    value: "client_profile",
                    label: "Client Profile"
                },
                {
                    value: "documents",
                    label: "Documents"
                },
                {
                    value: "remarks",
                    label: "Remarks"
                }].map((b, index) => <button className={`${active === b.value ? "bg-accent text-white" : "bg-white"} p-[12px] font-[500] rounded-md`} onClick={() => setActive(b.value)} key={index}>{b.label}</button>)}

            </div>

            {active === "task_summary" && <LeadLogs />}
            {active === "client_profile" && <ClientProfile id={id} />}
            {active === "documents" && <Documents id={id} />}
            {active === "remarks" && <Remarks id={id} />}


        </section>
    )
}

export default LeadActivities
