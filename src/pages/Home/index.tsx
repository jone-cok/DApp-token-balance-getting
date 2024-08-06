import ProfileImg from "@/assets/images/logo.png";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className="flex justify-center items-center text-white h-full m-auto my-16">
      <div className="w-96">
        <div className=" rounded-xl">
          <img src={ProfileImg} className="w-full rounded-xl" />
        </div>
        <div>
          <Link to="/signup">
            <button className="signUpButtonColor mt-10 w-full rounded-xl py-4 bg-black">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="">
          <Link to="/login">
            <button className="logInButtonColor mt-6 w-full rounded-xl py-4 bg-black">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default index;