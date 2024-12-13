
const Settings = () => {
    return (
        <section>
            <div className="bg-white p-[16px] rounded-lg ">
                <h2 className="">Profile Picture</h2>
                <div className="flex items-center gap-[16px] mb-[16px]">
                    <img src="https://placehold.co/128x128" alt="" className="rounded-full" />
                    <div className="w-[400px]">
                        <input type="file" />
                        <button className="primary-btn !w-[120px] !mt-[8px] !p-[10px]">Submit</button>
                    </div>
                </div>

                <h2>Bio Data</h2>

                <div className="mb-[16px]">
                    <label htmlFor="">
                        <span>Name</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>

                    <label htmlFor="">
                        <span>Fathers Name</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>

                    <label htmlFor="">
                        <span>CNIC</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>

                    <label htmlFor="">
                        <span>Mobile</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>

                    <label htmlFor="">
                        <span>Email</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>

                    <label htmlFor="">
                        <span>Gender</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>

                    <label htmlFor="">
                        <span>Date of Birth</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>

                    <label htmlFor="">
                        <span>Marital Status</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>
                    <label htmlFor="">
                        <span>Religion</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>

                    <label htmlFor="">
                        <span>Nationality</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>
                </div>

                <h2>Job</h2>
                <div>
                    <label htmlFor="">
                        <span>Job Title</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>

                    <label htmlFor="">
                        <span>Department</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>

                    <label htmlFor="">
                        <span>Salary</span>
                        <input type="text" placeholder="Name" readOnly />
                    </label>
                </div>
            </div>
        </section>
    )
}

export default Settings
