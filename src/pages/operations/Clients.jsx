import { useEffect, useState } from "react"
import ClientsFilter from "../../components/ClientsFilter"
import { useDispatch, useSelector } from "react-redux"
import { deleteClient, getAllClients } from "../../redux/actions/client"
import Loading from "../Loading"
import { Link } from "react-router-dom"
import moment from "moment-timezone"
import { useAlert } from "../../hooks/userAlert"

const Clients = () => {
    const [program, setProgram] = useState("")
    const [month, setMonth] = useState("")
    const [salesPerson, setSalesPerson] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [name, setName] = useState("")
    const alert = useAlert()
    const dispatch = useDispatch()
    const { clients, loading, error, message } = useSelector(state => state.client)

    useEffect(() => {
        dispatch(getAllClients())
        alert(message, error, "/operations/clients")
    }, [message])

    const filteredClients = clients?.filter(c =>
        (!month || c.createdAt.includes(month.value)) &&
        (!program || c.profile.program.title.includes(program.value)) &&
        (!salesPerson || c.profile.lead.assignedTo.toString() === salesPerson?.value.toString()) &&
        (!phoneNumber || c.profile.phone.includes(phoneNumber)) &&
        (!name || c.profile.name.toLowerCase().includes(name.toLowerCase()))
    ) || clients

    return (
        loading ? <Loading /> : <section className='w-full'>
            <ClientsFilter
                program={program}
                setProgram={setProgram}
                month={month}
                setMonth={setMonth}
                salesPerson={salesPerson}
                setSalesPerson={setSalesPerson}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                name={name}
                setName={setName}
            />
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Program</th>
                        <th>Total Cost</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredClients?.length > 0 && filteredClients?.map((c, index) => <tr key={index}>
                        <td>{c.createdAt}</td>
                        <td>{c.profile.name}</td>
                        <td>{c.profile.phone}</td>
                        <td>{c.profile.email || "Nill"}</td>
                        <td>{c.profile.program.country + " " + c.profile.program.title || "Nill"}</td>
                        <td>{c.profile.program.currency + " " + c.profile.program.totalCost || "Nill"}</td>
                        <td>
                            <div className="actions">
                                <Link to={`/operations/client/${c.profile.lead}/activities`}>Activities</Link>
                                <Link to={`/operations/client/${c._id}/contract`}>View Contract</Link>
                                <Link to={`/operations/client/${c._id}/timeline-process`}>Timeline Process</Link>
                                <Link to={`/operations/client/${c?.profile?.lead}/remarks/add`}>Add Remarks</Link>
                                <Link to={`/operations/client/${c._id}/update`}>Update</Link>
                                <button onClick={() => dispatch(deleteClient(c._id, moment.tz("Asia/Karachi").format()))}>Delete</button>
                            </div>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </section>
    )
}

export default Clients
