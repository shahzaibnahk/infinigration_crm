import { useEffect, useState } from "react"
import { assets } from "../../../utils/assets"
import moment from "moment-timezone"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getInvoiceById } from "../../../redux/actions/invoice"
import Loading from "../../Loading"
import { numberToWords } from "../../../utils/numberToWords"
import { usePDF } from 'react-to-pdf'

const ViewInvoice = () => {

    const { id } = useParams()
    const [date, setDate] = useState(moment().tz("Asia/Karachi").format("YYYY-MM-DD"))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInvoiceById(id))
    }, [id, dispatch])

    const { invoice, loading } = useSelector(state => state.invoice)
    const { toPDF, targetRef } = usePDF({ filename: `${invoice?.client?.profile?.name} ${invoice?.client?.profile?.program?.title} Invoice` });

    return (
        loading ? <Loading /> || !invoice : <section className="w-full">
            <button className="primary-btn mb-[16px]" onClick={() => toPDF()}>Download PDF</button>
            <div ref={targetRef} className="invoice-container w-full bg-white rounded-lg p-[16px]">
                <div className="w-full flex items-center justify-between text-lg">
                    <div className="flex items-center gap-[16px]">
                        <img className="w-[120px]" src={assets.logo} alt="" />
                        <div>
                            <p className="text-3xl font-[600] text-text">infinigration</p>
                            <p>Westeria Centre, Plaza 38 2nd Floor, Westeria Road, Sector A, DHA @ <br />
                                Islamabad PUNJAB 00000 Pakistan</p>
                            <p><b>Phone: </b>051-5147224</p>
                            <p><b>Email: </b>info@infinigration.com4</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-5xl uppercase font-medium text-accent">Invoice</p>
                        <p><b>Date: </b> {date}</p>
                    </div>
                </div>

                <div className="mt-[32px] flex items-center justify-between">
                    <div>
                        <span><b className="text-xl font-semibold text-accent">Bill To</b></span>
                        <p>{invoice?.client?.profile?.name}</p>
                        <p><b className="text-text">Phone: </b> {invoice?.client?.profile?.phone}</p>
                        <p><b className="text-text">Program</b> {invoice?.client?.profile?.program?.title}</p>
                    </div>

                    <div>
                        <table className="!w-fit">
                            <tr>
                                <td className="border border-zinc-400 min-w-[150px]"><b className="font-[500]">Payment Terms</b></td>
                                <td className="border border-zinc-400 min-w-[150px]">Installments</td>
                            </tr>
                            <tr>
                                <td className="border border-zinc-400 min-w-[150px]"><b className="font-[500]">Due Date</b></td>
                                <td className="border border-zinc-400 min-w-[150px]">
                                    <input type="date" className="!p-0 !bg-transparent" />
                                </td>
                            </tr>
                            {/* <tr>
                                <td className="border border-zinc-400 min-w-[150px]"><b className="font-[500]">Sales Person</b></td>
                                <td className="border border-zinc-400 min-w-[150px]">Shahzaib Khan</td>
                            </tr> */}


                        </table>
                    </div>
                </div>

                <table className="mt-[16px]">
                    <thead>
                        <tr>
                            <th>Sr</th>
                            <th>Stage</th>
                            <th>Description</th>
                            <th>Total Cost</th>

                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-td">
                            <td>1</td>
                            <td>{invoice?.invoiceItem?.title}</td>
                            <td>{invoice?.invoiceItem?.description}</td>
                            <td>{invoice?.invoiceItem?.amount} <span className="uppercase">{invoice?.currency}</span></td>

                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-[16px]">
                    <p>Scan</p>

                    <div className="bg-zinc-100 p-[16px] min-w-[400px] rounded-lg">
                        <p className="text-5xl font-medium text-accent"> <span className="uppercase text-5xl">{invoice?.currency}</span> {invoice?.invoiceItem?.amount}</p>
                        <span className="text-lg text-accent">{numberToWords(invoice?.invoiceItem?.amount)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-[32px]">
                    <div></div>
                    <div className="w-[400px] ">
                        <p>
                            Certified that the particulars given above are true and correct
                            For infinigration
                        </p>

                        <hr className="mt-[64px] mb-[16px] border-text" />
                        <p className="text-lg font-semibold">Authorized Signatory</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ViewInvoice
