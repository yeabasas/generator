import styled from '@emotion/styled';

const FormHelperTextStyled = styled.p(() => ({
  marginLeft: '0 !important',
  color: '#8c8c8f',
  fontSize: '14px',
  fontWeight: 800,
  padding: '5px 0'
}));

const renderError = (errors: any,name:any) => {
  switch (errors[name]?.type) {
    case 'required':
      return <FormHelperTextStyled>This field is required</FormHelperTextStyled>;
    case 'pattern':
      return <FormHelperTextStyled>Please enter valid value</FormHelperTextStyled>;
    default:
      break;
  }
};

const ErrorText:any = (props: any) => {
  const {errors,name } = props;
  return (
    renderError(errors, name)
  );
};

export default ErrorText;
