import { signInWithEmailAndPassword, NextOrObserver, User, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";

export const signInUser = async (
    email: string, 
    password: string
  ) => {
    if (!email && !password) return;

    return await signInWithEmailAndPassword(app, email, password)
  }

  export const userStateListener = (callback:NextOrObserver<User>) => {
    return onAuthStateChanged(app, callback)
  }

  export const SignOutUser = async () => await signOut(app);