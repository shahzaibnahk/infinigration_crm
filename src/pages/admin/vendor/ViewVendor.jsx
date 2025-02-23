import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getVendorById } from "../../../redux/actions/vendor"

const ViewVendor = () => {
    const [active, setActive] = useState("programs")
    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVendorById(id))
    }, [])

    const { vendor } = useSelector(state => state.vendor)

    console.log(vendor)
    return (
        <section className="w-full">
            <div className="w-full grid grid-cols-2 gap-[8px]">
                {
                    [{ value: 'programs', label: 'Programs' },
                    { value: 'payments', label: 'Payments' }
                        ,].map((p, index) =>
                            <button
                                onClick={() => setActive(p.value)}
                                key={index}
                                className={` p-3 rounded-lg ${active == p.value ? "bg-accent text-white" : "bg-white"} transition-all ease-out`}>
                                {p.label}
                            </button>
                        )
                }

            </div>

            <table>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Country</th>
                        <th>Title</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {vendor?.programs && vendor.programs?.map((p, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{p.program.country}</td>
                        <td>{p.program.title}</td>
                        <td>{p.amount} <span className="uppercase">{ p.currency}</span></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default ViewVendor
