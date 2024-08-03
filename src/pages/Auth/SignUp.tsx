// import Logo from "@/assets/images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { signup } from "@/service/apis/auth";
import { AuthResponse } from "@/types/auth.types";
import { customToast } from "@/components/Toast";
import path from "@/constants/path";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [password2, setPassword2] = useState("");

  const { setToken } = useUserContext();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password === password2) {
      const resp = (await signup({ name, email, password })) as AuthResponse;
      if (resp.status == 200) {
        // setToken(resp.token as string);
        // localStorage.setItem("token", resp.token as string);
        // console.log(resp.token as string);
        customToast({
          toastType: "success",
          title: "Register successfully!",
        });
        navigate(path.USER);
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
    <div className="flex justify-center pt-10 text-black">
      <div className="w-96">
        <div className="mt-6 grid grid-cols-1 gap-6">
          <div>Create Email and Password</div>
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
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
