import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../component/sidebar'
import { getAuth, signOut } from "firebase/auth";
import Button from '../../component/button';
const Landing = () => {
    const navigate = useNavigate()
    const auth = getAuth();

    const SignOut = ()=>{
        signOut(auth).then(() => {
        console.log("signed out")
        navigate('/')
        }).catch((error) => {
        console.log(error)
        });
    }

  return (
            <div className='flex'>
                <Sidebar/>
                <div className='flex flex-col'>
                    <h1>Welcome to Landing!</h1>
                    <Link to='/'>Sign In</Link>
                    <Link to='/registration'>Sign Up</Link>
                    <Button onClick={SignOut}>log out</Button> 
                </div>
            </div>
  )
}

export default Landing