import Select from "react-select"
import { styles } from "../../../select/styles"
import moment from "moment-timezone"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { createAccount } from "../../../redux/actions/account"
import { accountTypes, currencyOptions } from "../../../select/options"
import { useAlert } from "../../../hooks/userAlert"
import Loading from "../../Loading"

const AddNewAccount = () => {
    const alert = useAlert()
    const [title, setTitle] = useState("")
    const [type, setType] = useState("")
    const [currency, setCurrency] = useState("")
    const date = moment.tz("Asia/Karachi").format("YYYY-MM-DD")
    const dispatch = useDispatch()
    const { loading, error, message } = useSelector(state => state.account)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createAccount(title, type.value, currency.value, date))
    }

    useEffect(() => {
        alert(message, error, "/finance/accounts")
    }, [message, error, loading])

    return (
        loading ? <Loading /> : <section className="w-full">
            <form onSubmit={submitHandler} className="w-full flex flex-col gap-[4px]" action="">
                <label htmlFor="">
                    <span>Title</span>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Account Title" />
                </label>

                <label htmlFor="">
                    <span>Type</span>
                    <Select options={accountTypes} value={type} onChange={setType} placeholder="Choose Account Type" styles={styles} />
                </label>

                <label htmlFor="">
                    <span>Currency</span>
                    <Select value={currency} options={currencyOptions} onChange={setCurrency} placeholder="Choose Account Type" styles={styles} />
                </label>

                <button className="primary-btn">Create</button>
            </form>
        </section>
    )
}

export default AddNewAccount
