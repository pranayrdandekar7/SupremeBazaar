const getCurrentUser = () => {
    const user = localStorage.getItem("e-commerce-user-details");
  
    if (!user) {
      return null;
    }
  
    return JSON.parse(user);
  };

  const getJwtToken = ( ) => {
    const token = localStorage.getItem("e-commerce-user-token");
    
     
    if(!token) {
      return null;
      
    }
    return  `bearer ${token}`;
  }

  const logout =() =>{
    localStorage.clear();

    setTimeout(() =>{
      window.location.href = "/login";
    } ,3000)
  }

  export {getCurrentUser ,getJwtToken ,logout}