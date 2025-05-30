import React ,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast";
import { getCurrentUser, logout } from "./../../utils/common.js"
import {   LogOut as LogOutIcon,
  Mail as MailIcon,
  IdCard as NameIcon,
  KeySquare as RoleIcon,
  Truck as TruckIcon,} from "lucide-react"



const UserDetailRow = ({ icon, value }) => {
  return (
    <p className="flex items-center mb-3 text-xl">
      {icon} <span className="ms-4">{value}</span>
    </p>
  );
};

const Dashboard = () => {

 
    const [user, setUser] = useState({
      name: "",
      email: "",
      role: "",
    });
  
    useEffect(() => {
      const user = getCurrentUser();
  
      if (user) {
        setUser(user);
      } else {
        toast.error("Please login to access this page");
  
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    }, []);
  return (
    <>
      <div>
        <h1 className='text-center py-4 text-3xl text-gray-600'>Dashboard</h1>
        <div>
          <h2 className='text-2xl text-center pt-10'>Welcome to your dashboard</h2>
          <p className='text-center text-blue-500'>Here you can manage your products, orders, and more.</p>
        </div>
        <div className='bg-white w-[500px] mx-auto px-10 pb-10 rounded-lg shadow-lg mt-10 md:w-[400px] '>

          <div className="flex ">
            <Link
              to="/user/orders"
              className="block text-center text-md mx-2 bg-blue-100 p-2 my-4 rounded-lg"
            >
              <TruckIcon className="mx-auto inline" size={24} />
              <span className="ms-2">My Orders</span>
            </Link>

            <Link
              to="/user/orders"
              className="block text-center text-md mx-2 bg-blue-100 p-2 my-4 rounded-lg"
            >
              <TruckIcon className="mx-auto inline" size={24} />
              <span className="ms-2">My Orders</span>
            </Link>

            <Link
              to="/user/orders"
              className="block text-center text-md mx-2 bg-blue-100 p-2 my-4 rounded-lg"
            >
              <TruckIcon className="mx-auto inline" size={24} />
              <span className="ms-2">My Orders</span>
            </Link>

          </div>
          <UserDetailRow icon={<NameIcon />} value={user?.name} />
        <UserDetailRow icon={<MailIcon />} value={user?.email} />
        <UserDetailRow icon={<RoleIcon />} value={user?.role} />

        <button 
          type="button"
          className="mx-auto block bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
          onClick={() => {
            toast.success("Logged out successfully");
            logout();
          }}
        >
          Logout
          <LogOutIcon className="inline ms-4" />
        </button>



        </div>
        <Toaster/>

      </div>
    </>
  )
}

export default Dashboard