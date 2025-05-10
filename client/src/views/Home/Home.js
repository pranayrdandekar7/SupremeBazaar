import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast ,{Toaster} from "react-hot-toast"
import ProductCard from '../../components/ProductCard/ProductCard'

function Home() {

  const [products ,setProducts] = useState ([])
    console.log(products)
  const loadProducts = async() =>{
    try{
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/products?limit=12`)
    setProducts(response.data.data)
    toast.success("Products Loaded Successfully")
    }

      catch (error){
       toast.error(error.response.data.message);
    }
  }

  useEffect (()=>{
    loadProducts()
  },[])


  return (
     < div className="text-center">this is  Home page  
     {
      products.map ((product)=>{
        return <ProductCard key={product._id} {...product}/>
      })
     } 
     <Toaster/>
     </div>
  )
}

export default Home ;