import styled from '@emotion/styled'

const LoginButton = styled.button({
  padding: '10px 20px',
  margin: '5px',
  outline: 'none',
  borderRadius: '10px',
  color: '#ffffff',
  border: '1px solid #8c8c8f',
  width: '100%',
  background: 'transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
})

const ButtonComponent = ({ children }: any) => <LoginButton>{ children }</LoginButton>

export default ButtonComponent