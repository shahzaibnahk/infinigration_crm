import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { styles } from '../../../select/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getAllClients, getClientAsOptions } from '../../../redux/actions/client'
import { currencyOptions, trueFalseOptions } from '../../../select/options'
import { createInvoice, getInstallmentsByClient } from '../../../redux/actions/invoice'
import moment from 'moment-timezone'
import Loading from '../../Loading'
import { useAlert } from '../../../hooks/userAlert'

const AddNewInvoice = () => {

    const dispatch = useDispatch()
    const alert = useAlert("")
    const { clientOptions } = useSelector(state => state.client)
    const [client, setClient] = useState({ value: "", label: "" });
    const [currency, setCurrency] = useState({ value: "", label: "" })
    const [invoiceItem, setInvoiceItem] = useState({ value: "", label: "" })
    const [salesCommission, setSalesCommission] = useState({ value: "", label: "" })
    const [operationsHeadCommission, setOperationsHeadCommission] = useState({ value: "", label: "" })
    const [operationSubOrdinateCommission, setOperationSubOrdinateComission] = useState({ value: "", label: "" })
    const date = moment().tz("Asia/Karachi").format("YYYY-MM-DD")

    const { installments, loading, error, message } = useSelector(state => state.invoice)
    let invoiceItemOptions = installments && installments.length ? installments.map((i) => ({
        value: i._id,
        label: i.stage
    })) : []

    useEffect(() => {
        dispatch(getClientAsOptions())
    }, [])

    useEffect(() => {
        if (client.value !== "") {
            dispatch(getInstallmentsByClient(client.value))
        }

    }, [client.value])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(invoiceItemOptions)
        let selectedInvoiceItem = installments.find((i) => i._id === invoiceItem.value)

        selectedInvoiceItem = {
            title: selectedInvoiceItem?.stage,
            description: selectedInvoiceItem?.remarks,
            amount: selectedInvoiceItem?.amount,
        }

        console.log(client.value,
            currency.value,
            selectedInvoiceItem,
            date,
            salesCommission.value,
            operationsHeadCommission.value,
            operationSubOrdinateCommission.value)
        dispatch(createInvoice(
            client.value,
            currency.value,
            selectedInvoiceItem,
            date,
            salesCommission.value,
            operationsHeadCommission.value,
            operationSubOrdinateCommission.value
        ))
    }


    useEffect(() => {
        alert(message, error, `/finance/invoices/all`)
    }, [error, message])

    return (
        loading ? <Loading /> : <section className='w-full'>
            <form onSubmit={submitHandler} action="" className='w-full flex flex-col gap-[4px]'>
                <label>
                    <span>Client</span>
                    <Select value={client} onChange={setClient} options={clientOptions} styles={styles} placeholder="Enter Client Name" />
                </label>

                <label>
                    <span>Currency</span>
                    <Select value={currency} onChange={setCurrency} options={currencyOptions} styles={styles} placeholder="Enter Client Name" />
                </label>

                <label>
                    <span>Invoice Item</span>
                    <Select value={invoiceItem} onChange={setInvoiceItem} options={invoiceItemOptions} styles={styles} placeholder="Enter Client Name" />
                </label>

                <label>
                    <span>Sales Commission</span>
                    <Select value={salesCommission} onChange={setSalesCommission} options={trueFalseOptions} styles={styles} placeholder="Enter Client Name" />
                </label>

                <label>
                    <span>Operations Head Commission</span>
                    <Select value={operationsHeadCommission} onChange={setOperationsHeadCommission} options={trueFalseOptions} styles={styles} placeholder="Enter Client Name" />
                </label>

                <label>
                    <span>Operations Subordinate Commission</span>
                    <Select value={operationSubOrdinateCommission} onChange={setOperationSubOrdinateComission} options={trueFalseOptions} styles={styles} placeholder="Enter Client Name" />
                </label>

                <button className='primary-btn !mt-[4px]'>Submit</button>

            </form>
        </section>
    )
}

export default AddNewInvoice
