const getCurrentUser = () => {
    const user = localStorage.getItem("e-commerce-user-details");
  
    if (!user) {
      return null;
    }
  
    return JSON.parse(user);
  };

  export {getCurrentUser}