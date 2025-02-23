import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getLeadById } from '../../../redux/actions/lead'
import { generateProfilePicture } from '../../../utils/assets'
import { capitalizeWords } from '../../../utils/utils'

const LeadLogs = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLeadById(id))
    }, [id])

    const { lead } = useSelector(state => state.lead)
    return (
        <section className='w-full'>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Done By</th>
                        <th>Task Done</th>
                    </tr>
                </thead>
                <tbody>
                    {lead && lead.logs && lead.logs.map((l, index) => <tr key={index}>
                        <td>{l.date?.split("T")[0]}</td>
                        <td>
                            {l.date?.includes("T") ? l.date.split("T")[1]?.split(/[+Z]/)[0] : "No time"}
                        </td>
                        <td>
                            <div className='flex items-center gap-[8px]'>
                                <img className='w-[48px] h-[48px] rounded-full' src={generateProfilePicture(true, l.doneBy)} alt="" />
                                <div>
                                    <p className='font-[500]'>{l?.doneBy?.name}</p>
                                    <p className='text-sm text-accent font-[600]'>{capitalizeWords(l?.doneBy?.role)}</p>
                                </div>
                            </div>
                        </td>
                        <td>{l.task}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default LeadLogs
