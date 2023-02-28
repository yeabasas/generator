import styled from '@emotion/styled'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BiLoaderCircle } from 'react-icons/bi'
const LoginButton = styled.button`
  padding: 10px 20px;
  margin: 5px 0;
  outline: none;
  background: ${(props) => props.disabled ? 'linear-gradient(to right, #bc4e9c40, #f8075973)' : 'linear-gradient(to right, #bc4e9c, #f80759)'};
  border-radius: 10px;
  color: #ffffff;
  border: none;
  width: 100%;
  cursor: pointer;
`;
const ButtonComponent = ({ name, type, isLoading, message }: any) => {
  return <LoginButton type={type} disabled={isLoading  || message}>
    {
      isLoading ?
        <BiLoaderCircle />
        : message ? message :  name
    }
  </LoginButton>

}

export default ButtonComponent