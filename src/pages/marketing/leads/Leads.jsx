import { useParams } from 'react-router-dom'
import Select from 'react-select'
import { bgWhiteStyles } from '../../../select/styles'
import MarketingFilter from '../../../components/MarketingFilter'

const Leads = () => {
    const { id } = useParams()

    return (
        <section>
            <div className="actions-row flex items-center justify-between w-full">
                <div className='flex items-center gap-[8px] w-1/2'>
                    <Select className='w-[400px]' styles={bgWhiteStyles} placeholder="Bulk Assign Lead" />
                    <button className='primary-small-btn'>Bulk Assign</button>
                </div>

                <div className='flex items-center gap-[8px]'>
                    <button className='primary-small-btn'>Download Excel</button>
                    <button className='primary-small-btn'>Bulk Delete</button>
                </div>
            </div>

            <MarketingFilter />

            <table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Program</th>
                        <th>Assigned To</th>
                        <th>{id === "fresh" ? "Actions" : id === "returned" || id==="shuffled" ? "Remarks" : ""}</th>
                    </tr>
                </thead>

                <tbody></tbody>
            </table>
        </section>
    )
}

export default Leads
