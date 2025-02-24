import React from "react";
import Select from "react-select";
import { styles } from "../../../select/styles";

const AddNewEmployee = () => {
  return (
    <section className="w-full">
      <form action="" className="w-full bg-white">
        <label htmlFor="">
          <span>Name</span>
          <input type="text" placeholder="Enter Employee Name" />
        </label>

        <label htmlFor="">
          <span>Father Name</span>
          <input type="text" placeholder="Enter Employee Father Name" />
        </label>

        <label htmlFor="">
          <span>CNIC</span>
          <input type="text" placeholder="Enter Employee CNIC" />
        </label>

        <label htmlFor="">
          <span>Mobile</span>
          <input type="text" placeholder="Enter Employee Mobile Number" />
        </label>

        <label htmlFor="">
          <span>Email</span>
          <input type="text" placeholder="Enter Employee Email" />
        </label>

        <label htmlFor="">
          <span>Password</span>
          <input type="text" placeholder="Enter Employee Password" />
        </label>

        <label htmlFor="">
          <span>Gender</span>
          <Select styles={styles} placeholder="Choose Gender" />
        </label>

        <label htmlFor="">
          <span>Date of Birth</span>
          <input type="date" />
        </label>

        <label htmlFor="">
          <span>Marital Status</span>
          <Select styles={styles} placeholder="Choose Marital Status" />
        </label>

        <label htmlFor="">
          <span>Relegion</span>
          <input type="text" placeholder="Enter Employee Relegion" />
        </label>

        <label htmlFor="">
          <span>Nationality</span>
          <Select styles={styles} placeholder="Choose Employee Nationality" />
        </label>

        <label htmlFor="">
          <span>Job Title</span>
          <input type="text" placeholder="Enter Job Title" />
        </label>

        <label htmlFor="">
          <span>Role</span>
          <Select styles={styles} placeholder="Choose Employee Role" />
        </label>

        <label htmlFor="">
          <span>Salary</span>
          <input type="number" placeholder="Enter Employee Salary" />
        </label>

        <button className="primary-btn !mt-[4px]">Submit</button>
      </form>
    </section>
  );
};

export default AddNewEmployee;
