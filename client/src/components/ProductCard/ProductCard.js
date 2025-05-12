import React, { useState } from 'react' 
import { ChevronLeft as LeftArrowIcon , ChevronRight as RightArrowIcon } from "lucide-react"

const ProductCard = ({
    name,
    price,
    currentPrice,
    shortDescription,
    longDescription,
    categories,
    tags,
    images }) => {

    const [currentImage, setCurrentImage] = useState(images[0]);
    return (

        <div className='bg-white shadow-lg rounded-lg m-5 px-5 py-2 overflow-hidden max-w-[300px] '>

            <div className='relative bg-gray-200'>
                <LeftArrowIcon size={36} className='absolute left-0.5 top-1/2' />
                <img src={currentImage}
                    alt={name}
                    className='object-contain w-full h-40 rounded-lg ' />
                <RightArrowIcon size={36} className='absolute right-0.5 top-1/2' />

            </div>
            <h1 className='font-bold text-lg'>{name.length > 15
                ? shortDescription.substring(0, 30) + " . . ."
                : shortDescription}</h1>
            <p>
                {shortDescription.length > 50
                    ? shortDescription.substring(0, 50) + " . . ."
                    : shortDescription}
            </p>

        </div>


    )
}

export default ProductCard;

