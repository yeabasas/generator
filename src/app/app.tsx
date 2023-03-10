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
import { routes,privateRoutes } from '@generator/shared/ui';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import PrivateRoute from '../../shared/ui/src/lib/config/contex';
const App = () => {
  return (
      <Routes>
        <Route element={<PrivateRoute />}>
          {privateRoutes.map((item,index) => (
            <Route key={index} path={item.pathName} element={item.component} />
          ))}
        </Route>
        {routes.map((item, index) => (
          <Route key={index} path={item.pathName} element={item.component} />
        ))}
      </Routes>
  );
};

export default App;
