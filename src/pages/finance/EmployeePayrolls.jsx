import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPayrolls } from "../../redux/actions/payroll"
import moment from "moment-timezone"
import { Link } from "react-router-dom"
import Avatar from "../../components/Avatar"
import Select from "react-select/base"
import { styles } from "../../select/styles"

const EmployeePayrolls = () => {
  const [date, setDate] = useState(moment().tz("Asia/Karachi").format("YYYY-MM-DD"))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPayrolls(date))
  }, [])

  const { payrolls } = useSelector(state => state.payroll)
  console.log(payrolls)
  return (
    <section className="w-full">
      <div className="w-full bg-white rounded-lg p-[16px] grid grid-cols-3 gap-[8px]">
        <label htmlFor="">
          <span>Filter By Employee</span>
          <Select styles={styles} placeholder="Choose Employee" />
        </label>

        <label htmlFor="">
          <span>Filter By Department</span>
          <Select styles={styles} placeholder="Choose Employee" />
        </label>

        <label htmlFor="">
          <span>Filter By Date</span>
          <input type="date" />
        </label>

      </div>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Employee</th>
            <th>Basic Salary</th>
            <th>Commission</th>
            <th>Deductions</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payrolls && payrolls.length > 0 && payrolls.map((p, index) =>
            <tr key={index}>
              <td>{p.months[0].month}</td>
              <td>
                <Avatar image={p.employee.avatar.url} name={p.employee.name} designation={p.employee.role} />
              </td>
              <td>{p.months[0].basicSalary} PKR</td>
              <td>{p.months[0].commissions.reduce((c, a) => c + a.amount, 0)} PKR</td>
              <td>{p.months[0].deductions.reduce((c, a) => c + a.amount, 0)} PKR</td>

              <td>
                <div className="actions">
                  <Link to={`/finance/employee_payrolls/${p.employee._id}`}>View Details</Link>
                  <button>Mark Paid</button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}

export default EmployeePayrolls
