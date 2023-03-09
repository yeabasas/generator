import { useState } from 'react';
import InputField from '../component/inputField';
import Button from '../component/button';
import styled from '@emotion/styled';
import { routeName, REGEX, ENABLE_FIREBASE } from '../constant';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { app, database, dbfire } from '../config/firebase';
import { ref, set, get } from 'firebase/database';
import { useForm } from 'react-hook-form';
import { addDoc, collection, doc, setDoc} from 'firebase/firestore';

const Container = styled.div({
  // height: '100%',
  // width: '100%',
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  // backgroundImage: 'url("/assets/images/Wtdcmn.jpg")',
  // backgroundRepeat: 'no-repeat',
  // backgroundSize: 'cover',
  // flexDirection: 'column',
  // padding: '20px',
});

const FormContainer = styled.div({
  // height: '100%',
  // width: '100%',
  // maxWidth: '400px',
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  // backgroundColor: '#1c1c24',
  // flexDirection: 'column',
  // zIndex: 1,
  // background: 'transparent',
});

const Title = styled.p({
  // color: '#ffffff',
  // fontWeight: 800,
  // paddingBottom: '50px',
  // fontSize: '44px',
});

const CreateText = styled.p({
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '15px',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '10px 0',
  flexWrap: 'wrap',
});

const AccountText = styled.span({
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '15px',
});

const CreateAccountText = styled.span({
  color: '#8c8c8f',
  fontWeight: 800,
  fontSize: '15px',
  paddingLeft: '5px',
  cursor: 'pointer',
});

/***********styled ended */

function LoginFormComponent() {
  const [btnDetails, setBtnDetails] = useState({
    loader: false,
    message: '',
  });
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const colRef = collection(dbfire, 'users');
  const registerUserHandler = async (values: any) => {
    try {
      const userDetails = {
        name: values.userName,
        email: values.email,
        mobile: values.mobileNumber,
        address: values.address,
      };
      const user = await createUserWithEmailAndPassword(
        app,
        values.email,
        values.password
      );
      /***************realtime database */
      const key = user.user.uid
      const starCountRef = ref(database, `users/${key}`);
      const value = (await get(starCountRef)).val();
      /************fireStore */
      await setDoc(doc(dbfire,'users',key),userDetails);

      if (value?.email) {
        setBtnDetails({
          loader: false,
          message: 'Account details present',
        });
        setTimeout(() => {
          setBtnDetails({
            loader: false,
            message: ''
          });
        }, 2000);
        return;
      }

     
     await set(ref(database, `users/${user.user.uid}`), userDetails);

      setBtnDetails({
        loader: false,
        message: 'Account created Successfully',
      });
      setTimeout(() => {
        navigate(routeName.LOGIN);
      }, 2000);
    } catch (e: any) {
      setBtnDetails((pre) => ({
        ...pre,
        loader: false,
      }));
      const { code, message } = e;
      console.log('Error', code, message);
    }
  };

  const onSubmit = (values: any) => {
    if (!ENABLE_FIREBASE)
      return;
    setBtnDetails((pre) => ({
      ...pre,
      loader: true,
    }));
    registerUserHandler(values);
  };

  const CustomForm = styled.form({
    width: '100%',
  });

  return (
    <Container className="h-screen flex justify-center bg-no-repeat bg-cover bg-wave ">
      <FormContainer className='m-auto w-1/4'>
        <CustomForm className='flex flex-col gap-2 justify-center rounded-2xl text-white bg-blue-900/75 p-9' onSubmit={handleSubmit(onSubmit)}>
          <Title className='m-auto text-2xl font-semibold pb-6'>Sign up</Title>
          <InputField
            type='text'
            name='userName'
            placeholder='Username'
            isRequired={true}
            register={register}
            errors={errors} />
          <InputField
            type='text'
            name='email'
            placeholder='Email'
            isRequired={true}
            register={register}
            errors={errors}
            pattern={REGEX.EMAIL} />
          <InputField
            type='text'
            name='mobileNumber'
            placeholder='Mobile Number'
            pattern={REGEX.MOBILE}
            isRequired={true}
            register={register}
            errors={errors} />
          <InputField
            type='text'
            name='address'
            placeholder='Address'
            isRequired={true}
            register={register}
            errors={errors} />
          <InputField
            type='password'
            name='password'
            placeholder='Password'
            isRequired={true}
            register={register}
            errors={errors} />
          <Button
            name='Create Account'
            type='submit'
            isLoading={btnDetails.loader}
            message={btnDetails.message} />
          <CreateText className='mx-auto'>
            <AccountText>Already have an account?</AccountText>
            <CreateAccountText className='text-blue-900 hover:text-blue-400' onClick={() => navigate(routeName.LOGIN)}>
              Sign in
            </CreateAccountText>
          </CreateText>
        </CustomForm>
      </FormContainer>
    </Container>
  );
}

export default LoginFormComponent;
