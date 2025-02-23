import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { styles } from '../../../select/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from '../../../hooks/userAlert'
import { addExpense, getAllAccounts } from '../../../redux/actions/account'
import { currencyOptions, expenseTags } from '../../../select/options'
import moment from 'moment-timezone'
import Loading from '../../Loading'

const AddNewExpense = () => {

    const [account, setAccount] = useState({ value: "", label: "", })
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState({ value: "", label: "", })
    const [date, setDate] = useState(moment().tz("Asia/Karachi").format("YYYY-MM-DD"))
    const [currency, setCurrency] = useState({ value: "", label: "", })
    const [file, setFile] = useState(null)
    const disptach = useDispatch()
    const alert = useAlert("")
    const { loading, error, message } = useSelector(state => state.account)

    useEffect(() => {
        alert(message, error, "/finance/expenses/all")
    }, [error, message])

    useEffect(() => {
        disptach(getAllAccounts())
    }, [error, message])
    const { accounts } = useSelector(state => state.account)
    const accountOptions = accounts && accounts.length > 0 && accounts.map(account => ({ label: account.title, value: account._id }))
    const changeImageHandler = (e) => {
        setFile(e.target.files[0])
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.append('account', account.value)
        myForm.append('amount', amount)
        myForm.append('category', category.value)
        myForm.append('date', date)
        myForm.append('currency', currency.value)
        myForm.append('file', file)

        disptach(addExpense(myForm))

    }



    return (
        loading ? <Loading /> : <section onSubmit={submitHandler} className='w-full'>
            <form action="" className='w-full bg-white p-[16px] rounded-lg flex flex-col gap-[4px]'>
                <label htmlFor="">
                    <span>Account</span>
                    <Select placeholder="Choose Account" options={accountOptions} value={account} onChange={setAccount} styles={styles} />
                </label>

                <label htmlFor="">
                    <span>Amount</span>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder='Enter Amount' />
                </label>

                <label htmlFor="">
                    <span>Category</span>
                    <Select value={category} onChange={setCategory} options={expenseTags} styles={styles} />
                </label>

                <label htmlFor="">
                    <span>Date</span>
                    <input value={date} onChange={(e) => setDate(e.target.value)} type="date" />
                </label>

                <label htmlFor="">
                    <span>Currency</span>
                    <Select options={currencyOptions} value={currency} onChange={setCurrency} styles={styles} />
                </label>

                <label htmlFor="">
                    <span>File</span>
                    <input type="file" onChange={changeImageHandler} />
                </label>

                <button className='primary-btn'>Submit</button>
            </form>
        </section>
    )
}

export default AddNewExpense
