import { useParams } from "react-router-dom";
const parameters = ()=>{
  const { id } = useParams()
  return id
}
export const routeName = {
  LOGIN: '/',
  REGISTRATION: '/registration',
  LANDING:'/landing',
  DND:'/dnd',
  APPLICATION:'/application',
  APPLICATIONFORM:`/applicationform`,
  CREATECOMPONENTS:`/application/:key/applicationform/:key/attributes`,
  NOTFOUND:'*'
}

export const REGEX = {
  EMAIL: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
  MOBILE: /^[0-9]{10}$/i,
};

export const ENABLE_FIREBASE = true
