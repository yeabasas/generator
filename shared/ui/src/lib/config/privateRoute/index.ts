import { onAuthStateChanged } from "firebase/auth";
import React,{ useEffect, useState } from "react"
import { app } from "../firebase";
export function useAuth(){
    const [currentUser, setCurrentUser]= useState<any>();
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(app,(user)=>
        setCurrentUser(user)
        );
        return unSubscribe;
    },[]);
    return currentUser;
}