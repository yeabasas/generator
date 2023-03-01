import styled from '@emotion/styled'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BiLoaderCircle } from 'react-icons/bi'
const LoginButton = styled.button`
  // padding: 10px 20px;
  // margin: 5px 0;
  // outline: none;
  // background: ${(props) => props.disabled ? 'linear-gradient(to right, #2868de, #3d28de)' : 'linear-gradient(to right,  #2868de, #3d28de)'};
  // border-radius: 10px;
  // color: #ffffff;
  // border: none;
  // width: 100%;
  // cursor: pointer;
`;
const ButtonComponent = ({ name, type, isLoading, message }: any) => {
  return <LoginButton className='p-2 bg-blue-400 rounded-xl font-bold shadow w-1/2 m-auto hover:bg-blue-500'
  type={type} disabled={isLoading  || message}>
    {
      isLoading ?
        <BiLoaderCircle className='mx-auto' />
        : message ? message :  name
    }
  </LoginButton>

}

export default ButtonComponent