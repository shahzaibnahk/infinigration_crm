import { useEffect, useState } from "react";
import Select from "react-select";
import { styles } from "../../../select/styles";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../../hooks/userAlert";
import { getContractTemplateById, updateContractTemplate } from "../../../redux/actions/contractTemplate";
import moment from "moment-timezone";
import Loading from "../../Loading";
import { getProgramAsOptions } from "../../../redux/actions/program";
import { useParams } from "react-router-dom";

const UpdateTemplate = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, message, template } = useSelector(state => state.contractTemplate);
    const { programOptions } = useSelector(state => state.program);

    const { id } = useParams()

    const [program, setProgram] = useState(null);
    const [description, setDescription] = useState("");
    const [consultantDuties, setConsultantDuties] = useState("");
    const [clientDuties, setClientDuties] = useState("");
    const [agreementByClient, setAgreementByClient] = useState("");
    const [consultancyFee, setConsultancyFee] = useState("");
    const [otherFees, setOtherFees] = useState([]);
    const [note, setNote] = useState("");
    const [refundPolicies, setRefundPolicies] = useState("");
    const [consent, setConsent] = useState("");

    useEffect(() => {
        dispatch(getContractTemplateById(id));
        dispatch(getProgramAsOptions());
    }, [dispatch, id]);


    useEffect(() => {
        if (template) {
            setProgram(programOptions.find((c) => c.value.toString() === template.program._id.toString()) || null);
            setDescription(template?.description || "");
            setConsultantDuties(template?.dutiesOfConsultant.join(", ") || "");
            setClientDuties(template?.dutiesOfClient.join(", ") || "");
            setAgreementByClient(template?.agreementByClient.join(", ") || "");
            setConsultancyFee(template?.consultancyFeeAndSchedule || "");
            setOtherFees(template?.otherFees || []);
            setNote(template?.note || "");
            setRefundPolicies(template?.refundPolicies.join(", ") || "");
            setConsent(template?.consent || "");
        }
    }, [template, programOptions]);

    const handleAddFee = () => {
        setOtherFees([...otherFees, { service: "", paymentTerm: "", amount: "" }]);
    };

    const handleRemoveFee = (index) => {
        setOtherFees(otherFees.filter((_, i) => i !== index));
    };

    const handleInputChange = (e, index, field) => {
        const updatedFees = [...otherFees];
        updatedFees[index][field] = e.target.value;
        setOtherFees(updatedFees);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateContractTemplate(id, program?.value, description, consultantDuties, clientDuties, agreementByClient, consultancyFee, otherFees, note, refundPolicies, consent, moment.tz("Asia/Karachi").format()));
    };
    useEffect(() => {
        alert(message, error, '/operations/templates')
    }, [error,message])
    return loading ? <Loading /> : (
        <section className="w-full">
            <form onSubmit={submitHandler} className="w-full flex flex-col gap-[4px]">
                <label>
                    <span>Program</span>
                    <Select
                        options={programOptions}
                        styles={styles}
                        placeholder="Choose Program"
                        value={program}
                        onChange={setProgram}
                    />
                </label>

                <label>
                    <span>Description</span>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>

                <label>
                    <span>Duties of Consultant</span>
                    <textarea value={consultantDuties} onChange={(e) => setConsultantDuties(e.target.value)} />
                </label>

                <label>
                    <span>Duties of Clients</span>
                    <textarea value={clientDuties} onChange={(e) => setClientDuties(e.target.value)} />
                </label>

                <label>
                    <span>Agreement By Client</span>
                    <textarea value={agreementByClient} onChange={(e) => setAgreementByClient(e.target.value)} />
                </label>

                <label>
                    <span>Consultancy Fee and Schedule</span>
                    <textarea value={consultancyFee} onChange={(e) => setConsultancyFee(e.target.value)} />
                </label>

                <label>
                    <span>Other Fees</span>
                    {otherFees.map((fee, index) => (
                        <div key={index} className="grid grid-cols-[1fr_1fr_1fr_120px] gap-[8px] mb-[4px]">
                            <input type="text" placeholder="Enter Service" value={fee.service} onChange={(e) => handleInputChange(e, index, "service")} />
                            <input type="text" placeholder="Payment Term" value={fee.paymentTerm} onChange={(e) => handleInputChange(e, index, "paymentTerm")} />
                            <input type="number" placeholder="Amount" value={fee.amount} onChange={(e) => handleInputChange(e, index, "amount")} />
                            <button type="button" className="primary-btn !p-[12px] !bg-red-600" onClick={() => handleRemoveFee(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" className="primary-btn !bg-text" onClick={handleAddFee}>Add Other Fees</button>
                </label>

                <label>
                    <span>Note</span>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} />
                </label>

                <label>
                    <span>Refund Policies</span>
                    <textarea value={refundPolicies} onChange={(e) => setRefundPolicies(e.target.value)} />
                </label>

                <label>
                    <span>Consent</span>
                    <textarea value={consent} onChange={(e) => setConsent(e.target.value)} />
                </label>

                <button className="primary-btn">Update</button>
            </form>
        </section>
    );
};

export default UpdateTemplate;
