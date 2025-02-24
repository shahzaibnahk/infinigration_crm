import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, getAllEmployees } from "../../../redux/actions/admin";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import { useAlert } from "../../../hooks/userAlert";

const Employees = () => {
  const dispatch = useDispatch()
  const alert = useAlert("")
  const { employees } = useSelector(state => state.admin)
  const { loading, error, message } = useSelector(state => state.admin)
  useEffect(() => {
    alert(message, error, '/admin/employees/all')
  }, [employees,])

  useEffect(() => {
    dispatch(getAllEmployees())
  }, [error, message])




  return loading ? <Loading /> : <section className="w-full">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>


      </thead>

      <tbody>
        {employees && employees.length > 0 && employees.map((e, index) =>
          <tr key={index}>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.mobile}</td>
            <td className="capitalize">{e.gender}</td>
            <td className="capitalize">{e.role}</td>
            <td>
              <div className="actions">
                <Link to={`/admin/employee/${e._id}/update`}>Update</Link>
                {/* <Link>Activity Logs</Link>
              <Link>Attendance Record</Link>
              <Link>Salary Record</Link> */}
                <button onClick={() => {
                  dispatch(deleteEmployee(e._id));
                }}>Delete</button>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>

  </section>;
};

export default Employees;
