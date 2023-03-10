import {
    onSnapshot,
    collection,} from "firebase/firestore";
  import { ref, listAll,getDownloadURL } from "firebase/storage";
import React from "react";
  import {useEffect, useState} from "react";
  import { Link } from "react-router-dom";
  import { dbfire } from "../../../config/firebase";
  import {storage}  from '../../../config/firebase'
  const FormTable = ()=>{
    const [posts,setPosts]=useState<[]>([])
    const colRef = collection(dbfire,'form')
    useEffect(()=>{
      const display = onSnapshot(colRef,(querySnapshot)=>{
        const items: any=[] ;
        querySnapshot.forEach((doc)=>{
          items.push(doc.data())
        });
        setPosts(items)
      })
      return ()=>{
        display()
      }
    },[])
    return(
      <>
      <h1 className='font-bold text-2xl mx-auto my-6'>Created Forms</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border">Form Name</th>
              <th className="border">Form Key</th>
              <th className="border">Description</th>
            </tr>
          </thead>
          <tbody className="mx-auto">
            {posts.map((post:any, index)=>(
              <tr key={index} className="">
                <td className="border ">{post.formName}</td>
                <td className="border ">{post.formKey}</td>
                <td className="border ">{post.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <img/>
      </>
    )
  }
  
  
  export default FormTable;
  
  
  // Create a reference under which you want to list
  const listRef = ref(storage, 'files/uid');
  
  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        itemRef.fullPath
      });
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error)
    });