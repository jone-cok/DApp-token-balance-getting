// import Logo from "@/assets/images/logo.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { signup } from "@/service/apis/auth";
import { AuthResponse } from "@/types/auth.types";
import { customToast } from "@/components/Toast";
import path from "@/constants/path";

import ProfileImg from "@/assets/images/logo.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [password2, setPassword2] = useState("");

  const { setToken } = useUserContext();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === password2) {
      const resp = (await signup({ name, email, password })) as AuthResponse;
      if (resp.status == 200) {
        customToast({
          toastType: "success",
          title: "Register successfully!",
        });
        navigate(path.PRODUCT);
      } else {
        customToast({
          toastType: "error",
          title: resp.message as string,
        });
      }
    }
    else {
      customToast({
        toastType: "error",
        title: "Passwords do not match",
      });
    }
  };

  return (
    <div className="flex justify-center items-center text-white h-full m-auto my-10">

      <div className="grid grid-cols-2 gap-4 w-[50%] min-w-[600px] text-black m-auto">
        <div className="w-full">
          <img src={ProfileImg} alt="profile" className="w-full h-full object-fill rounded-3xl" />
        </div>
        <div className="w-full">
          <form className="mt-6 grid grid-cols-1 gap-6" onSubmit={handleSignup}>
            <label className="flex justify-center items-center">Create Email and Password</label>
            <input
              type="text"
              className="styled-input w-full rounded-xl bg-[#D7D7D7] p-3 shadow-lg"
              placeholder="Enter the full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
            <input
              type="email"
              className="styled-input w-full rounded-xl bg-[#D7D7D7] p-3 shadow-lg"
              placeholder="Enter the email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <input
              type="password"
              className="styled-input w-full rounded-xl bg-[#D7D7D7] p-3 shadow-lg"
              placeholder="Enter the password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <input
              type="password"
              className="styled-input w-full rounded-xl bg-[#D7D7D7] p-3 shadow-lg"
              placeholder="Confirm the password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            ></input>
            <button
              className="signUpButtonColor mt-4 w-full rounded-xl py-4 text-white bg-black"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <div className="flex flex-row justify-between items-center mx-4 mt-[30px]">
            <Link to="/login">
              Go to login...
            </Link>
            <Link to='/login' className="bg-curiousblue rounded-lg w-[100px] h-[40px] justify-center items-center flex">
              Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
