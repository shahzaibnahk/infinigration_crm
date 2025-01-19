import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyAttendance, getMyProfile, markAttendance } from '../redux/actions/user'
import moment from 'moment-timezone'
import { capitalizeWords } from '../utils/utils'

const Attendance = () => {
    const { attendance } = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <div className='w-full rounded-lg mb-[16px]'>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Joining Time</th>
                        <th>Joined At</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{attendance.date}</td>
                        <td>{"9:00 A.M"}</td>
                        <td>{attendance?.markedAt?.split('T')[1].split("+")[0] || "Not Marked Yet"}</td>
                        <td>{capitalizeWords(attendance.status)}</td>
                        <td>
                            <div className='actions'>
                                <button onClick={(e) => {
                                    dispatch(markAttendance(attendance._id, moment.tz("Asia/Karachi").format()))
                                    dispatch(getMyProfile())
                                }}>Mark Attendance</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Attendance
