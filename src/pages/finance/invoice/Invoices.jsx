import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteInvoice, getAllInvoices } from '../../../redux/actions/invoice'
import moment from 'moment-timezone'
import Loading from '../../Loading'
import { Link } from 'react-router-dom'
import InvoiceFilter from '../../../components/InvoiceFilter'
import { useAlert } from '../../../hooks/userAlert'

const Invoices = () => {
    const [date, setDate] = useState(moment().tz("Asia/Karachi").format("YYYY-MM-DD"))
    const [status, setStatus] = useState("")
    const [client, setClient] = useState("")
    const alert = useAlert()
    const dispatch = useDispatch()
    const { invoices, loading, error, message } = useSelector(state => state.invoice)

    // Fetch all invoices initially
    useEffect(() => {
        dispatch(getAllInvoices(date))
    }, [dispatch])

    useEffect(() => {
        alert(message, error, `/finance/invoices/all`)
    }, [error, message])

    // Apply filters using .filter() method
    const filteredInvoices = invoices?.filter(i =>
        (date ? moment(i.createdAt).format("YYYY-MM-DD") === date : true) &&
        (status.value ? i.status === status.value : true) &&
        (client.value ? i.client._id === client.value : true)
    )

    const clickHandler = (id) => {
        dispatch(deleteInvoice(id))
    }

    return (
        loading ? <Loading /> : <section className='w-full'>
            <InvoiceFilter date={date} setDate={setDate} status={status} setStatus={setStatus} client={client} setClient={setClient} />
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Title</th>
                        <th>Total Amount</th>
                        <th>Amount Paid</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInvoices && filteredInvoices.length > 0 ? (
                        filteredInvoices.map((i, index) => (
                            <tr key={index}>
                                <td>{moment(i.createdAt).format("YYYY-MM-DD")}</td>
                                <td>{i.client.profile.name}</td>
                                <td>{i.invoiceItem.title}</td>
                                <td>{i.totalAmount} <span className='uppercase'>{i.currency}</span></td>
                                <td>{i.amountPaid} <span className='uppercase'>{i.currency}</span></td>
                                <td>{i.totalAmount - i.amountPaid} <span className='uppercase'>{i.currency}</span></td>
                                <td>{i.status}</td>
                                <td>
                                    <div className="actions">
                                        <Link to={`/finance/invoice/${i._id}`}>View</Link>
                                        <Link target='_blank' className={`${i.status !== "pending" ? "visible" : "hidden"}`} to={i.receipt.url}>View Receipt</Link>
                                        <Link to={`/finance/invoice/${i._id}/mark-paid`}>Mark Paid</Link>
                                        <Link to={`/finance/invoice/${i._id}/update`}>Update</Link>
                                        <button onClick={() => clickHandler(i._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No invoices found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default Invoices
