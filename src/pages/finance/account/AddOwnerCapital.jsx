import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { styles } from '../../../select/styles'
import { useDispatch, useSelector } from 'react-redux'
import { currencyOptions } from '../../../select/options'
import moment from 'moment-timezone'
import { useAlert } from '../../../hooks/userAlert'
import { useParams } from 'react-router-dom'
import { addOwnerCapital } from '../../../redux/actions/account'
import Loading from '../../Loading'

const AddOwnerCapital = () => {
    const { id } = useParams()
    const alert = useAlert()
    const { error, message, loading } = useSelector(state => state.account)
    const dispatch = useDispatch();
    const [amount, setAmount] = useState("")
    const [currency, setCurrency] = useState("")
    const [file, setFile] = useState("")
    const date = moment().tz("Asia/Karachi").format("YYYY-MM-DD");

    const changeImageHandler = (e) => {
        setFile(e.target.files[0])
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData()
        myForm.append('amount', amount);
        myForm.append('date', date);
        myForm.append('currency', currency.value);
        myForm.append('file', file);

        dispatch(addOwnerCapital(id, myForm))
    }

    useEffect(() => {
        alert(message, error, `/finance/account/${id}`)
    }, [error, message, loading])

    return (
        loading ? <Loading /> : <section className='w-full h-screen'>
            <form onSubmit={submitHandler} action="" className='w-full'>
                <label htmlFor="">
                    <span>Amount</span>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enter Amount' type="number" />
                </label>

                <label htmlFor="">
                    <span>Currency</span>
                    <Select value={currency} onChange={setCurrency} options={currencyOptions} placeholder="Choose Currency" styles={styles} />
                </label>


                <label htmlFor="">
                    <span>Receipt</span>
                    <input onChange={changeImageHandler} type="file" />
                </label>

                <button className='primary-btn'>Submit</button>
            </form>
        </section>
    )
}

export default AddOwnerCapital
