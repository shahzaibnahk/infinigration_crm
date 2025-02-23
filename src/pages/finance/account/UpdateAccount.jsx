import Select from "react-select"
import { styles } from "../../../select/styles"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment-timezone"
import { useDispatch, useSelector } from "react-redux"
import { getAccountById, updateAccount } from "../../../redux/actions/account"
import { accountTypeFilter, accountTypes, currencyOptions } from "../../../select/options"
import Loading from "../../Loading"
import { useAlert } from "../../../hooks/userAlert"

const UpdateAccount = () => {
    const alert = useAlert()
    const { id } = useParams()
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [type, setType] = useState("")
    const [currency, setCurrency] = useState("")
    const date = moment().tz("Asia/Karachi").format("YYYY-MM-DD")
    const { account, message, error, loading } = useSelector(state => state.account)

    useEffect(() => {
        dispatch(getAccountById(id))
        setTitle(account?.title)
        setType(accountTypes.find((a) => a.value === account?.type))
        setCurrency(currencyOptions.find((c) => c.value === account?.currency))
    }, [id])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateAccount(id, title, type.value, currency.value, date))
    }

    useEffect(() => {
        alert(message, error, `/finance/accounts/all`)
    }, [error, loading, message])

    return (
        loading ? <Loading /> : <section className="w-full">
            <form onSubmit={submitHandler} action="" className="w-full flex flex-col gap-[4px]">
                <label htmlFor="">
                    <span>Title</span>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title" />
                </label>

                <label htmlFor="">
                    <span>Type</span>
                    <Select options={accountTypes} value={type} onChange={setType} styles={styles} type="text" placeholder="Choose Type" />
                </label>

                <label htmlFor="">
                    <span>Currency</span>
                    <Select value={currency} onChange={setCurrency} styles={styles} type="text" placeholder="Choose Currency" />
                </label>

                <button className="primary-btn inline-block !mt-[4px]">Update</button>
            </form>
        </section>
    )
}

export default UpdateAccount
