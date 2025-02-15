import React, { useState } from 'react'
import InputBox from '../../components/InputBox/InputBox';
import Button from '../../components/Butoon/Button';

const Signup = () => {

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: " ",
    address: '',
    password: '',
    rePassword: ''
  });
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-5">
        <h1 className="text-3xl mb-4 text-gray-600">Signup</h1>

        <div className="w-full md:w-[450px] bg-white rounded-2xl shadow-lg hover:shadow-xl px-10 py-6">
          <InputBox
            label={"Name"}
            val={signupData.name}
            onChange={(val) => {
              setSignupData({ ...signupData, name: val });
            }}
          />
          <InputBox
            label={"Email"}
            val={signupData.email}
            onChange={(val) => {
              setSignupData({ ...signupData, email: val });

            }}
          />

          <InputBox
            label={"Phone"}
            val={signupData.phone}
            onChange={(val) => {
              setSignupData({ ...signupData, phone: val });

            }}
          />
          <InputBox
            label={"Address"}
            val={signupData.address}
            onChange={(val) => {
              setSignupData({ ...signupData, address: val });

            }}
          />

          <InputBox
            label={"Password"}
            type="password"
            val={signupData.password}
            onChange={(val) => {
              setSignupData({ ...signupData, password: val });

            }}
          />
          <InputBox
            label={"Re-enter Password"}
            val={signupData.rePassword}
            type="password"
            onChange={(val) => {
              setSignupData({ ...signupData, rePassword: val });

            }}
          />

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
              onClick={() =>{}}
              variant={"primary"}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup