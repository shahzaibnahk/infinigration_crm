import React from 'react'

const ActivityLogs = () => {
    return (
        <section>
            <input type="date" className='!bg-white !w-[300px]'/>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Activity</th>
                    </tr>
                </thead>
            </table>
        </section>
    )
}

export default ActivityLogs
