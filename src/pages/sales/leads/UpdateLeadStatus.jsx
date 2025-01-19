import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { salesStatuses } from '../../../select/options'
import { styles } from '../../../select/styles'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Loading'
import { useAlert } from '../../../hooks/userAlert'
import { changeLeadStatusBySales } from '../../../redux/actions/lead'
import moment from 'moment-timezone'
import { useParams } from 'react-router-dom'

const UpdateLeadStatus = () => {
    const [status, setStatus] = useState("")

    const dispatch = useDispatch()
    const alert = useAlert()
    const { id } = useParams()
    const { error, loading, message } = useSelector(state => state.lead)
    useEffect(() => {
        alert(message, error, "/sales/leads/assigned")
    }, [error, message])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(changeLeadStatusBySales(id, status.value, moment.tz("Asia/Karachi").format()))
    }
    return (
        loading ? <Loading /> : <section className='w-full'>
            <form onSubmit={submitHandler} action="" className='w-full'>
                <label htmlFor="">
                    <span>Status</span>
                    <Select placeholder="Choose Status" styles={styles} options={salesStatuses} value={status} onChange={setStatus} />
                </label>
                <button className='primary-btn !mt-[8px]'>Update</button>
            </form>
        </section>
    )
}

export default UpdateLeadStatus
