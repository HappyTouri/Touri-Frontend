import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";


const Auth = () => {
    const {isAuth , isLoading} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
      if(isAuth){
        navigate('dashboard');
      }
    },[isAuth,navigate])
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
