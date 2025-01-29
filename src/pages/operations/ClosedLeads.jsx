import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getClosedLeads } from "../../redux/actions/lead"
import moment from "moment-timezone"
import { Link } from "react-router-dom"

const ClosedLeads = () => {
    const dispatch = useDispatch()
    const date = moment.tz("Asia/Karachi").format("YYYY-MM-DD")
    const { closedLeads } = useSelector(state => state.lead)

    useEffect(() => {
        dispatch(getClosedLeads("closed_clients", date))
    }, [date])


    return (
        <section className='w-full'>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Program</th>
                        <th>Sales Person</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {closedLeads && closedLeads.length > 0 && closedLeads.map((l, index) => <tr key={index}>
                        <td>{l.createdAt}</td>
                        <td>{l.name}</td>
                        <td>{l.name}</td>
                        <td>{l.phone}</td>
                        <td>{l.program.country + " " + l.program.title || "Nill"}</td>
                        <td>{l.assignedTo.name || "Nill"}</td>
                        <td>
                            <div className="actions">
                                <Link to={`/operations/closed-client/${l._id}/client/add`}>Convert To Client</Link>
                            </div>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default ClosedLeads
