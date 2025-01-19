import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClientProfile, submitClientDocument } from '../redux/actions/lead'
import { Link, useParams } from 'react-router-dom'
import Loading from '../pages/Loading'
import toast from 'react-hot-toast'
import { useAlert } from '../hooks/userAlert'

const Documents = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { profile, loading, error, message } = useSelector(state => state.lead)
    const [file, setFile] = useState(null)
    useEffect(() => {
        dispatch(getClientProfile(id))
    }, [])

    const changeImageHandler = (e, dId) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size exceeds 5MB.");
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFile(file);
                const myForm = new FormData()
                myForm.append("file", file)
                dispatch(submitClientDocument(dId, id, myForm))

            };
        }


    };

    const alert = useAlert()

    useEffect(() => {
        alert(message, error, `/sales/lead/${id}/activities`)
    }, [error, message])

    return (
        loading ? <Loading /> || !profile : <table>
            <thead>
                <tr>
                    <th>Sr</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {profile && profile.documents.length > 0 ? profile.documents.map((d, index) => <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{d.title}</td>
                    <td>{d.status}</td>
                    <td>
                        <div className='actions flex items-center'>
                            <label className="w-fit bg-accent text-white px-4  py-[5px] text-sm rounded">
                                Upload
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => { changeImageHandler(e, d._id) }}
                                />
                            </label>

                            {d.status === "uploaded" && <Link to={`${d.media.public_url}`} target='_blank' className='!w-fit !h-fit'>View</Link>}
                        </div>
                    </td>
                </tr>) : ""}
            </tbody>
        </table >
    )
}

export default Documents
