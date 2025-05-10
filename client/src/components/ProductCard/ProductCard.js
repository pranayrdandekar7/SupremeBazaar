import React from 'react'

const ProductCard = ({
    name,
    price,
    currentPrice,
    shortDescription,
    longDescription,
    categories,
    tags,
    images }) => {
    return (
        <div className='bg-white shadow-lg rounded-lg m-5 px-10 py-2 overflow-hidden'>
           <h1 className='font-bold text-lg'>{name}</h1>
           <p>{shortDescription}</p>
        </div>

    )
}

export default ProductCard;

