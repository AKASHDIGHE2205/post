import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {logout} from "../../Features/auth/authSlice"
import { Navigate } from "react-router-dom";
const Logout = () => {
  const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(logout());
    },[dispatch])

  return <Navigate to="login"/>   



}

export default Logout;
