import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";


const Auth = () => {
    const {isAuth , isLoading , token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
  
      if(token || isAuth){
        navigate('dashboard');
      }
    },[token,navigate , isAuth])
  return (
   <>
    {!isAuth && !isLoading&& <>
      <div >
<Outlet/>      
    </div>
      </>}
   </>
  );
};

export default Auth;
