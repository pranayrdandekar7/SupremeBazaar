import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../components/Button/Button';

const Cart = () => {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    console.log(cart)

    const loadCard = () => {
        const storedCard = JSON.parse(localStorage.getItem("cart") || "[]");

        setCart(storedCard);

    }

    useEffect(() => {
        let totalValue = 0;

        cart.forEach((product) => {
            totalValue += product.quantity * product.price;
        })
        setTotal(totalValue)

    }, [cart])


    useEffect(() => {
        loadCard()
    }, [])

    const RemoveFromCart = (productId) => {
        const indexOfProduct = cart.findIndex((product) => product.productId === productId)

        if (indexOfProduct > -1) {
            cart.splice(indexOfProduct, 1);
            localStorage.setItem("cart", JSON.stringify(cart))
            loadCard();
            toast.success("Product Removed From Cart")
        }
    }


    return (
        <div>
            <h1 className='text-4xl text-center py-10 font-bold'> My Cart</h1>

            <div className='flex flex-col flex-wrap items-center overflow-hidden  '>

                {
                    cart.map((product) => {
                        const { image, name, price, quantity, productId, } = product
                        return (
                            <div key={productId} className='bg-white  shadow-lg rounded-lg my-3 mx-5 px-10 py-3 w-full md:w-2/3 flex relative' >

                                <div>
                                    <img src={image}
                                        alt={name}
                                        className=' w-[140px]  h-[130px] object-contain object-center' />
                                </div>
                                <div className='ms-10'>
                                    <h1 className='text-2xl font-bold'>{name}</h1>
                                    <p className='text-lg'> ₹{price} /-  </p>
                                    <p className='text-lg'> Quantity : {quantity}</p>
                                    <p className='text-lg'> Total Amount {price * quantity} /-</p>

                                </div>
                                <button className='absolute top-1 right-2 text-white text-sm bg-red-500 hover:bg-red-700 over px-2 py-0.5  rounded-full'
                                    onClick={() => RemoveFromCart(productId)} >Remove From Cart
                                </button>


                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-center items-center'>
               <span className='text-3xl text-center m-5'>Total : ₹ {total} /-</span>
               <button className='bg-blue-500  hover:bg-blue-700 px-3 py-2 rounded-lg text-white ]'>Click To Place Order</button>
               </div>
               <Toaster/>
        </div>
    )
}

export default Cart