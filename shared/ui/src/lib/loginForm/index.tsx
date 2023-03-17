/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import InputField from '../component/inputField';
import Button from '../component/button';
import styled from '@emotion/styled';
import { routeName, REGEX, ENABLE_FIREBASE } from '../constant';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { app } from '../config/firebase';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
const Container = styled.div({})

const FormContainer = styled.div({})

const Title = styled.p({
  fontWeight: 800,
  paddingBottom: '50px',
  fontSize: '44px'
})

const CreateText = styled.p({
  
  fontWeight: 800,
  fontSize: '15px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '10px 0',
  flexWrap: 'wrap'
});

const AccountText = styled.span({
  fontWeight: 800,
  fontSize: '15px'
})

const CreateAccountText = styled.span({
  fontWeight: 800,
  fontSize: '15px',
  paddingLeft: '5px',
  cursor:'pointer'
})

const CustomForm = styled.form({
  width: '100%'
})
/********************************* */
const LoginFormComponent = () => {
  const [btnDetails, setBtnDetails] = useState({
    loader: false,
    message: ''
  })
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const [cookies, setCookie, removeCookie] =useCookies()

  const loginUserHandler = async (value:any) => {
    try {
      await signInWithEmailAndPassword(app, value.email, value.password)
      .then((userCredential)=>{
        const user = userCredential.user;
        setCookie('user', user.uid,{ path:'/'})
        if (user) {
          setBtnDetails({
            loader: false,
            message: 'Logged In'
          })
          setTimeout(() => {
            navigate(routeName.LANDING);
          }, 1000);
        }
      }).catch((e)=>{
        console.log(e)
      })


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setBtnDetails({
        loader: false,
        message: 'Login Fail'
      })
      setTimeout(() => {
        setBtnDetails({
          loader: false,
          message: ''
        })
      }, 2000)
      const { code, message } = e
      console.log('Error', code, message)
    }
  }

  const onSubmit = (values: any) => {
    if (!ENABLE_FIREBASE) return
    setBtnDetails((pre) => ({
      ...pre,
      loader: true
    }))
    loginUserHandler(values);
  }


  return (
    <Container className="h-screen flex justify-center bg-wave bg-no-repeat bg-cover">
      <FormContainer className='m-auto w-1/4'>
      <CustomForm className='flex flex-col gap-2 justify-center rounded-2xl text-blue-100 bg-blue-200/75 p-9' onSubmit={handleSubmit(onSubmit)}>
        <Title className='m-auto text-2xl font-semibold pb-9 text-blue-600'>Sign in</Title>
      <InputField
          type='text'
          name='email'
          placeholder='Email'
          pattern={REGEX.EMAIL}
            isRequired={true}
          register={register}
            errors={errors}
          />
      <InputField
          name='password'
          type='password'
          placeholder='Password'
          isRequired={true}
          register={register}
          errors={errors}
        />
          <Button
            name="Login"
            type='submit'
            isLoading={btnDetails.loader}
            message={btnDetails.message}
          />
        <CreateText className='mx-auto'>
          <AccountText className='text-blue-700'>New here ?</AccountText>
          <CreateAccountText className='text-blue-700 hover:text-blue-400' onClick={() => navigate(routeName.REGISTRATION)}>Create Account</CreateAccountText>
        </CreateText>
          </CustomForm>
        </FormContainer>
    </Container>
  )
}

export default LoginFormComponent