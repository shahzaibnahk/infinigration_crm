import { Link, useParams } from 'react-router-dom'
import Select from 'react-select'
import { bgWhiteStyles } from '../../../select/styles'
import MarketingFilter from '../../../components/MarketingFilter'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignLeads, deleteLead, getAllLeads } from '../../../redux/actions/lead'
import moment from 'moment-timezone'
import { capitalizeWords } from '../../../utils/utils'
import { IoEyeSharp } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Loading from '../../Loading'
import { useAlert } from '../../../hooks/userAlert'
import { getDepartment } from '../../../redux/actions/department'

const Leads = () => {
    const [date, setDate] = useState(moment.tz("Asia/Karachi").format("YYYY-MM-DD"))
    const [tag, setTag] = useState("all")
    const [employee, setEmployee] = useState("")
    const [month, setMonth] = useState("")
    const [unassignedLimit, setUnassignedLimit] = useState("")
    const [selectedLeads, setSelectedLeads] = useState([])
    const [bulkAssignEmployee, setBulkAssignEmployee] = useState("")// To store selected leads

    const dispatch = useDispatch()
    const { id } = useParams()

    const { leads, error, loading, message } = useSelector(state => state.lead)
    useEffect(() => {
        dispatch(getAllLeads(date, id))
    }, [date, id, error, message])
    useEffect(() => {
        dispatch(getDepartment("sales"))
    }, [])

    const alert = useAlert()

    const handleSelectLead = (leadId) => {
        setSelectedLeads((prevSelected) => {
            if (prevSelected.includes(leadId)) {
                return prevSelected.filter((id) => id !== leadId);
            } else {
                return [...prevSelected, leadId];
            }
        });
    };

    const deleteHandler = (e, id) => {
        e.preventDefault()
        dispatch(deleteLead(id))
    }

    useEffect(() => {
        alert(message, error, "/marketing/leads/fresh")
    }, [error, message])

    const filteredLeads = leads?.filter((lead) => {
        if (tag === "assigned" && lead.status !== "assigned") return false;
        if (tag === "unassigned" && lead.status !== "unassigned") return false;

        if (employee && lead.assignedTo?._id !== employee) return false;

        if (month && moment(lead.createdAt).format("MM") !== month.value) return false;

        return true;
    });

    const selectedUnassignedLeads = filteredLeads && filteredLeads.length > 0 ? filteredLeads
        .filter((lead) => lead.status === "unassigned")
        .slice(0, unassignedLimit)
        .map((lead) => lead._id) : []


    const allSelectedLeads = [...new Set([...selectedLeads, ...selectedUnassignedLeads])];

    const assignLeadsHandler = (e) => {
        e.preventDefault()
        dispatch(assignLeads(allSelectedLeads, bulkAssignEmployee.value, moment.tz("Asia/Karachi").format()))
    }

    const { department } = useSelector(state => state.department)

    const employeeOptions = department && department.length > 0 && department.map((e) => ({
        value: e._id,
        label: e.name
    }));


    return (
        loading ? <Loading /> : <section>
            <div className="actions-row flex items-center justify-between w-full">
                <div className='flex items-center gap-[8px] w-1/2'>
                    <Select value={bulkAssignEmployee}
                        options={employeeOptions}
                        onChange={setBulkAssignEmployee} className='w-[400px]' styles={bgWhiteStyles} placeholder="Bulk Assign Lead" />
                    <button onClick={assignLeadsHandler} className='primary-small-btn'>Bulk Assign</button>
                </div>

                <div className='flex items-center gap-[8px]'>
                    <button className='primary-small-btn'>Download Excel</button>
                    <button className='primary-small-btn'>Bulk Delete</button>
                </div>
            </div>

            <MarketingFilter
                date={date}
                setDate={setDate}
                tag={tag}
                setTag={setTag}
                employee={employee}
                setEmployee={setEmployee}
                month={month}
                setMonth={setMonth}
                unassignedLimit={unassignedLimit}
                setUnassignedLimit={setUnassignedLimit}
            />



            <table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Uid</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Program</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>{id === "fresh" ? "Actions" : id === "returned" || id === "shuffled" ? "Remarks" : ""}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLeads && filteredLeads.length > 0 && filteredLeads.map((l) => (
                        <tr key={l._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={allSelectedLeads.includes(l._id)}
                                    onChange={() => handleSelectLead(l._id)}
                                />
                            </td>
                            <td>{l.uid}</td>
                            <td>{moment(l.createdAt).format("YYYY-MM-DD")}</td>
                            <td>{l.name}</td>
                            <td>{l.phone}</td>
                            <td>{l.program || "N/A"}</td>
                            <td>{capitalizeWords(l.status) || "N/A"}</td>
                            <td>{l.assignedTo ? l.assignedTo.name : "N/A"}</td>
                            <td>
                                <div className="actions flex items-center gap-[8px]">
                                    <Link to={`/marketing/lead/${l._id}/logs`}>
                                        <IoEyeSharp />
                                    </Link>
                                    <Link to={`/marketing/lead/${l._id}/edit`}>
                                        <MdModeEditOutline />
                                    </Link>
                                    <button onClick={(e) => deleteHandler(e, l._id)}>
                                        <MdDelete />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </section>
    )
}

export default Leads
