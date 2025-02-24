import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../../hooks/userAlert";
import { createSubAgent } from "../../../redux/actions/subagent";
import moment from "moment-timezone";
import Loading from "../../Loading";

const AddSubagent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const date = moment().tz("Asia/Karachi").format("YYYY-MM-DD");
  const dispatch = useDispatch();
  const alert = useAlert("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSubAgent(name, email, date));
  };

  const { loading, error, message } = useSelector((state) => state.subagent);

  useEffect(() => {
    alert(message, error, `/admin/subagents/all`)
  }, [error, message]);

  return loading ? (
    <Loading />
  ) : (
    <section className="w-full">
      <form onSubmit={submitHandler} action="" className="w-full flex flex-col gap-[4px]">
        <label htmlFor="">
          <span>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Subagent Name"
          />
        </label>

        <label htmlFor="">
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Subagent Email"
          />
        </label>

        <button className="primary-btn inline-block !mt-[4px]">Submit</button>
      </form>
    </section>
  );
};

export default AddSubagent;
