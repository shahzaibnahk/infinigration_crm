import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTransactionsByCategory } from "../../../redux/actions/account";
import moment from "moment-timezone";
import { Link } from "react-router-dom";

const VendorPayments = () => {
  const [date, setDate] = useState(moment().tz("Asia/Karachi").format("YYYY-MM-DD"));
  const dispatch = useDispatch()
  const { transactions } = useSelector(state => state.account)
  useEffect(() => {
    dispatch(getTransactionsByCategory("vendor_payment", date))
  }, []);


  return (
    <section className="w-full">
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions && transactions.length > 0 && transactions.map((t, index) => <tr key={index}>
            <td>{index + 1}</td>
            <td>{t.createdAt}</td>
            <td>{t.amount} <span className="uppercase">{t.currency}</span></td>
            <td>
              <div className="actions">
                <Link target="_blank" to={t.file.url}>View Receipt</Link>
              </div>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}

export default VendorPayments
