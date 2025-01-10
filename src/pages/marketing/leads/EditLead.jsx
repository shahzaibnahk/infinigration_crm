import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getLeadById, updateLead } from '../../../redux/actions/lead'
import Select from 'react-select'
import { sourceOptions } from '../../../select/options'
import { styles } from '../../../select/styles'
import Loading from '../../Loading'
import { useAlert } from '../../../hooks/userAlert'

const EditLead = () => {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [source, setSource] = useState({ value: "", label: "" })

    const dispatch = useDispatch()
    const { lead, loading, error, message } = useSelector(state => state.lead)
    const alert = useAlert()
    useEffect(() => {
        dispatch(getLeadById(id))

        setName(lead.name)
        setCity(lead.city)
        setPhone(lead.phone)
        setSource({ value: lead.source, label: lead.source })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateLead(id, name, city, phone, source.value))
    }

    useEffect(() => {
        alert(message, error, "/marketing/leads/fresh")
    }, [error, message])

    return (
        loading ? <Loading /> : <section className='w-full'>
            <form onSubmit={submitHandler} action="" className='w-full'>
                <label htmlFor="">
                    <span>Name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Name' />
                </label>

                <label htmlFor="">
                    <span>City</span>
                    <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder='Enter Name' />
                </label>

                <label htmlFor="">
                    <span>Phone</span>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder='Enter Name' />
                </label>

                <label htmlFor="">
                    <span>Source</span>
                    <Select styles={styles} options={sourceOptions} value={source} onChange={setSource}></Select>
                </label>

                <button className='primary-btn !p-[10px] !mt-[8px]'>Update</button>
            </form>
        </section>
    )
}

export default EditLead
