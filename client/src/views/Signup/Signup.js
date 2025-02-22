import React, { useState, useEffect } from 'react'
import InputBox from '../../components/InputBox/InputBox';
import Button from '../../components/Butoon/Button';
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { Link } from "react-router-dom"
import { getCurrentUser } from '../../utils/common';

const Signup = () => {

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState("");

  const processSignup = async () => {
    toast.loading("Please wait...");

    try {
      // console.log("API URL:", process.env.REACT_APP_API_URL);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        signupData
      );
      console.log(response)
      toast.dismiss();

      toast.success(response.data.message);

      setSignupData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        rePassword: "",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
    catch (err) {
      console.log(err);
      toast.dismiss();
      setError(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();

    if (currentUser) {
      toast.success("You are already logged in. Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-5">
        <h1 className="text-3xl mb-2 text-gray-600">Signup</h1>

        <div className="w-full md:w-[450px] bg-white rounded-2xl shadow-lg hover:shadow-xl px-10 py-5">
          <InputBox
            label={"Name"}
            val={signupData.name}
            onChange={(val) => {
              setSignupData({ ...signupData, name: val });
              setError("");
            }}
          />
          <InputBox
            label={"Email"}
            val={signupData.email}
            onChange={(val) => {
              setSignupData({ ...signupData, email: val });
              setError("");
            }}
          />

          <InputBox
            label={"Phone"}
            val={signupData.phone}
            onChange={(val) => {
              setSignupData({ ...signupData, phone: val });
              setError("");
            }}
          />
          <InputBox
            label={"Address"}
            val={signupData.address}
            onChange={(val) => {
              setSignupData({ ...signupData, address: val });
              setError("");
            }}
          />

          <InputBox
            label={"Password"}
            type="password"
            val={signupData.password}
            onChange={(val) => {
              setSignupData({ ...signupData, password: val });
              setError("");
            }}
          />
          <InputBox
            label={"Re-enter Password"}
            val={signupData.rePassword}
            type="password"
            onChange={(val) => {
              setSignupData({ ...signupData, rePassword: val });
              setError("");
            }}
          />

          <p className="text-red-500 text-xs mt-2">{error}</p>

          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
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

            <Button
              label="Signup"
              onClick={() => processSignup()}
              variant={"primary"}
            />
          </div>
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default Signup ;