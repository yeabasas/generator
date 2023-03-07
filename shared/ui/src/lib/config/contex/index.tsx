import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from '../privateRoute'
const PrivateRoute = () => {
   const user = useAuth()
   return typeof user === 'undefined' ? (<h1>loading....</h1>): user?(
      <Outlet/>) : (<Navigate to='/'/>
   )
}
export default PrivateRoute