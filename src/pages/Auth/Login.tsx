import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "@/service/apis/auth";
import { useUserContext } from "@/context/UserContext";
import { AuthResponse } from "@/types/auth.types";
import { customToast } from "@/components/Toast";
import path from "@/constants/path";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const resp: AuthResponse = await login({ email, password });

    if (resp.status == 200) {
      navigate(path.USER);
      console.log(resp.token as string);

    } else {
      customToast({
        toastType: "error",
        title: resp.message as string,
      });

    }
  };

  return (
    <div className="flex justify-center pt-10 text-black">
      <div className="w-96">
        <div className="mt-6 grid grid-cols-1 gap-6">
          <div>Input Email and Password</div>
          <div>
            <input
              type="email"
              className="styled-input w-full rounded-xl bg-[#D7D7D7] p-3 shadow-2xl"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              type="password"
              className="styled-input w-full rounded-xl bg-[#D7D7D7] p-3 shadow-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <button
            className="logInButtonColor mt-4 w-full rounded-xl py-4 text-white bg-black"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;