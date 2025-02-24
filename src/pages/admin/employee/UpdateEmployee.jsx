import Select from "react-select";
import { styles } from "../../../select/styles";
import { useEffect, useState } from "react";
import { useAlert } from "../../../hooks/userAlert";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUserById } from "../../../redux/actions/admin";
import Loading from "../../Loading";
import { genderOptions, maritalStatusOptions, nationalityOptions, roleOptions } from "../../../select/options";
import { useParams } from "react-router-dom";

const UpdateEmployee = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert("");

    const { loading, error, message, employee } = useSelector((state) => state.admin);

    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [cnic, setCnic] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState(null);
    const [dob, setDob] = useState("");
    const [maritalStatus, setMaritalStatus] = useState(null);
    const [religion, setReligion] = useState("");
    const [nationality, setNationality] = useState(null);
    const [jobTitle, setJobTitle] = useState("");
    const [role, setRole] = useState(null);
    const [salary, setSalary] = useState("");

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (employee) {
            setName(employee?.name || "");
            setFatherName(employee?.fatherName || "");
            setCnic(employee?.cnic || "");
            setMobile(employee?.mobile || "");
            setEmail(employee?.email || "");
            setGender(genderOptions.find((g) => g.value === employee?.gender) || null);
            setDob(employee?.dob || "");
            setMaritalStatus(maritalStatusOptions.find((m) => m.value === employee?.maritalStatus) || null);
            setReligion(employee?.religion || "");
            setNationality(nationalityOptions.find((n) => n.value === employee?.nationality) || null);
            setJobTitle(employee?.jobTitle || "");
            setRole(roleOptions.find((r) => r.value === employee?.role) || null);
            setSalary(employee?.salary || "");
        }
    }, [employee]);

    useEffect(() => {
        alert(message, error, `/admin/employees/all`);
    }, [error, message]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser(id, {
                name,
                fatherName,
                cnic,
                mobile,
                email,
                gender: gender?.value,
                dob,
                maritalStatus: maritalStatus?.value,
                religion,
                nationality: nationality?.value,
                jobTitle,
                role: role?.value,
                salary,
            })
        );
    };

    return loading ? (
        <Loading />
    ) : (
        <section className="w-full">
            <form onSubmit={submitHandler} className="w-full bg-white flex flex-col gap-[4px]">
                <label>
                    <span>Name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Employee Name" />
                </label>

                <label>
                    <span>Father Name</span>
                    <input value={fatherName} onChange={(e) => setFatherName(e.target.value)} type="text" placeholder="Enter Employee Father Name" />
                </label>

                <label>
                    <span>CNIC</span>
                    <input value={cnic} onChange={(e) => setCnic(e.target.value)} type="text" placeholder="Enter Employee CNIC" />
                </label>

                <label>
                    <span>Mobile</span>
                    <input value={mobile} onChange={(e) => setMobile(e.target.value)} type="text" placeholder="Enter Employee Mobile Number" />
                </label>

                <label>
                    <span>Email</span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Employee Email" />
                </label>

                <label>
                    <span>Gender</span>
                    <Select options={genderOptions} value={gender} onChange={setGender} styles={styles} placeholder="Choose Gender" />
                </label>

                <label>
                    <span>Date of Birth</span>
                    <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" />
                </label>

                <label>
                    <span>Marital Status</span>
                    <Select options={maritalStatusOptions} value={maritalStatus} onChange={setMaritalStatus} styles={styles} placeholder="Choose Marital Status" />
                </label>

                <label>
                    <span>Religion</span>
                    <input value={religion} onChange={(e) => setReligion(e.target.value)} type="text" placeholder="Enter Employee Religion" />
                </label>

                <label>
                    <span>Nationality</span>
                    <Select options={nationalityOptions} value={nationality} onChange={setNationality} styles={styles} placeholder="Choose Employee Nationality" />
                </label>

                <label>
                    <span>Job Title</span>
                    <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} type="text" placeholder="Enter Job Title" />
                </label>

                <label>
                    <span>Role</span>
                    <Select options={roleOptions} value={role} onChange={setRole} styles={styles} placeholder="Choose Employee Role" />
                </label>

                <label>
                    <span>Salary</span>
                    <input value={salary} onChange={(e) => setSalary(e.target.value)} type="number" placeholder="Enter Employee Salary" />
                </label>

                <button className="primary-btn !mt-[4px]">Update</button>
            </form>
        </section>
    );
};

export default UpdateEmployee;
