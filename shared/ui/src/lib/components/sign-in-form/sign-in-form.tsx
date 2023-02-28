import { Link } from "react-router-dom";
/* eslint-disable-next-line */
export interface SignInFormProps {}

export function SignInForm(props: SignInFormProps) {
  return (
    <div className='flex justify-center bg-no-repeat bg-cover bg-gradient-to-r from-cyan-500 to-blue-500 m-auto h-screen'>
      <div className='m-auto w-1/'>
        <form className='flex flex-col justify-center rounded-2xl text-white bg-blue-900/75 p-9 gap-6'>
          <h2 className='m-auto text-2xl font-semibold'>Sign In</h2>
          <input type="email"
          name='email' className='pl-2 h-9 text-white bg-blue-600 rounded'
          placeholder='your email'/>
          <input type="password"
          name='password' className='pl-2 h-9 text-white bg-blue-600 rounded'
          placeholder='your password'/>
          <button className='bg-blue-400 rounded w-1/2 p-2 m-auto' type='submit'>Sign in</button>
          <Link className='m-auto' to='/login'>have an account? login</Link>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
