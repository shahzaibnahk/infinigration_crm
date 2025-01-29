import moment from "moment-timezone"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addRemark } from "../../redux/actions/lead"
import { useAlert } from "../../hooks/userAlert"
import Loading from "../Loading"


const AddRemarks = () => {
    const { user } = useSelector(state => state.user)
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const date = moment.tz("Asia/Karachi").format()
    const dispatch = useDispatch()
    const { id } = useParams()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addRemark(id, subject, description, date))
    }
    const alert = useAlert()
    const { loading, error, message } = useSelector(state => state.lead)
    useEffect(() => {
        alert(message, error, user && user.role === "sales" ? "/sales/leads/assigned" : "/operations/clients")
    }, [error, message])
    return (
        loading ? <Loading /> : <section className="w-full">
            <form onSubmit={submitHandler} action="" className="w-full flex flex-col gap-[4px]">
                <label htmlFor="">
                    <span>Subject</span>
                    <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" placeholder="Enter Subject" />
                </label>

                <label htmlFor="">
                    <span>Description</span>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description"></textarea>
                </label>

                <button className="primary-btn !mt-[4px]">Submit</button>
            </form>

        </section>
    )
}

export default AddRemarks
