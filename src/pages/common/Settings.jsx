import { useEffect, useState } from "react";
import { generateProfilePicture } from "../../utils/assets"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions/admin";
import Loading from "../Loading";

const Settings = ({ isAuthenticated }) => {
    const dispatch = useDispatch()
    let [user, setUser] = useState({});
    const { id } = useParams()

    const { employee, loading, error, message } = useSelector(state => state.admin)

    useEffect(() => {
        dispatch(getUserById(id))
        setUser(employee)
    }, [id])

    return (
        loading ? <Loading /> : <section>
            <div className="bg-white p-[16px] rounded-lg ">
                <form action="" className="w-full flex flex-col gap-[4px]">
                    <h2 className="">Profile Picture</h2>
                    <div className="flex items-center gap-[16px] mb-[16px] ">
                        <img src={""} alt="" className="rounded-full w-[128px] h-[128px]" />
                        <div className={`w-[400px] ${isAuthenticated && user?.role === "admin" ? "block" : "hidden"}`}>
                            <input type="file" />
                            <button className="primary-btn !w-[120px] !mt-[8px] !p-[10px]">Submit</button>
                        </div>
                    </div>

                    <h2>Bio Data</h2>

                    <div className="mb-[16px]">
                        <label htmlFor="">
                            <span>Name</span>
                            <input value={user?.name} type="text" placeholder="Name" readOnly />
                        </label>

                        <label htmlFor="">
                            <span>Fathers Name</span>
                            <input value={user.fatherName} type="text" placeholder="Name" readOnly />
                        </label>

                        <label htmlFor="">
                            <span>CNIC</span>
                            <input value={user.cnic} type="text" placeholder="Name" readOnly />
                        </label>

                        <label htmlFor="">
                            <span>Mobile</span>
                            <input value={user.mobile} type="text" placeholder="Name" readOnly />
                        </label>

                        <label htmlFor="">
                            <span>Email</span>
                            <input value={user.email} type="text" placeholder="Name" readOnly />
                        </label>

                        <label htmlFor="">
                            <span>Gender</span>
                            <input value={user.gender} type="text" placeholder="Name" readOnly />
                        </label>

                        <label htmlFor="">
                            <span>Date of Birth</span>
                            <input value={user.dob} type="text" placeholder="Name" readOnly />
                        </label>

                        <label htmlFor="">
                            <span>Marital Status</span>
                            <input value={user.maritalStatus} type="text" placeholder="Name" readOnly />
                        </label>
                        <label htmlFor="">
                            <span>Religion</span>
                            <input value={user.religion} type="text" placeholder="Name" readOnly />
                        </label>

                        <label htmlFor="">
                            <span>Nationality</span>
                            <input value={user.nationality} type="text" placeholder="Name" readOnly />
                        </label>
                    </div>

                    <h2>Job</h2>
                    <div>
                        <label htmlFor="">
                            <span>Job Title</span>
                            <input value={user.jobTitle} type="text" placeholder="Name" readOnly />
                        </label>

                        <label htmlFor="">
                            <span>Department</span>
                            <input value={user.role} type="text" placeholder="Name" readOnly />
                        </label>

                        <label htmlFor="">
                            <span>Salary</span>
                            <input value={user.salary} type="text" placeholder="Name" readOnly />
                        </label>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Settings
