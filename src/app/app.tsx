// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { SignIn, SignUp } from '@generator/shared/ui';
// import {Route,Routes} from 'react-router-dom';
// import Landing from './landing/landing';

// export function App() {
//   return (
//       <Routes>
//         <Route path='/' element={<Landing/>}/>
//         <Route path='/signup' element={<SignUp/>}/>
//         <Route path='/signin' element={<SignIn/>}/>
//       </Routes>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from '@generator/shared/ui';

const App = () => {
  return (
    <Routes>
      {
        routes.map((item) => (<Route path={item.pathName} element={item.component} />))
      }
    </Routes>
  );
}

export default App;
