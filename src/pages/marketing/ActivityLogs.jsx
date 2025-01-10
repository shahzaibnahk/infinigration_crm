import moment from 'moment-timezone'
import React from 'react'
import { useSelector } from 'react-redux'

const ActivityLogs = () => {
    const today = moment.tz("Asia/Karachi").format("YYYY-MM-DD")
    const { user } = useSelector(state => state.user)

    let logs = user.logs && user.logs.length > 0 && user.logs.find((l) => l.date.split("T")[0] === today)




    return (
        <section>
            <input type="date" className='!bg-white !w-[300px]' />
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Activity</th>
                    </tr>
                </thead>

                <tbody>
                    {logs && logs.activities.length > 0 && logs.activities.map((l, index) => <tr key={index}>
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
