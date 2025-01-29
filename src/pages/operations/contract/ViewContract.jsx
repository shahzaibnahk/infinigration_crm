import { useDispatch, useSelector } from "react-redux"
import logo from "../../../assets/images/logo.png"
import { useEffect } from "react"
import { getClientById } from "../../../redux/actions/client"
import { useParams } from "react-router-dom"
import Loading from "../../Loading"

const ViewContract = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getClientById(id))
    }, [id])

    const { client, loading } = useSelector(state => state.client)



    return (
        loading ? <Loading /> || !client : <section className="w-full bg-white p-[16px] rounded-lg">
            <div className="w-full flex items-center justify-between text-lg">
                <img className="w-[120px]" src={logo} alt="" />
                <p className="text-3xl font-[600] text-text">infinigration</p>
            </div>
            <h1 className="text-4xl font-[600] text-text text-center">{client?.profile?.program?.country + " " + client?.contractTemplate?.title}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Consultant Name</th>
                        <th>Company Name</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-td">
                        <td>{client?.salesPerson?.name}</td>
                        <td>Infinigration Consulting</td>
                        <td>{client.createdAt}</td>
                    </tr>
                </tbody>
            </table>

            <table className="!mt-[8px]">
                <thead>
                    <tr>
                        <th>Office Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-td">
                        <td>Plaza 38, 2nd Floor, Westeria Centre, Westeria Road, Sector A, DHA II, Islamabad, Pakistan</td>
                    </tr>
                </tbody>
            </table>

            <table className="!mt-[8px]">
                <thead>
                    <tr>
                        <th>Mobile Number</th>
                        <th>Email Id</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-td">
                        <td>051-5147224</td>
                        <td>info@infinigration.com</td>
                    </tr>
                </tbody>
            </table>

            <table className="!mt-[8px]">
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Date of Birth</th>
                        <th>CNIC No</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-td">
                        <td>{client?.profile?.name}</td>
                        <td>{client?.profile?.dob || "Nill"}</td>
                        <td>{client?.profile?.cnic || "Nill"}</td>
                        <td>{client?.profile?.address || "Nill"}</td>
                    </tr>
                </tbody>
            </table>

            <table className="!mt-[8px]">
                <thead>
                    <tr>
                        <th>Mobile No</th>
                        <th>Email Id</th>
                        <th>Contract No</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-td">
                        <td>{client?.profile?.phone}</td>
                        <td>{client?.profile?.email || "Nill"}</td>
                        <td>Dummy Number</td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-[16px]">
                <h2 className="text-center text-2xl font-[600]">Hereinafter referred to as the` `CLIENT’’) <br />
                    AND</h2>

                <p>infinigration Consulting herein referred to as the ``CONSULTANT’’ having its office \e 2nd Floor, Westeria Centre, Westeria Road, Sector A, DHA II, Islamabad, Pakistan.</p>
                <p>{client?.contractTemplate?.description}</p>
            </div>

            <div className="mt-[16px]">
                <h2 className="text-2xl font-[600]">DUTIES OF THE CONSULTANT</h2>
                <p>The CONSULTANT shall be responsible for the performance of the following:</p>
                <ul className="px-[16px]">

                    {
                        client?.contractTemplate?.dutiesOfConsultant.map((c, index) => <li className="list-disc" key={index}>{c}</li>
                        )
                    }
                </ul>
            </div>

            <div className="mt-[16px]">
                <h2 className="text-2xl font-[600]">DUTIES OF THE CLIENT</h2>
                <p>The CONSULTANT shall be responsible for the performance of the following:</p>
                <ul className="px-[16px]">
                    {
                        client?.contractTemplate?.dutiesOfClient.map((c, index) => <li className="list-disc" key={index}>{c}</li>
                        )
                    }
                </ul>
            </div>


            <div className="mt-[16px]">
                <h2 className="text-2xl font-[600]">AGREEMENT BY CLIENT</h2>
                <p>It is CLIENT’s sole responsibility to:</p>
                <ul className="px-[16px]">
                    {
                        client?.contractTemplate?.agreementByClient.map((c, index) => <li className="list-disc" key={index}>{c}</li>
                        )
                    }
                </ul>
            </div>

            <div className="mt-[16px]">
                <h2 className="text-2xl font-[600]">COSULTANCY FEE INSTALLMENTS AND PAYMENT SCHEDULE</h2>
                <p>It is CLIENT’s sole responsibility to:</p>
                <p>{client?.contractTemplate?.consultancyFeeAndSchedule.replace("${price}", client?.profile?.program?.totalCost)} {client?.profile?.program?.currency}</p>

                <table className="!mt-[8px]">
                    <thead>
                        <tr>
                            <th>Sr</th>
                            <th>Stage</th>
                            <th>Amount ({client?.profile?.program?.currency})</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>

                    <tbody>
                        {client?.installments.map((i, index) => <tr className="border-td" key={index}>
                            <td>{index + 1}</td>
                            <td>{i.stage}</td>
                            <td>{i.amount}</td>
                            <td>{i.remarks}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

            <div className="mt-[16px]">
                <h2 className="text-2xl font-[600]">Other Fees</h2>
                <table className="!mt-[8px]">
                    <thead>
                        <tr>
                            <th>Sr</th>
                            <th>Service</th>
                            <th>Amount ({client?.profile?.program?.currency})</th>
                            <th>Payment Term</th>
                        </tr>
                    </thead>

                    <tbody>
                        {client?.contractTemplate?.otherFees.map((i, index) => <tr className="border-td" key={index}>
                            <td>{index + 1}</td>
                            <td>{i.service}</td>
                            <td>{i.amount}</td>
                            <td>{i.paymentTerm}</td>
                        </tr>)}
                    </tbody>
                </table>


                <p className="mt-[8px]"><b>Note: </b>{client?.contractTemplate?.note}</p>
            </div>

            <div className="mt-[16px]">
                <h2 className="text-2xl font-[600]">REFUND POLICIES</h2>
                <p>The CONSULTANT shall be responsible for the performance of the following:</p>
                <ol className="px-[16px]">
                    {
                        client?.contractTemplate?.refundPolicies.map((c, index) => <li className="list-decimal" key={index}>{c}</li>
                        )
                    }
                </ol>
            </div>

            <div className="mt-[16px]">
                <h2 className="text-2xl font-[600]">CONSENT</h2>
                <p>{client?.contractTemplate?.consent}</p>

            </div>

            <div className="mt-[16px] flex items-center justify-between w-full">
                <div className="w-fit">
                    <h2 className="text-2xl font-[600]">Client Signature</h2>
                    <div className="border-b border-zinc-800 !mt-[48px] mb-[16px]" ></div>
                    <p className="text-lg"><b>Name: </b> {client?.profile?.name}</p>
                </div>

                <div className="w-fit">
                    <h2 className="text-2xl font-[600]">Authorized Signatory</h2>
                    <div className="border-b border-zinc-800 !mt-[48px] mb-[16px]" ></div>
                    <p className="text-lg"><b>Name: </b> {client?.signatory?.name}</p>
                </div>
            </div>




        </section>
    )
}

export default ViewContract
