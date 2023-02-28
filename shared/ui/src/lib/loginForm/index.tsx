import { useState } from 'react';
import InputField from '../component/inputField';
import Button from '../component/button';
import styled from '@emotion/styled';
import { FaGooglePlusG, FaFacebookF } from 'react-icons/fa';
import ButtonDesign from '../component/buttonSecondary';
import { routeName, REGEX, ENABLE_FIREBASE } from '../constant';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { app } from '../config/firebase';
import { useForm } from 'react-hook-form';

const Container = styled.div({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1c1c24',
  flexDirection: 'column',
  padding: '20px'
})

const FormContainer = styled.div({
  height: '100%',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1c1c24',
  flexDirection:'column'
})

const Text = styled.p({
  color: '#8c8c8f',
  fontWeight: 800
})


const TextIcon = styled.p({
  color: '#8c8c8f',
  fontWeight: 800,
  paddingLeft: '10px'
})


const Title = styled.p({
  color: '#ffffff',
  fontWeight: 800,
  paddingBottom: '50px',
  fontSize: '44px'
})

const FacebookIcon = styled(FaFacebookF)({
  color: '#ffffff',
  fontSize:'20px'
})

const GooglePlusIcon = styled(FaGooglePlusG)({
  color: '#ffffff',
  fontSize:'20px'
})

const CreateText = styled.p({
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '15px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '10px 0',
  flexWrap: 'wrap'
});

const AccountText = styled.span({
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '15px'
})

const CreateAccountText = styled.span({
  color: '#8c8c8f',
  fontWeight: 800,
  fontSize: '15px',
  paddingLeft: '5px',
  cursor:'pointer'
})


const ForgotPasswordText = styled.p({
  color: '#8c8c8f',
  fontWeight: 800,
  fontSize: '15px',
  paddingLeft: '5px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end'
})


const CustomForm = styled.form({
  width: '100%'
})

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

  const loginUserHandler = async (value:any) => {
    try {
      const register = await signInWithEmailAndPassword(app, value.email, value.password)
      if (register.user) {
        setBtnDetails({
          loader: false,
          message: 'User Login successfully'  
        })
      }

      setTimeout(() => {
        setBtnDetails({
          loader: false,
          message: ''  
        })
      }, 2000)

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
    <Container>
      <FormContainer>
        <Title>Sign in.</Title>
        <ButtonDesign>
          <FacebookIcon />
          <TextIcon>Continue with Facebook</TextIcon>
        </ButtonDesign>
        <ButtonDesign>
          <GooglePlusIcon />
          <TextIcon>Continue with Google</TextIcon>
          </ButtonDesign>
        <Text>OR</Text>
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
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
          </CustomForm>
        <CreateText>
          <AccountText>Do you have an account?</AccountText>
          <CreateAccountText onClick={() => navigate(routeName.REGISTRATION)}>Create Account</CreateAccountText>
        </CreateText>
        <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
        </FormContainer>
    </Container>
  )
}

export default LoginFormComponent