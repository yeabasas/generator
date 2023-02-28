import { ReactNode } from 'react';
import { routeName } from '../constant';
import Login from '../loginForm';
import Registration from '../registrationForm';


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
];