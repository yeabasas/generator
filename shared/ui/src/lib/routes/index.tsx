import { ReactNode } from 'react';
import { routeName } from '../constant';
import Login from '../loginForm';
import Landing from '../pages/landing';
import Registration from '../registrationForm';
import Application from '../pages/application';
import Dnd from '../pages/dnd'
import NotFound from '../pages/notFound'
import ApplicationForm from '../pages/applicationForm';
type IRoute = {
  pathName: string,
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
    component: <Application />,
  },
  {
    pathName: routeName.DND,
    component: <Dnd />,
  },
  {
    pathName: routeName.APPLICATIONFORM,
    component: <ApplicationForm />,
  },
  {
    pathName: routeName.NOTFOUND,
    component: <NotFound />,
  },
];
