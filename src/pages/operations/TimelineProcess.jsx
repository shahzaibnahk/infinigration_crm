import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getClientById, markStageCompleted } from "../../redux/actions/client"
import { useParams } from "react-router-dom"
import moment from "moment-timezone"
import { useAlert } from "../../hooks/userAlert"
import Loading from "../Loading"

const TimelineProcess = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { client, loading, error, message } = useSelector(state => state.client)
    useEffect(() => {
        dispatch(getClientById(id))
    }, [error, message])
    const alert = useAlert()
    const markStageCompleteHandler = (e, id, tId, status) => {
        e.preventDefault()
        dispatch(markStageCompleted(id, moment.tz("Asia/Karachi").format(), tId, status))
    }

    useEffect(() => {
        alert(message, error, "/operations/clients")
    }, [error, message])


    return (
        loading ? <Loading /> : <div>
            <table>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Stage</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                    <tbody>
                        <tr></tr>
                    </tbody>
                </thead>

                <tbody>
                    {
                        client?.profile?.timelineProcess.map((t, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{t.title}</td>
                            <td>{t.status}</td>
                            <td>
                                <div className="actions">
                                    <button onClick={(e) => markStageCompleteHandler(e, client?.profile?._id, t._id, t?.status === "completed" ? "pending" : "completed")}>{t?.status === "completed" ? "Mark Pending" : "Mark Completed"}</button>
                                </div>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TimelineProcess
