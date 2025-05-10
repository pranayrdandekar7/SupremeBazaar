
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

    const [isDialogueOpen, setIsDialogueOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})

    const ReadableTImeStamp = (date) => {
        const dateobj = new Date(date)
        return `${dateobj.getDate()}/${dateobj.getMonth() + 1}/${dateobj.getFullYear()} 
        ${dateobj.getHours()}:${dateobj.getMinutes()} 
        ${dateobj.getHours() >= 12 ? "PM" : "AM"} `
    }


    const OrderviewDialogue = ({ isOpen, OnClose }) => {

        if (!isOpen) return null;
        console.log(selectedOrder)

        const {
            _id,
             products,
            totalBill,
            deliveryAddress,
            phone,
            paymentMode,
            status,
            createdAt } = selectedOrder

        return (
            <div className="min-h-screen  bg-gray-700  fixed left-0 top-0 w-full bg-opacity-75 z-50 flex justify-center items-center " onClick={OnClose}>
                <div className="bg-white w-1/2 h-96 ps-5 p-4 rounded-lg relative" onClick={(e) => { e.stopPropagation() }}>
                    <button className="text-red-500 font-bold  absolute right-2 top-1 " onClick={OnClose}>Close
                    </button>
                    <h1 className="text-2xl font-bold  pb-3">Order Details</h1>
                    <p ><span className="font-bold">Order Id :</span>  {_id}</p>
                    <p> <span className="font-bold">Order Date :</span> {ReadableTImeStamp(createdAt)}</p>
                    <p> <span className="font-bold">Mobile No. :</span>  {phone}</p>
                    <p> <span className="font-bold">Delivery Address :</span> {deliveryAddress}</p>
                    <p> <span className="font-bold">Payment Mode : </span>{paymentMode}</p>
                    <p> <span className="font-bold">Status :</span> {status}</p>
                    {
                        products.map ((product)=>{
                            console.log(product)
                           const { productId,quantity,price  }=product
                           const { name, images } = productId;

                           return(
                            <div className="flex items-center space-x-4 ps-4 mb-4 shadow-md border border-gray-200 rounded-md">
                            <img src={images[0]} alt={name} className="w-20 h-20" />
                            <div>
                              <p>{name}</p>
                              <p>
                                ₹ {price} x {quantity}
                              </p>
                            </div>
                          </div>
                           )

                        })
                    }
                    <p className="font-bold text-lg border-t-2 mt-6 ">Total Bill : {totalBill}</p>


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

                        return (
                            <OrderCard key={order._id}
                                order={order}
                                onClick={() => {
                                    setSelectedOrder(order)
                                    setIsDialogueOpen(true)
                                }} />)

                    })

                }

            </div>
            <OrderviewDialogue isOpen={isDialogueOpen}
                OnClose={() => {
                    setIsDialogueOpen(false)
                    setSelectedOrder({})
                }} />

            <Toaster />
        </div>


    )
}

export default UserOrders;
