import { useState } from "react";
import { assets } from "../../utils/assets";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className='w-full h-screen flex justify-center items-center bg-[url("./assets/images/bg.png")] bg-center bg-cover'>
            <form action="" className="flex flex-col justify-center items-center gap-[4px]">
                <img src={assets.logo} alt="" className="w-[128px] h-[128px]" />
                <label htmlFor="email" className="w-full">
                    <span>Email</span>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter Your Email"
                    />
                </label>
                <label htmlFor="password" className="w-full relative">
                    <span>Password</span>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-[42px] text-gray-500"
                    >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                </label>
                <button className="primary-btn">Login</button>
            </form>
        </section>
    );
};

export default Login;
