import React, { useEffect } from 'react'
import Select from 'react-select'
import { getClientAsOptions } from '../redux/actions/client'
import { useDispatch, useSelector } from 'react-redux'
import { invoiceStatusFilter } from '../select/options'
import { styles } from '../select/styles'

const InvoiceFilter = ({ date, setDate, status, setStatus, client, setClient }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getClientAsOptions())
    }, [dispatch])

    const { clientOptions } = useSelector(state => state.client)

    // Function to clear filters
    const clearFilters = () => {
        setDate("")
        setStatus(null)
        setClient(null)
    }

    return (
        <div className='w-full p-[16px] bg-white rounded-lg grid grid-cols-3 gap-[16px]'>
            <label>
                <span>Filter By Client</span>
                <Select value={client} onChange={setClient} options={clientOptions} styles={styles} placeholder="Choose Client" />
            </label>
            <label>
                <span>Filter by Status</span>
                <Select value={status} onChange={setStatus} options={invoiceStatusFilter} styles={styles} placeholder="Choose Status" />
            </label>
            <label>
                <span>Filter by Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>

            {/* Clear Filters Button */}
            <button  onClick={clearFilters} className="primary-btn !w-fit text-sm !font-[400] !mt-0">
                Clear Filters
            </button>
        </div>
    )
}

export default InvoiceFilter
