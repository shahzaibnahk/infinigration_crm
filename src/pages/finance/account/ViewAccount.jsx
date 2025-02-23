import React, { useEffect, useState } from 'react'
import { BsGraphUpArrow } from "react-icons/bs";
import AccountStat from '../../../components/AccountStat';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountById } from '../../../redux/actions/account';
import moment from 'moment-timezone';
import { capitalizeWords } from '../../../utils/utils';
import ViewAccountFilter from '../../../components/ViewAccountFilter';
import Loading from '../../Loading';

const ViewAccount = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const date = moment.tz("Asia/Karachi").format("YYYY-MM-DD")
    const [type, setType] = useState({ value: "all", label: "All" });
    const [tag, setTag] = useState({ value: "all", label: "All" });

    const { account, loading } = useSelector(state => state.account)

    useEffect(() => {
        dispatch(getAccountById(id, date))
    }, [id, date])

    // Filter Transactions Based on Selected Tag & Type
    const filteredTransactions = account?.transactions?.filter(t => {
        if (type != "" && tag != "") {
            return (
                (type?.value === "all" || t.type === type.value) &&
                (tag?.value === "all" || t.category === tag.value)
            );
        }
    });


    console.log(account?.transactions)
    console.log(filteredTransactions)

    return (
        loading || !account ? <Loading /> : (
            <section className='w-full'>
                <div className="stats grid grid-cols-4 gap-[16px]">
                    <AccountStat icon={BsGraphUpArrow} title={"Current Balance"} currency={account.currency} amount={account?.stats?.currentBalance || 0} />
                    <AccountStat icon={BsGraphUpArrow} title={"Income This Month"} currency={account.currency} amount={account?.stats?.incomings || 0} />
                    <AccountStat icon={BsGraphUpArrow} title={"Expense This Month"} currency={account.currency} amount={account?.stats?.expenses || 0} />
                    <AccountStat icon={BsGraphUpArrow} title={"Profit This Month"} currency={account.currency} amount={account?.stats?.profit || 0} />
                </div>

                {/* View Account Filters */}
                <ViewAccountFilter tag={tag} setTag={setTag} type={type} setType={setType} />

                {/* Transactions Table */}
                <table>
                    <thead>
                        <tr>
                            <th>Sr</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTransactions && filteredTransactions.map((t, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{t.createdAt}</td>
                                <td>{capitalizeWords(t.type)}</td>
                                <td>{t.amount} {capitalizeWords(t.currency)}</td>
                                <td>
                                    {t.category.split("_").map((c, i) => <span key={i} className="capitalize">{c} </span>)}
                                </td>
                                <td>
                                    <div className="actions">
                                        <Link target='_blank' to={t.file.url}>View Receipt</Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        )
    )
}

export default ViewAccount;
