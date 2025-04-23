
import { getCurrentUser, getJwtToken } from "../../utils/common"
import React ,{useState ,useEffect}from 'react'
import toast ,{Toaster} from "react-hot-toast"
import axios from "axios" ;
import OrderCard from "../../components/OrderCard/OrderCard";

const UserOrders = () => {


    const [user ,setUser] = useState ({})
    const [orders ,setOrders] = useState ([]) 


    const loadUserOrders = async ()=>{
        if(!user?._id){
            return ;
        }
       
        try{
        const response =  await axios.get(`${process.env.REACT_APP_API_URL}/orders/user/${user._id}`,
            {
                headers:{
                    Authorization:getJwtToken() 
                }
            }
        ) ;

        setOrders(response.data.data)

        }
        catch(error){
            
            toast.error(error.response.data.message)
        }


    }

    useEffect (()=>{
        const user = getCurrentUser() 
        if (user){
            setUser (user)
        }
        else {
            toast.error("Plsease Login To Access This Page")
            setTimeout(()=>{
                window.location.href = "/login"
            }, 2000
        )
        }
    }, [] )

    useEffect(()=>{
        loadUserOrders() ;
    } ,[user])
     


  return (
    <div>
        <h1>UserOrders </h1>
        <p>current user : {user.name} </p>

        <div>
            {
                orders.map((order)=>{

                    return <OrderCard  key={order._id} order={order}/>

                })
            }

        </div>
       
        <Toaster/>

      
        </div>
    
   
  )
}

export default UserOrders ;
