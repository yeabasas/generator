import { ReactNode } from 'react';
import { routeName } from '../constant';
import Login from '../loginForm';
import Landing from '../pages/landing';
import Registration from '../registrationForm';
import Application from '../pages/application';
import Dnd from '../pages/dnd'
import NotFound from '../pages/notFound'
import ApplicationForm from '../pages/applicationForm';
import CreateComponents from '../pages/createComponents'
type IRoute = {
  pathName: string,
  hasParams?:boolean;
  component: JSX.Element | JSX.Element[] | ReactNode
}[]

export const routes: IRoute = [
  {
    pathName: routeName.LOGIN,
    component: <Login />,
  },
  {
    pathName: routeName.REGISTRATION,
    component: <Registration />,
  }
];
  export const privateRoutes: IRoute = [
  {
    pathName: routeName.LANDING,
    component: <Landing />,
  },
    {
      pathName: routeName.APPLICATION,
      hasParams:true,
    component: <Application />,
  },
  {
    pathName: routeName.DND,
    component: <Dnd />,
  },
  {
    pathName: routeName.APPLICATIONFORM,
    hasParams:true,
    component: <ApplicationForm />,
  },
  {
    pathName: routeName.CREATECOMPONENTS,
    hasParams:true,
    component: <CreateComponents />,
  },
  {
    pathName: routeName.NOTFOUND,
    component: <NotFound />,
  },
];
