import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileRemarks } from '../redux/actions/lead'
import { useParams } from 'react-router-dom'
import Loading from '../pages/Loading'
import { generateProfilePicture } from '../utils/assets'
import { capitalizeWords } from '../utils/utils'

const Remarks = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getProfileRemarks(id))
    }, [id])
    const { remarks, loading, error, message } = useSelector(state => state.lead)
    return (
        loading || !remarks ? <Loading /> : <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Done By</th>
                    <th>Subject</th>
                    <th>Remark</th>
                </tr>
            </thead>

            <tbody>
                {remarks.map((r, index) => <tr key={index}>
                    <td>{r.createdAt.split("T")[0]}</td>
                    <td>{r.createdAt.split("T")[1].split("+")[0]}</td>
                    <td>
                        <div className='flex items-center gap-[8px]'>
                            <img className='w-[48px] h-[48px] rounded-full' src={generateProfilePicture(true, r.author)} alt="" />
                            <div>
                                <p className='font-[500]'>{r.author.name}</p>
                                <p className='text-sm text-accent font-[600]'>{capitalizeWords(r.author.role)}</p>
                            </div>
                        </div>
                    </td>
                    <td>{r.subject}</td>
                    <td>{r.remark}</td>
                </tr>)}
            </tbody>
        </table>
    )
}

export default Remarks
