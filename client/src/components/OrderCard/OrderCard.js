import React from 'react'

const ReadableTImeStamp = (date) => {
    const dateobj = new Date(date)
    return `${dateobj.getDate()}/${dateobj.getMonth() + 1}/${dateobj.getFullYear()} 
    ${dateobj.getHours()}:${dateobj.getMinutes()} 
    ${dateobj.getHours() >= 12 ? "PM" : "AM"} `
}


const OrderCard = ({ order ,onClick}) => {

    const { _id, status, products, createdAt, totalBill, deliveryAddress } = order
    console.log(order)
    return (
        <div className='m-4 p-4 bg-white rounded-lg relative'  onClick={onClick}>
            <p>Order ID:{_id} , Order On : {ReadableTImeStamp(createdAt)}</p>

            <p className='text-lg font-bold mt-3'>
                {products.map((product) => product.productId.name).join(",")}
            </p>
            <p> Total Amount : {totalBill} ₹</p>
            <p>Address : {deliveryAddress}</p>
            <span className='bg-blue-500 rounded-full px-3 py-1 text-white absolute top-2 right-2 text-sm'>{status}</span>
        </div>

    )
}

export default OrderCard;