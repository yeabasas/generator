import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Button from '../../component/button';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { routeName } from '../../constant';

const CustomForm = styled.form({
  width: '100%',
});

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [btnDetails, setBtnDetails] = useState({
    loader: false,
    message: '',
  });

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        if (auth) {
          setBtnDetails({
            loader: false,
            message: 'LOGGED OUT',
          });
          setTimeout(() => {
            navigate(routeName.LOGIN);
          }, 1000);
        }
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="h-screen flex flex-col justify-between border border-blue-100 p-6 w-1/5 shadow-2xl h-screen rounded m-1">
      <div className="flex flex-col">
      <h1 className="text-xl mb-4 border-2 border-gray border-b-white-500 border-t-0 border-l-0 border-r-0">
        Design
      </h1>
        <Link className="hover:text-blue-600  my-2" to="/application">
          Application
        </Link>
        <Link className="hover:text-blue-600 my-2 " to="/applicationForm">
          form
        </Link>
      </div>
      <div className='w-full'>
        <CustomForm onSubmit={handleSubmit(SignOut)}>
          <Button
            onClick={SignOut}
            name="Signout"
            type="submit"
            isLoading={btnDetails.loader}
            message={btnDetails.message}
          />
        </CustomForm>
      </div>
    </div>
  );
};

export default Sidebar;
