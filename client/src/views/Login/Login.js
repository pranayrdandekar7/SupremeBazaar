import React, { useState, useEffect } from "react";
import InputBox from "./../../components/InputBox/InputBox";
import axios from "axios";
import Button from "../../components/Button/Button";
import toast, { Toaster } from "react-hot-toast"
import { getCurrentUser } from "../../utils/common";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const proceesLogin = async () => {
    toast.loading("Please wait...");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, loginData)
      console.log(response)

      localStorage.setItem("e-commerce-user-token", response.data.token);
      localStorage.setItem(
        "e-commerce-user-details",
        JSON.stringify(response.data.data)
      );
      toast.dismiss();
      toast.success(response.data.message)


      setLoginData({
        email: "",
        password: "",
      });

       setTimeout(() => {
         window.location.href = "/dashboard";
       }, 3000);
    }
    catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
      toast.dismiss();
      toast.error(error?.response?.data?.message)
    }
  }
  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();

    if (currentUser) {
      toast.success("You are already logged in. Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">
      <h1 className="text-3xl mb-4 text-gray-600">Login</h1>
      <div className="w-full md:w-[450px] bg-white rounded-2xl shadow-lg hover:shadow-xl px-10 py-6">
        <InputBox label={"Email"}
          type={"email"}
          val={loginData.email}
          onChange={(val) => {
            setLoginData({ ...loginData, email: val });
            setError("");
          }}
        />
        <InputBox label={"Password"}
          type={"password"}
          val={loginData.password}
          onChange={(val) => {
            setLoginData({ ...loginData, password: val });
            setError("");
          }}
        />
        <p className="text-red-500 text-xs mt-2">{error}</p>

        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
        <div className="flex justify-around mt-6">

          <Button
            label="Cancel"
            onClick={() => {
              window.location.href = "/";
            }}
            variant={"danger"}
          />

          <Button label={"Login"}
            variant={"primary"}
            onClick={proceesLogin}
          />
        </div>

      </div>
      <Toaster />

    </div>
  )
}


export default Login;  