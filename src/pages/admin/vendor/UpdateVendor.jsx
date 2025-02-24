import React, { useEffect, useState } from "react";
import Select from "react-select";
import { styles } from "../../../select/styles";
import { countriesOptions, currencyOptions } from "../../../select/options";
import { useDispatch, useSelector } from "react-redux";
import { getProgramAsOptions } from "../../../redux/actions/program";
import { useAlert } from "../../../hooks/userAlert";
import { createVendor, getVendorById } from "../../../redux/actions/vendor";
import moment from "moment-timezone";
import Loading from "../../Loading";
import { useParams } from "react-router-dom";

const UpdateVendor = () => {
  const dispatch = useDispatch();
  const alert = useAlert("");
  const { id } = useParams();
  // Vendor state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState({ value: "pak", label: "Pakistan" });
  const date = moment().tz("Asia/Karachi").format("YYYY-MM-DD");

  // Programs state
  const [programs, setPrograms] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    dispatch(getProgramAsOptions());
  }, []);

  const { programOptions } = useSelector((state) => state.program);
  const { loading, error, message, vendor } = useSelector(
    (state) => state.vendor
  );

  const addProgram = () => {
    setPrograms([...programs, null]); // Default program is null
    setAmounts([...amounts, ""]); // Default amount is empty
    setCurrencies([...currencies, currencyOptions[0]]); // Default currency
  };

  const removeProgram = (index) => {
    setPrograms(programs.filter((_, i) => i !== index));
    setAmounts(amounts.filter((_, i) => i !== index));
    setCurrencies(currencies.filter((_, i) => i !== index));
  };

  const handleProgramChange = (selectedOption, index) => {
    const updatedPrograms = [...programs];
    updatedPrograms[index] = selectedOption ? selectedOption.value : null;
    setPrograms(updatedPrograms);
  };

  const handleAmountChange = (e, index) => {
    const updatedAmounts = [...amounts];
    updatedAmounts[index] = e.target.value;
    setAmounts(updatedAmounts);
  };

  const handleCurrencyChange = (selectedOption, index) => {
    const updatedCurrencies = [...currencies];
    updatedCurrencies[index] = selectedOption;
    setCurrencies(updatedCurrencies);
  };

  useEffect(() => {
    dispatch(getVendorById(id));
    setName(vendor?.name)
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const vendorData = programs.map((program, index) => ({
      program,
      amount: amounts[index],
      currency: currencies[index].value,
    }));

    dispatch(createVendor(name, email, country.label, vendorData, date));
  };

  useEffect(() => {
    alert(message, error, `/admin/vendors/all`);
  }, [error, message]);

  return loading ? (
    <Loading />
  ) : (
    <section>
      <form onSubmit={submitHandler} className="w-full flex flex-col gap-[4px]">
        <label>
          <span>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Vendor Name"
          />
        </label>

        <label>
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Vendor Email"
          />
        </label>

        <label>
          <span>Country</span>
          <Select
            value={country}
            onChange={setCountry}
            options={countriesOptions}
            styles={styles}
          />
        </label>

        <label>
          <span>Programs</span>
          <div className="flex flex-col gap-[12px]">
            {programs.map((program, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_1fr_auto] gap-[8px] items-center"
              >
                {/* Program Select */}
                <Select
                  styles={styles}
                  value={
                    (programOptions &&
                      programOptions.length > 0 &&
                      programOptions.find((p) => p.value === program)) ||
                    null
                  }
                  options={programOptions}
                  onChange={(selectedOption) =>
                    handleProgramChange(selectedOption, index)
                  }
                />
                {/* Amount Input */}
                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amounts[index]}
                  onChange={(e) => handleAmountChange(e, index)}
                />
                {/* Currency Select */}
                <Select
                  styles={styles}
                  value={currencies[index]}
                  options={currencyOptions}
                  onChange={(selectedOption) =>
                    handleCurrencyChange(selectedOption, index)
                  }
                />
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeProgram(index)}
                  className="text-red-500"
                >
                  ✖
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addProgram}
              className="primary-btn !bg-text !font-[500]"
            >
              Add Program
            </button>
          </div>
        </label>

        <button className="primary-btn">Submit</button>
      </form>
    </section>
  );
};

export default UpdateVendor;
