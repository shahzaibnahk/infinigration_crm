import Select from 'react-select'
import { styles } from '../../select/styles'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContractTemplateOptions } from '../../redux/actions/contractTemplate'
import { useParams } from 'react-router-dom'
import { getDepartment, getSignatory } from '../../redux/actions/department'
import { createClient } from '../../redux/actions/client'
import moment from 'moment-timezone'
import Loading from '../Loading'
import { useAlert } from '../../hooks/userAlert'

const AddNewClient = () => {
    const [contractTemplate, setContractTemplate] = useState("")
    const [installments, setInstallments] = useState([{ stage: "", remarks: "", amount: 0 }])
    const [operationsHead, setOperationsHead] = useState("")
    const [operationsSubordinate, setOperationsSubordinate] = useState("")
    const [discount, setDiscount] = useState(0)
    const [signatory, setSignatory] = useState("")
    const date = moment.tz("Asia/Karachi").format("YYYY-MM-DD")
    const dispatch = useDispatch()
    const { id } = useParams()
    const addInstallment = () => {
        setInstallments([...installments, { stage: "", remarks: "", amount: 0 }])
    }

    const removeInstallment = (index) => {
        setInstallments(installments.filter((_, i) => i !== index))
    }

    const updateInstallment = (index, field, value) => {
        const updatedInstallments = [...installments]
        updatedInstallments[index][field] = value
        setInstallments(updatedInstallments)
    }

    useEffect(() => {
        dispatch(getContractTemplateOptions(id))
        dispatch(getDepartment("operations"))
        dispatch(getSignatory("admin"))
    }, [id])

    const { templateOptions } = useSelector(state => state.contractTemplate)
    const { department, adminDepartment } = useSelector(state => state.department)

    const operationOptions = department && department.length > 0 && department.map((d) => ({
        value: d._id,
        label: d.name
    }))

    const signatoryOptions = adminDepartment && adminDepartment.length > 0 && adminDepartment.map((d) => ({
        value: d._id,
        label: d.name
    }))

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createClient(id, contractTemplate, installments, operationsHead, operationsSubordinate, discount, signatory, date))
    }

    const { loading, error, message } = useSelector(state => state.client)

    const alert = useAlert()

    useEffect(() => {
        alert(message, error, "/operations/clients")
    }, [error, message])

    return (
        loading ? <Loading /> : <section className='w-full'>
            <form className='w-full flex flex-col gap-[4px]' onSubmit={submitHandler}>
                <label>
                    <span>Contract Template</span>
                    <Select
                        options={templateOptions}
                        placeholder="Choose Contract Template"
                        styles={styles}
                        onChange={(option) => setContractTemplate(option?.value)}
                    />
                </label>

                <label>
                    <span>Installments</span>
                    {installments.map((installment, index) => (
                        <div key={index} className="grid grid-cols-[1fr_1fr_1fr_120px] gap-[4px] items-center">
                            <input
                                type="text"
                                placeholder="Stage"
                                className="input mb-[4px]"
                                value={installment.stage}
                                onChange={(e) => updateInstallment(index, "stage", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Remarks"
                                className="input mb-[4px]"
                                value={installment.remarks}
                                onChange={(e) => updateInstallment(index, "remarks", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className="input mb-[4px]"
                                value={installment.amount}
                                onChange={(e) => updateInstallment(index, "amount", Number(e.target.value))}
                            />
                            <button
                                type="button"
                                onClick={() => removeInstallment(index)}
                                className="secondary-btn !bg-red-600 p-[12px] rounded-md text-white"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addInstallment}
                        className="primary-btn !bg-text"
                    >
                        Add Installment
                    </button>
                </label>

                <label>
                    <span>Operations Head</span>
                    <Select
                        options={operationOptions}
                        placeholder="Choose Operations Head"
                        styles={styles}
                        onChange={(option) => setOperationsHead(option?.value)}
                    />
                </label>

                <label>
                    <span>Operations Subordinate</span>
                    <Select
                        options={operationOptions}
                        placeholder="Choose Operations Subordinate"
                        styles={styles}
                        onChange={(option) => setOperationsSubordinate(option?.value)}
                    />
                </label>

                <label>
                    <span>Discount</span>
                    <input
                        value={discount}
                        type='number'
                        placeholder="Choose Operations Subordinate"
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                </label>

                <label>
                    <span>Signatory</span>
                    <Select
                        placeholder="Choose Signatory"
                        styles={styles}
                        onChange={(option) => setSignatory(option?.value)}
                        options={signatoryOptions}
                    />
                </label>

                <button className='primary-btn !mt-[4px]' type="submit">Submit</button>
            </form>
        </section>
    )
}

export default AddNewClient
