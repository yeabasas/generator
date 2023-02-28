// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SignIn, SignUp } from '@generator/shared/ui';
import {Route,Routes} from 'react-router-dom';
import Landing from './landing/landing';

export function App() {
  return (
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
      </Routes>
  );
}

export default App;
