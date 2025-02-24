import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubagents } from "../../../redux/actions/subagent";
import { Link } from "react-router-dom";

const Subagents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubagents());
  }, []);

  const { subagents } = useSelector((state) => state.subagent);

  

  return (
    <section className="w-full">
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {subagents && subagents.length > 0 ? (
            subagents.map((s, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>
                    <div className="actions">
                        <Link to={`/admin/subagent/${s._id}`}>View</Link>
                        <Link to={`/admin/subagent/${s._id}/update`}>Update</Link>
                        <button>Delete</button>
                    </div>
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Subagents;
