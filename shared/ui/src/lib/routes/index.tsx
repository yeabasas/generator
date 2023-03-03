import { ReactNode } from 'react';
import { routeName } from '../constant';
import Login from '../loginForm';
import Landing from '../pages/landing';
import Registration from '../registrationForm';
import Application from '../pages/application';
import Dnd from '../pages/dnd'
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
  },
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
];
