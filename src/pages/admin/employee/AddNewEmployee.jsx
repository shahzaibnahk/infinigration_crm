import Select from "react-select";
import { styles } from "../../../select/styles";
import { useEffect, useState } from "react";
import { useAlert } from "../../../hooks/userAlert";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../../redux/actions/admin";
import Loading from "../../Loading";
import { genderOptions, maritalStatusOptions, nationalityOptions, roleOptions } from "../../../select/options";

const AddNewEmployee = () => {
  const [name, setName] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [cnic, setCnic] = useState("")
  const [mobile, setMobile] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState({ value: "", label: "" })
  const [dob, setDob] = useState("")
  const [maritalStatus, setMaritalStatus] = useState({ value: "", label: "" })
  const [religion, setReligion] = useState("")
  const [nationality, setNationality] = useState("")
  const [jobTitle, setJobTitle] = useState("");
  const [role, setRole] = useState({ value: "", label: "" });
  const [salary, setSalary] = useState(0)

  const { loading, error, message } = useSelector(state => state.admin)

  const alert = useAlert("")




  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createEmployee(name,
      fatherName,
      cnic,
      mobile,
      email,
      password,
      gender.value,
      dob,
      maritalStatus.value,
      religion,
      nationality.value,
      jobTitle,
      role.value,
      salary
    ))

  }

  useEffect(() => {
    alert(message, error, `/admin/employees/all`)
  }, [error, message])

  return (
    loading ? <Loading /> : <section className="w-full">
      <form onSubmit={submitHandler} action="" className="w-full bg-white flex flex-col gap-[4px]">
        <label htmlFor="">
          <span>Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Employee Name" />
        </label>

        <label htmlFor="">
          <span>Father Name</span>
          <input value={fatherName} onChange={(e) => setFatherName(e.target.value)} type="text" placeholder="Enter Employee Father Name" />
        </label>

        <label htmlFor="">
          <span>CNIC</span>
          <input value={cnic} onChange={(e) => setCnic(e.target.value)} type="text" placeholder="Enter Employee CNIC" />
        </label>

        <label htmlFor="">
          <span>Mobile</span>
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} type="text" placeholder="Enter Employee Mobile Number" />
        </label>

        <label htmlFor="">
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Employee Email" />
        </label>

        <label htmlFor="">
          <span>Password</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Enter Employee Password" />
        </label>

        <label htmlFor="">
          <span>Gender</span>
          <Select options={genderOptions} value={gender} onChange={setGender} styles={styles} placeholder="Choose Gender" />
        </label>

        <label htmlFor="">
          <span>Date of Birth</span>
          <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" />
        </label>

        <label htmlFor="">
          <span>Marital Status</span>
          <Select options={maritalStatusOptions} value={maritalStatus} onChange={setMaritalStatus} styles={styles} placeholder="Choose Marital Status" />
        </label>

        <label htmlFor="">
          <span>Religion</span>
          <input value={religion} onChange={(e) => setReligion(e.target.value)} type="text" placeholder="Enter Employee Relegion" />
        </label>

        <label htmlFor="">
          <span>Nationality</span>
          <Select options={nationalityOptions} value={nationality} onChange={setNationality} styles={styles} placeholder="Choose Employee Nationality" />
        </label>

        <label htmlFor="">
          <span>Job Title</span>
          <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} type="text" placeholder="Enter Job Title" />
        </label>

        <label htmlFor="">
          <span>Role</span>
          <Select options={roleOptions} value={role} onChange={setRole} styles={styles} placeholder="Choose Employee Role" />
        </label>

        <label htmlFor="">
          <span>Salary</span>
          <input value={salary} onChange={(e) => setSalary(e.target.value)} type="number" placeholder="Enter Employee Salary" />
        </label>

        <button className="primary-btn !mt-[4px]">Submit</button>
      </form>
    </section>
  );
};

export default AddNewEmployee;
