
import { getCurrentUser, getJwtToken } from "../../utils/common"
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios";
import OrderCard from "../../components/OrderCard/OrderCard";

const UserOrders = () => {


    const [user, setUser] = useState({})
    const [orders, setOrders] = useState([])


    const loadUserOrders = async () => {
        if (!user?._id) {
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/user/${user._id}`,
                {
                    headers: {
                        Authorization: getJwtToken()
                    }
                }
            );

            setOrders(response.data.data)

        }
        catch (error) {

            toast.error(error.response.data.message)
        }


    }

    useEffect(() => {
        const user = getCurrentUser()
        if (user) {
            setUser(user)
        }
        else {
            toast.error("Plsease Login To Access This Page")
            setTimeout(() => {
                window.location.href = "/login"
            }, 2000
            )
        }
    }, [])

    useEffect(() => {
        loadUserOrders();
    }, [user])


    const OrderviewDialogue = ({ isOpen ,OnClose }) => {
        return (
            <div className="min-h-screen bg-gray-700 fixed left-0 top-0 w-full bg-opacity-75 z-50 flex justify-center items-center"> 
                <div className="bg-white w-1/2 h-96  rounded-lg relative"> 
                <button className="text-red-500 font-bold  absolute right-2 top-1">Close</button>
                
                </div>

            </div>
        )
    }

    return (
        <div>
            <h1>UserOrders </h1>
            <p>current user : {user.name} </p>

            <div>
                {
                    orders.map((order) => {

                        return <OrderCard key={order._id} order={order} />

                    })
                }

            </div>
            <OrderviewDialogue />

            <Toaster />
        </div>


    )
}

export default UserOrders;
