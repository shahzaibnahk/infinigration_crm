import { useEffect, useState } from "react";
import Select from "react-select";
import { styles } from "../../../select/styles";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../../hooks/userAlert";
import { createContractTemplate } from "../../../redux/actions/contractTemplate";
import moment from "moment-timezone";
import Loading from "../../Loading";
import { getProgramAsOptions } from "../../../redux/actions/program";

const AddNewTemplate = () => {
  const [program, setProgram] = useState("");
  const [description, setDescription] = useState("");
  const [consultantDuties, setConsultantDuties] = useState("");
  const [clientDuties, setClientDuties] = useState("");
  const [agreementByClient, setAgreementByClient] = useState("");
  const [consultancyFee, setConsultancyFee] = useState("");
  const [otherFees, setOtherFees] = useState([
    { service: "", paymentTerm: "", amount: "" }
  ]);
  const [note, setNote] = useState("");
  const [refundPolicies, setRefundPolicies] = useState("");
  const [consent, setConsent] = useState("");

  const handleAddFee = () => {
    setOtherFees([
      ...otherFees,
      { service: "", paymentTerm: "", amount: "" }
    ]);
  };

  const handleRemoveFee = (index) => {
    const updatedFees = otherFees.filter((_, i) => i !== index);
    setOtherFees(updatedFees);
  };

  const handleInputChange = (e, index, field) => {
    const updatedFees = [...otherFees];
    updatedFees[index][field] = e.target.value;
    setOtherFees(updatedFees);
  };

  const dispatch = useDispatch()
  const alert = useAlert()
  const { loading, error, message } = useSelector(state => state.contractTemplate)
  const { programOptions } = useSelector(state => state.program)
  useEffect(() => {
    dispatch(getProgramAsOptions())
  }, [error, message])


  useEffect(() => {
    alert(message, error, '/operations/templates')
  }, [error, message])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createContractTemplate(program?.value, description, consultantDuties, clientDuties, agreementByClient, consultancyFee, otherFees, note, refundPolicies, consent, moment.tz("Asia/Karachi").format()))
  }

  return (
    loading ? <Loading /> : <section className="w-full">
      <form onSubmit={submitHandler} action="" className="w-full flex flex-col gap-[4px]">
        <label htmlFor="">
          <span>Program</span>
          <Select
            options={programOptions}
            styles={styles}
            placeholder="Choose Program"
            value={program}
            onChange={(selectedOption) => setProgram(selectedOption)}
          />
        </label>

        <label htmlFor="">
          <span>Description</span>
          <textarea
            placeholder="Write Contract Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label htmlFor="">
          <span>Duties of Consultant</span>
          <textarea
            placeholder="Write Consultant Duties with , separator"
            value={consultantDuties}
            onChange={(e) => setConsultantDuties(e.target.value)}
          />
        </label>

        <label htmlFor="">
          <span>Duties of Clients</span>
          <textarea
            placeholder="Write Client Duties with , separator"
            value={clientDuties}
            onChange={(e) => setClientDuties(e.target.value)}
          />
        </label>

        <label htmlFor="">
          <span>Agreement By Client</span>
          <textarea
            placeholder="Write Agreement by Client with , separator"
            value={agreementByClient}
            onChange={(e) => setAgreementByClient(e.target.value)}
          />
        </label>

        <label htmlFor="">
          <span>Consultancy Fee and Schedule</span>
          <textarea
            placeholder="Write Consultancy Fee and Schedule"
            value={consultancyFee}
            onChange={(e) => setConsultancyFee(e.target.value)}
          />
        </label>

        <label htmlFor="">
          <span>Other Fees</span>
          {otherFees.map((fee, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_1fr_120px] gap-[8px] mb-[4px]">
              <input
                type="text"
                placeholder="Enter Service"
                value={fee.service}
                onChange={(e) => handleInputChange(e, index, "service")}
              />
              <input
                type="text"
                placeholder="Payment Term"
                value={fee.paymentTerm}
                onChange={(e) => handleInputChange(e, index, "paymentTerm")}
              />
              <input
                type="number"
                placeholder="Amount"
                value={fee.amount}
                onChange={(e) => handleInputChange(e, index, "amount")}
              />
              <button
                type="button"
                className="primary-btn !p-[12px] !bg-red-600"
                onClick={() => handleRemoveFee(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="primary-btn !bg-text"
            onClick={handleAddFee}
          >
            Add Other Fees
          </button>
        </label>

        <label htmlFor="">
          <span>Note</span>
          <textarea
            placeholder="Write Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <label htmlFor="">
          <span>Refund Policies</span>
          <textarea
            placeholder="Write Refund Policies with , separator"
            value={refundPolicies}
            onChange={(e) => setRefundPolicies(e.target.value)}
          />
        </label>

        <label htmlFor="">
          <span>Consent</span>
          <textarea
            placeholder="Write Consent"
            value={consent}
            onChange={(e) => setConsent(e.target.value)}
          />
        </label>

        <button className="primary-btn">Submit</button>
      </form>
    </section>
  );
};

export default AddNewTemplate;
