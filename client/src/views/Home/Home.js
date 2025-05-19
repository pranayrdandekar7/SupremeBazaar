import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast"
import ProductCard from '../../components/ProductCard/ProductCard'
import { ShoppingCart as CartIcon } from "lucide-react"
import { Link } from 'react-router-dom'

function Home() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  // console.log(products)
  const loadProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products?limit=12&search=${search}`)
      setProducts(response.data.data)

    }

    catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    loadProducts()
  }, [search])


  return (
    < div >
      <div className="flex justify-center py-10">
        <input
          type="text"
          placeholder="Search products"
          className="w-2/3 p-1 border border-gray-300 rounded-md text-xl  focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='flex flex-wrap justify-center'>
        {
          products.map((product) => {
            return <ProductCard key={product._id} {...product} />
          })
        }


        <Link to="/user/cart" >
          <CartIcon size={46} className='fixed top-10 right-7 cursor-pointer' />
        </Link>
        <Toaster />
      </div>

    </div>
  )
}

export default Home;