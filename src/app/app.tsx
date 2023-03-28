/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Routes, Route } from 'react-router-dom';
import { routes, privateRoutes } from '@generator/shared/ui';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import PrivateRoute from '../../shared/ui/src/lib/config/contex';
import { AuthProvider } from '../../shared/ui/src/lib/config/AuthContex'
import CreateComponents from 'shared/ui/src/lib/pages/createComponents';
import Landing from 'shared/ui/src/lib/pages/landing';
import ApplicationForm from 'shared/ui/src/lib/pages/applicationForm';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          {privateRoutes.map((item, index) => (
            <Route key={index} path={item.hasParams ? `${item.pathName}/:id` : item.pathName} element={item.component} />
          ))}
            <Route key={privateRoutes.length+1} path={`landing/:id`} element={<Landing/>}/>
            <Route key={privateRoutes.length+1} path={`application/:id/forms/:appId`} element={<ApplicationForm/>} />
            <Route key={privateRoutes.length+1} path={`application/:id/forms/:appId/attribute/:formId`} element={<CreateComponents/>}/>
        </Route>
        {routes.map((item, index) => (
          <Route key={index} path={item.pathName} element={item.component} />
        ))}
      </Routes>
    </AuthProvider>
  );
};

export default App;
