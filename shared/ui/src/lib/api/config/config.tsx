import {auth} from '../firebase.config'
import { createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
/* eslint-disable-next-line */

export const registerUser=async ({name,email,password}:{name:string;email:string;password:string}) => {
  const response = await createUserWithEmailAndPassword(auth,email,password);
  if(response.user){
    await updateProfile(auth.currentUser,{
      displayName:name,
    })
  return response;
}
 export default registerUser;
