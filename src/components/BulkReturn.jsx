import Select from "react-select"
import { styles } from "../select/styles"

const BulkReturn = () => {
    return (
        <form action="" className="w-full">
            <h2>Bulk Return</h2>
            <label htmlFor="">
                <span>Reason</span>
                <Select styles={styles} placeholder="Choose reason" />
            </label>

            <label htmlFor="">
                <span>Description</span>
                <textarea name="" id="" className="!resize-none" placeholder="Write reason breifly"></textarea>
            </label>
            <button className="primary-btn">Submit</button>
        </form>
    )
}

export default BulkReturn
