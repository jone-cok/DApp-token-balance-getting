import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { login } from "@/service/apis/auth";
import { useUserContext } from "@/context/UserContext";
import { AuthResponse } from "@/types/auth.types";
import { customToast } from "@/components/Toast";
import path from "@/constants/path";

import ProfileImg from "@/assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp: AuthResponse = await login({ email, password });

    if (resp.status == 200) {
      navigate(path.PRODUCT);
      console.log(resp.token as string);

    } else {
      customToast({
        toastType: "error",
        title: resp.message as string,
      });

    }
  };

  return (
    <div className="flex justify-center items-center text-white h-full m-auto my-16">
      <div className="grid grid-cols-2 gap-4 w-[50%] min-w-[600px] my-10 text-black m-auto">
        <div className="w-full">
          <img src={ProfileImg} alt="profile" className="w-full h-full object-fill rounded-3xl" />
        </div>
        <div className="w-full">
          <form className="mt-6 grid grid-cols-1 gap-6" onSubmit={handleLogin}>
            <label className="flex justify-center items-center">Input Email and Password</label>
            <input
              type="email"
              className="styled-input w-full rounded-xl bg-[#D7D7D7] p-3 shadow-2xl"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              type="password"
              className="styled-input w-full rounded-xl bg-[#D7D7D7] p-3 shadow-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <button
              type="submit" className="logInButtonColor mt-4 w-full rounded-xl py-4 text-white bg-black"
            >
              Login
            </button>
          </form>
          <div className="flex flex-row justify-between items-center mx-4 mt-[30px]">
            <Link to="/signup">
              Haven't registered yet?
            </Link>
            <Link to='/signup' className="bg-curiousblue rounded-lg w-[100px] h-[40px] justify-center items-center flex">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;