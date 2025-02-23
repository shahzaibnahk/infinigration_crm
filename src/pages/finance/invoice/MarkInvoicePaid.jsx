import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { styles } from '../../../select/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAccounts } from '../../../redux/actions/account'
import Loading from '../../Loading'
import { useAlert } from '../../../hooks/userAlert'
import { markInvoicePaid } from '../../../redux/actions/invoice'
import { useParams } from 'react-router-dom'

const MarkInvoicePaid = () => {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState("")
    const [account, setAccount] = useState({ value: "", label: "" })
    const [file, setFile] = useState(null)
    const { id } = useParams()
    const { accounts } = useSelector(state => state.account)

    const changeImageHandler = (e) => {
        setFile(e.target.files[0])
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append('amount', amount)
        myForm.append('date', date);
        myForm.append('account', account.value);
        myForm.append('file', file);

        console.log(account, amount, date, file)
        dispatch(markInvoicePaid(id, myForm))
    }

    let accountOptions = accounts && accounts.length > 0 && accounts.map((a) => ({
        value: a._id,
        label: a.title
    }))
    const alert = useAlert("")

    const { loading, error, message } = useSelector(state => state.invoice)
    useEffect(() => {
        dispatch(getAllAccounts())
    }, [])

    useEffect(() => {
        alert(message, error, `/finance/invoices/all`)
    }, [error, message]);

    return (
        loading ? <Loading /> : <section className='w-full'>
            <form onSubmit={submitHandler} action="" className='w-full flex flex-col gap-[4px]'>
                <label htmlFor="">
                    <span>Amount</span>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder='Enter Amount' />
                </label>

                <label htmlFor="">
                    <span>Date</span>
                    <input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder='Enter Amount' />
                </label>

                <label htmlFor="">
                    <span>Account</span>
                    <Select options={accountOptions} value={account} onChange={setAccount} styles={styles} type="date" placeholder='Choose Account' />
                </label>

                <label htmlFor="">
                    <span>Receipt</span>
                    <input onChange={changeImageHandler} type="file" placeholder='Enter Amount' />
                </label>

                <button className='primary-btn mt-[4px]'>Submit</button>
            </form>
        </section>
    )
}

export default MarkInvoicePaid
