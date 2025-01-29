import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeProgramStatus, deleteProgram, getAllPrograms } from "../../../redux/actions/program"
import { Link } from "react-router-dom"
import moment from "moment-timezone"
import Loading from "../../Loading"
import { useAlert } from "../../../hooks/userAlert"

const Programs = () => {
    const alert = useAlert()
    const { programs, message, error, loading } = useSelector(state => state.program)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPrograms())
    }, [message, error])



    useEffect(() => {
        alert(message, error, "/operations/programs")
    }, [message, error])

    return (
        loading ? <Loading /> : <section className='w-full'>
            <table>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Country</th>
                        <th>Title</th>
                        <th>Total Cost</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {programs && programs.length > 0 && programs.map((p, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{p.country}</td>
                        <td>{p.title}</td>
                        <td>{p.currency} {p.totalCost}</td>
                        <td>{p.status}</td>
                        <td>
                            <div className="actions">
                                <button onClick={() => dispatch(changeProgramStatus(p._id, moment.tz("Asia/Karachi").format()))}>{p.status === "active" ? "Disable" : "Activate"}</button>
                                <Link to={`/operations/program/${p._id}/update`}>Update</Link>
                                <button onClick={() => dispatch(deleteProgram(p._id, moment.tz("Asia/Karachi").format()))}>Delete</button>
                            </div>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default Programs
