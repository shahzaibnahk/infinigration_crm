import Dropzone from 'react-dropzone'
import { RiUploadCloud2Line } from "react-icons/ri";
import Select from "react-select"
import { phoneButtonStyles, phoneInputStyles, styles } from '../../../select/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLead } from '../../../redux/actions/lead';
import { useAlert } from '../../../hooks/userAlert';
import Loading from '../../Loading';
import { sourceOptions } from '../../../select/options';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const AddNewLead = () => {
    const { loading, error, message } = useSelector(state => state.lead)
    const alert = useAlert()
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [campaign, setCampaign] = useState({ value: "facebook", label: "Facebook" })
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createLead(name, city, phone, campaign.value))
    }

    useEffect(() => {
        alert(message, error, "/marketing/leads/fresh")
    }, [error, message])

    return (

        loading ? <Loading /> : <div className='w-full grid grid-cols-2 gap-[16px]'>
            <form onSubmit={submitHandler} action="" className='!w-full flex flex-col gap-[4px]'>
                <label htmlFor="">
                    <span>Name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Name' />
                </label>
                <label htmlFor="">
                    <span>City</span>
                    <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder='Enter City' />
                </label>

                <label htmlFor="">
                    <span>Phone</span>
                    <PhoneInput
                        value={phone}
                        onChange={(e) => setPhone(e)}
                        inputStyle={phoneInputStyles}
                        buttonStyle={phoneButtonStyles}
                    />
                </label>

                <label htmlFor="">
                    <span>Source</span>
                    <Select value={campaign} onChange={setCampaign} options={sourceOptions} styles={styles} placeholder='Choose Source' />
                </label>

                <button className='primary-btn'>Submit</button>
            </form>

            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section className="bg-white p-[16px] rounded-lg flex flex-col justify-center items-center">
                        <div {...getRootProps()} className='flex flex-col gap-[4px] items-center'>
                            <RiUploadCloud2Line className='text-7xl text-accent' />
                            <input {...getInputProps()} />
                            <p className='text-text'>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>


        </div>
    )
}

export default AddNewLead
