import { useState } from "react";
import { resetPassword } from "@/service/apis/auth";
import { customToast } from "@/components/Toast";
import { IBasicResponse } from "@/types/Response.types";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleChangePassword = async () => {
    const resp: IBasicResponse = (await resetPassword(password, password2)) as IBasicResponse;

    if (resp.status == 200) {
      customToast({
        toastType: "success",
        title: "Change successfully!",
      });
    } else {
      customToast({
        toastType: "error",
        title: resp.msg,
      });
    }
  };

  return (
    <div className="flex justify-center pt-10 text-black">
      <div className="w-96">
        <div className="mt-6 grid grid-cols-1 gap-6">
          <div>
            <input
              type="password"
              className="styled-input w-full rounded-xl bg-[#D7D7D7] p-3 shadow-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="password"
              className="styled-input w-full rounded-xl bg-[#D7D7D7] p-3 shadow-lg"
              placeholder="Retype Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            ></input>
          </div>
          <button
            className="signUpButtonColor mt-4 w-full rounded-xl py-4 text-white"
            onClick={handleChangePassword}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;

