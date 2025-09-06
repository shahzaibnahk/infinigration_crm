import { useState } from "react";
import { assets } from "../../utils/assets";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/user";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className='w-full h-screen flex justify-center items-center bg-[url("./assets/images/bg.png")] bg-center bg-cover'>
      <form
        onSubmit={submitHandler}
        action=""
        className="flex flex-col justify-center items-left gap-[4px]"
      >
        {/* <img src={assets.logo} alt="" className="w-[128px] h-[128px]" /> */}

        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <label htmlFor="email" className="w-full">
          <span>Email</span>
          <input
            id="email"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="w-full relative">
          <span>Password</span>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
