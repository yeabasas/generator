import styled from '@emotion/styled';
import ErrorText from '../ErrorText';
const InputField = styled.input({
  padding: '10px 15px',
  margin: '8px 0',
  background: 'transparent',
  outline: 'none',
  border: '1px solid #8c8c8f',
  width: '100%',
  borderRadius: '6px',
  color: '#8c8c8f',
  fontWeight: 800,
});

type IInputField = {
  type: string;
  placeholder: string;
  name: string;
  register: any;
  isRequired: boolean;
  pattern?: any;
  errors: any;
};

const InputComponent = ({
  type,
  placeholder,
  name,
  register,
  isRequired,
  pattern,
  errors,
}: IInputField) => (
  <>
    <InputField
      type={type}
      placeholder={placeholder}
      {...register(name, {
        required: isRequired,
        pattern: pattern ? new RegExp(pattern) : undefined,
      })}
      error={errors.hasOwnProperty(name)}
    />
    <ErrorText errors={errors} name={name} />
  </>
);

export default InputComponent;
