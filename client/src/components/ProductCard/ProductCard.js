import React, { useState } from 'react'
import { ChevronLeft as LeftArrowIcon, ChevronRight as RightArrowIcon } from "lucide-react"
import Button from '../Button/Button';

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

    const leftArrowClick = () => {
        const currentIndex = images.indexOf(currentImage);
        const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        setCurrentImage(images[newIndex]);
    }

    const rightArrowClick = () => {
        const currentIndex = images.indexOf(currentImage);
        const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        setCurrentImage(images[newIndex])
    }
    return (

        <div className='bg-white shadow-lg rounded-lg m-5 px-3 py-2 overflow-hidden w-[300px] h-[370px] relative '>
            <span className="absolute top-0 right-0 bg-gray-400 text-white px-1 py-0.5 rounded-bl-lg z-50">
                {categories}
            </span>

            <div className='relative bg-gray-200'>
                <LeftArrowIcon size={36} className='absolute left-0 top-1/3 cursor-pointer' onClick={leftArrowClick} />
                <img src={currentImage}
                    alt={name}
                    className='object-contain w-full h-40 rounded-lg ' />
                <RightArrowIcon size={36} className='absolute right-0 top-1/3 cursor-pointer' onClick={rightArrowClick} />

            </div>
            <p className='mt-1'>
                {tags.map((tag) => {
                    return (
                        <span className="bg-gray-200 text-gray-500 px-3 py-1 text-xs rounded-full mr-2 cursor-pointer ">
                            {tag}
                        </span>
                    );
                })}
            </p>
            <h1 className='font-bold text-lg mt-1'>{name.length > 15
                ? name.substring(0, 20) + " . . ."
                : name}</h1>
            <span>
                {shortDescription.length > 30
                    ? shortDescription.substring(0, 40) + " . . ."
                    : shortDescription}
            </span>
            <p className='mt-2'>
                <del> ₹ {price}</del> <span className='font-bold'>{currentPrice} /-</span>
            </p>

                 <div className=" absolute bottom-3 left-1/3">
                <Button
                    label="Add To Cart"
                    variant="primary"
                     />
            </div>

        </div>


    )
}

export default ProductCard;

