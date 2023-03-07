import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Button from '../../component/button';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { routeName } from '../../constant';

const CustomForm = styled.form({
  width: '100%'
})

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
    <div className="text-white h-screen bg-blue-900/70 border border-blue-100 p-6 w-1/5 shadow-2xl h-screen rounded m-1">
      <h1 className="text-xl text-white mb-4 border-2 border-white border-b-white-500 border-t-0 border-l-0 border-r-0">
        Design
      </h1>
      <Link className="hover:text-blue-600 " to="/application">
        Application
      </Link>
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
  );
};

export default Sidebar;
