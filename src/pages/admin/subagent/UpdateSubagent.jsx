import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../../hooks/userAlert";
import {
  getSubagentById,
  updateSubagent,
} from "../../../redux/actions/subagent";
import { useParams } from "react-router-dom";
import moment from "moment-timezone";
import Loading from "../../Loading";

const UpdateSubagent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert("");
  const date = moment().tz("Asia/Karachi").format("YYYY-MM-DD");

  const { subagent, loading, error, message } = useSelector(
    (state) => state.subagent
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(getSubagentById(id));
    setName(subagent?.name || "");
    setEmail(subagent?.email || "");
  }, [dispatch, id]);

  useEffect(() => {
    alert(message, error, `/admin/subagents/all`);
  }, [message, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSubagent(id, name, email, date));
  };

  return loading ? (
    <Loading />
  ) : (
    <section className="w-full">
      <form onSubmit={submitHandler} className="w-full flex flex-col gap-[4px]">
        <label>
          <span>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Subagent Name"
          />
        </label>

        <label>
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Subagent Email"
          />
        </label>

        <button className="primary-btn inline-block !mt-[4px]">Update</button>
      </form>
    </section>
  );
};

export default UpdateSubagent;
