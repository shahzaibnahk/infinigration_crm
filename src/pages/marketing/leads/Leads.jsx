import { useParams } from 'react-router-dom'
import Select from 'react-select'
import { bgWhiteStyles } from '../../../select/styles'
import MarketingFilter from '../../../components/MarketingFilter'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLeads } from '../../../redux/actions/lead'
import moment from 'moment-timezone'

const Leads = () => {
    const [date, setDate] = useState(moment.tz("Asia/Karachi").format("YYYY-MM-DD"))
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getAllLeads("2024-12-14"))
    }, [])

    const { leads } = useSelector(state => state.lead)
    return (
        <section>
            <div className="actions-row flex items-center justify-between w-full">
                <div className='flex items-center gap-[8px] w-1/2'>
                    <Select className='w-[400px]' styles={bgWhiteStyles} placeholder="Bulk Assign Lead" />
                    <button className='primary-small-btn'>Bulk Assign</button>
                </div>

                <div className='flex items-center gap-[8px]'>
                    <button className='primary-small-btn'>Download Excel</button>
                    <button className='primary-small-btn'>Bulk Delete</button>
                </div>
            </div>

            <MarketingFilter />

            <table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Uid</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Program</th>
                        <th>Assigned To</th>
                        <th>{id === "fresh" ? "Actions" : id === "returned" || id === "shuffled" ? "Remarks" : ""}</th>
                    </tr>
                </thead>

                <tbody>
                    {leads && leads.length > 0 && leads.map((l) => <tr key={l._id}>
                        <td>{l.uid}</td>
                        <td>{l.uid}</td>
                        <td>{l.createdAt}</td>
                        <td>{l.name}</td>
                        <td>{l.phone}</td>
                        <td>{l.program || "Nill"}</td>
                        <td>{l.assignedTo || "Nill"}</td>
                        <td>
                            <div className='actions'></div>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </section>
    )
}

export default Leads
