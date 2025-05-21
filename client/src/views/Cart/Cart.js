import React, { useEffect, useState } from 'react'

const Cart = () => {

    const [cart, setCart] = useState([]);
    console.log(cart)

    const loadCard = () => {
        const storedCard = JSON.parse(localStorage.getItem("cart") || "[]");

        setCart(storedCard);

    }
    useEffect(() => {
        loadCard()
    }, [])

    const RemoveFromCart = (productId) => {
        const indexOfProduct = cart.findIndex((product) => product.productId === productId)

        if (indexOfProduct > -1) {
            cart.splice(indexOfProduct, 1);
            localStorage.setItem("cart", JSON.stringify(cart))
            loadCard();
        }
    }
    return (
        <div>
            <h1 className='text-4xl text-center py-10'> My Cart</h1>

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
                                <button className='absolute top-1 right-2 text-white text-sm bg-red-500 p-1 rounded-full'
                                    onClick={() => RemoveFromCart(productId)}>Remove from Cart
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cart