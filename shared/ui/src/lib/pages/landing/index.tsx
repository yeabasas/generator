import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../component/sidebar'
import { getAuth, signOut } from "firebase/auth";
import Button from '../../component/button';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { routeName } from '../../constant';
const CustomForm = styled.form({
    width: '100%'
  })
const Landing = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const {
        handleSubmit,
        formState: { errors },
      } = useForm();
    const [btnDetails, setBtnDetails] = useState({
        loader: false,
        message: ''
      })

    const SignOut = ()=>{
        signOut(auth).then(() => {
            if (auth) {
                setBtnDetails({
                  loader: false,
                  message: 'LOGGED OUT'
                })
                setTimeout(() => {
                  navigate(routeName.LOGIN);
                }, 1000);
              }
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
                    <CustomForm onSubmit={handleSubmit(SignOut)}> 
                    <Button
                    onClick={SignOut}
                        name="Signout"
                        type='submit'
                        isLoading={btnDetails.loader}
                        message={btnDetails.message}
                    /> 
                    </CustomForm>
                </div>
            </div>
  )
}

export default Landing