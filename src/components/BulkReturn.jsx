import Select from "react-select"
import { styles } from "../select/styles"
import { returnedLeadOptions } from "../select/options"

const BulkReturn = ({ reason, setReason, description, setDescription, submitHandler }) => {
    return (
        <form onSubmit={submitHandler} action="" className="w-full">
            <h2>Bulk Return</h2>
            <label htmlFor="">
                <span>Reason</span>
                <Select options={returnedLeadOptions} value={reason} onChange={setReason} styles={styles} placeholder="Choose reason" />
            </label>

            <label htmlFor="">
                <span>Description</span>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" className="!resize-none !h-[100px]" placeholder="Write reason breifly"></textarea>
            </label>
            <button className="primary-btn !p-[10px]">Submit</button>
        </form>
    )
}

export default BulkReturn
