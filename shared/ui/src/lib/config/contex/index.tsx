import React from "react";
import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from '../privateRoute'
const PrivateRoute = () => {
   const user = useAuth()
   return typeof user === 'undefined' ? (<h1 className="text-center font-bold text-2xl">loading...</h1>): user?(
      <Outlet/>) : (<Navigate to='/'/>
   )
}
export default PrivateRoute