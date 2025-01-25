import moment from 'moment-timezone'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyLogs } from '../../redux/actions/user'
import Loading from '../Loading'

const ActivityLogs = () => {
    const today = moment.tz("Asia/Karachi").format("YYYY-MM-DD")
    const dispatch = useDispatch()
    const { logs } = useSelector(state => state.user)





    return (
        <section>
            {/* <input value={today} type="date" className='!bg-white !w-[300px]' /> */}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Activity</th>
                    </tr>
                </thead>

                <tbody>
                    {logs && logs?.activities?.length > 0 && logs?.activities?.map((l, index) => <tr key={index}>
                        <td>{logs.date.split("T")[0]}</td>
                        <td>{l.time}</td>
                        <td>{l.task}</td>
                    </tr>)}
                </tbody>
            </table>
        </section>
    )
}

export default ActivityLogs
