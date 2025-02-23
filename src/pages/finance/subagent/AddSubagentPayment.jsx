import Select from "react-select";
import { styles } from "../../../select/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addSubagentPayment, getAllSubagents } from "../../../redux/actions/subagent";
import { getAllAccounts } from "../../../redux/actions/account";
import { currencyOptions } from "../../../select/options";
import moment from "moment-timezone";
import { useAlert } from "../../../hooks/userAlert";
import Loading from "../../Loading";

const AddSubagentPayment = () => {
    const [subagent, setSubagent] = useState({ value: "", label: "" });
    const [date, setDate] = useState(moment().tz("Asia/Karachi").format("YYYY-MM-DD"));
    const [programs, setPrograms] = useState([]);
    const [account, setAccount] = useState({ value: "", label: "" });
    const [currency, setCurrency] = useState({ value: "", label: "" });
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const { subagents, error, message, loading } = useSelector(state => state.subagent);
    const { accounts } = useSelector(state => state.account);
    const alert = useAlert("");

    useEffect(() => {
        dispatch(getAllSubagents());
        dispatch(getAllAccounts());
    }, [dispatch]);

    const subagentOptions = subagents?.map(s => ({
        value: s._id,
        label: s.name
    })) || [];

    const accountOptions = accounts?.map(a => ({
        value: a._id,
        label: a.title
    })) || [];

    useEffect(() => {
        if (subagent.value) {
            const selectedSubagent = subagents.find(s => s._id === subagent.value);
            if (selectedSubagent) {
                const programOptions = selectedSubagent.programs.map(p => ({
                    value: p.program._id,
                    label: `${p.program.country} ${p.program.title}`,
                    amount: p.amount
                }));
                setPrograms([{ program: null, amount: "" }]); // Reset programs on subagent change
                setAvailablePrograms(programOptions);
            }
        }
    }, [subagent, subagents]);

    const [availablePrograms, setAvailablePrograms] = useState([]);

    const handleProgramChange = (index, selectedProgram) => {
        const updatedPrograms = [...programs];
        updatedPrograms[index] = {
            program: selectedProgram?.value || "",
            amount: selectedProgram?.amount || ""
        };
        setPrograms(updatedPrograms);
    };

    const handleAmountChange = (index, value) => {
        const updatedPrograms = [...programs];
        updatedPrograms[index].amount = value;
        setPrograms(updatedPrograms);
    };

    const addProgram = () => {
        setPrograms([...programs, { program: null, amount: "" }]);
    };

    const removeProgram = (index) => {
        const updatedPrograms = [...programs];
        updatedPrograms.splice(index, 1);
        setPrograms(updatedPrograms);
    };

    const changeImageHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append('subagent', subagent.value);
        myForm.append('lineItems', JSON.stringify(programs));
        myForm.append('account', account.value);
        myForm.append('currency', currency.value);
        myForm.append('file', file);
        dispatch(addSubagentPayment(myForm, date));
    };

    useEffect(() => {
        alert(message, error, "/finance/subagent/payments");
    }, [message, error, alert]);

    return (
        loading ? <Loading /> : <section className="w-full">
            <form className="w-full flex flex-col gap-4" onSubmit={submitHandler}>
                <label>
                    <span>Subagent</span>
                    <Select value={subagent} onChange={setSubagent} options={subagentOptions} styles={styles} />
                </label>

                <div className="flex flex-col gap-2">
                    {programs.map((p, index) => (
                        <div key={index} className="grid grid-cols-[1fr_1fr_150px] gap-2 items-center">
                            <Select
                                value={availablePrograms.find(ap => ap.value === programs[index]?.program) || null}
                                onChange={(value) => handleProgramChange(index, value)}
                                options={availablePrograms}
                                placeholder="Choose Program"
                                styles={styles}
                            />
                            <input
                                type="number"
                                value={p.amount}
                                onChange={(e) => handleAmountChange(index, e.target.value)}
                                placeholder="Amount"
                                className="input-field"
                            />
                            <button type="button" onClick={() => removeProgram(index)} className="primary-btn !bg-red-500">
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addProgram} className="primary-btn !mt-0 !bg-text">
                        Add
                    </button>
                </div>

                <label>
                    <span>Account</span>
                    <Select value={account} onChange={setAccount} options={accountOptions} styles={styles} />
                </label>

                <label>
                    <span>Currency</span>
                    <Select value={currency} onChange={setCurrency} options={currencyOptions} styles={styles} />
                </label>

                <label>
                    <span>Date</span>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>

                <label>
                    <span>Receipt</span>
                    <input type="file" onChange={changeImageHandler} />
                </label>

                <button className="primary-btn">Submit</button>
            </form>
        </section>
    );
};

export default AddSubagentPayment;
