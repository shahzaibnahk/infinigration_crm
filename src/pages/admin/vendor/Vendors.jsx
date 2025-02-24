import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVendors } from '../../../redux/actions/vendor';
import Loading from '../../Loading';
import { Link } from 'react-router-dom';

const Vendors = () => {
    const dispatch = useDispatch();
    const { vendors, loading } = useSelector(state => state.vendor)
    useEffect(() => {
        dispatch(getAllVendors())
    }, [])
    return (
        loading || !vendors ? <Loading /> : <section className='w-full'>
            <table>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Programs</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {vendors && vendors.length > 0 ? vendors.map((v, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{v.name}</td>
                            <td>{v.email}</td>
                            <td className='capitalize'>{v.country}</td>
                            <td className='capitalize'>{v.programs.map((p, index) => <span key={index}>{p.program.country} {p.program.title}</span>)}</td>
                            <td>
                                <div className='actions'>
                                    <Link to={`/admin/vendor/${v._id}`}>View</Link>
                                    <Link to={`/admin/vendor/${v._id}/update`}>Update</Link>
                                    <button>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default Vendors
