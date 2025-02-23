import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import { getTransactionsByType } from '../../../redux/actions/account';
import IncomeFilter from '../../../components/IncomeFilter';

const Expenses = () => {
    const [date, setDate] = useState(moment().tz("Asia/Karachi").format("YYYY-MM-DD"))
    const [category, setCategory] = useState({ value: "all", label: "All" });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTransactionsByType("expense", date))
    }, [])
    const { transactions } = useSelector(state => state.account)

    const filteredTransactions = transactions
        ? transactions.filter(t => category.value === "all" || t.category === category.value)
        : [];
    return (
        <section>
            <IncomeFilter filter={"expense"} date={date} setDate={setDate} category={category} setCategory={setCategory} />


            <table>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTransactions && filteredTransactions.length > 0 ? filteredTransactions.map((t, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{t.createdAt}</td>
                            <td>
                                {t.category.split("_").map((c, i) => <span key={i} className="capitalize">{c} </span>)}
                            </td>
                            <td>{t.amount} <span className='uppercase'>{t.currency}</span></td>
                            <td>
                                <div className="actions">
                                    <Link target='_blank' to={t.file.url}>View Receipt</Link>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default Expenses
