import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAccount, getAllAccounts } from "../../../redux/actions/account";
import Loading from "../../Loading";
import { capitalizeWords } from "../../../utils/utils";
import { useAlert } from "../../../hooks/userAlert";
import moment from "moment-timezone";
import AccountFilter from "../../../components/AccountFilter";

const Accounts = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState({ value: "", label: "" });
    const [title, setTitle] = useState("");
    const { loading, accounts, message, error } = useSelector(state => state.account);
    const alert = useAlert();

    useEffect(() => {
        dispatch(getAllAccounts());
    }, []);

    useEffect(() => {
        alert(message, error, `/finance/accounts/all`);
    }, [message, error]);

    const deleteHandler = (id) => {
        dispatch(deleteAccount(id, moment().tz("Asia/Karachi").format("YYYY-MM-DD")));
    };

    // Apply filters
    const filteredAccounts = accounts?.filter(account => {
        const matchesType = type.value ? account.type.toLowerCase() === type.value.toLowerCase() : true;
        const matchesTitle = title ? account.title.toLowerCase().includes(title.toLowerCase()) : true;
        return matchesType && matchesTitle;
    });

    return loading || !accounts ? (
        <Loading />
    ) : (
        <section className="w-full">
            <AccountFilter type={type} setType={setType} title={title} setTitle={setTitle} />
            <table>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Account Title</th>
                        <th>Account Type</th>
                        <th>Currency</th>
                        <th>Last Activity</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAccounts.map((account, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{account.title}</td>
                            <td>{capitalizeWords(account.type)}</td>
                            <td>{capitalizeWords(account.currency)}</td>
                            <td>
                                {account.lastActivity
                                    ? `Type: ${capitalizeWords(account.lastActivity.type)}, Amount: ${account.lastActivity.amount} ${capitalizeWords(account.currency)}`
                                    : "Nill"}
                            </td>
                            <td>{account.createdAt || "Nill"}</td>
                            <td>
                                <div className="actions">
                                    <Link to={`/finance/account/${account._id}`}>View</Link>
                                    <Link to={`/finance/account/${account._id}/add-owner-capital`}>Add Owner Capital</Link>
                                    <Link to={`/finance/account/${account._id}/update`}>Update</Link>
                                    <button onClick={() => deleteHandler(account._id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Accounts;
