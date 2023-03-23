/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Routes, Route } from 'react-router-dom';
import { routes, privateRoutes } from '@generator/shared/ui';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import PrivateRoute from '../../shared/ui/src/lib/config/contex';
import { AuthProvider } from '../../shared/ui/src/lib/config/AuthContex'
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          {privateRoutes.map((item, index) => (
            <Route key={index} path={item.hasParams ? `${item.pathName}/:id` : item.pathName} element={item.component} />
          ))}
        </Route>
        {routes.map((item, index) => (
          <Route key={index} path={item.pathName} element={item.component} />
        ))}
      </Routes>
    </AuthProvider>
  );
};

export default App;
