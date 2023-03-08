import {
  onSnapshot,
  collection,} from "firebase/firestore";
import { getStorage, ref, listAll,getDownloadURL } from "firebase/storage";
import React,{useEffect, useState} from "react";
import { dbfire } from "../../config/firebase";
import {storage}  from '../../config/firebase'
const Table = ()=>{
  const [posts,setPosts]=useState<[]>([])
  const colRef = collection(dbfire,'application form')
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
  // const unsub = onSnapshot(doc(dbfire, "application form","sf"), (doc) => {
  //     console.log("Current data: ", doc.data());
  // });
  return(
    <>
      <table className="shadow-xl border w-full">
        <thead>
          <th className="border">App Name</th>
          <th className="border">Description</th>
          <th className="border">image</th>
        </thead>
        <tbody className="mx-auto">
          {posts.map((post:any)=>(
            <tr className="">
              <td className="border ">{post.name}</td>
              <td className="border ">{post.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <img/>
    </>
  )
}


export default Table;


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

  getDownloadURL(ref(storage, 'images/Screenshot (1).png464147cd-fda3-4aca-824f-04f789252215'))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
  
      // Or inserted into an <img> element
      const img = document.getElementById('myimg');
      // img.setAttribute('src', url);
    })
    .catch((error) => {
      // Handle any errors
      console.log(error)
    });





















// import { nanoid } from 'nanoid';
// import React, { useState } from 'react';
// import data from '../../data/data.json';

// const Table = () => {
//   const [contacts, setContacts] = useState(data);
//   const [addFormData, setAddFormData] = useState<any>({
//     appName: '',
//     description: '',
//   });

//   const handleAddFormChange = (event: any) => {
//     event.preventDefault();

//     const fieldName = event.target.getAttribute('name');
//     const fieldValue = event.target.value;

//     const newFormData = { ...addFormData };
//     newFormData[fieldName] = fieldValue;

//     setAddFormData(newFormData);
//   };
//   const handleAddFormSubmit = (event: any) => {
//     event.preventDefault();

//     const newContact = {
//       id: nanoid(),
//       appName: addFormData.appName,
//       description: addFormData.description,
//     };

//     const newContacts = [...contacts, newContact];
//     setContacts(newContacts);
//   };
//   return (
//     <div className='w-1/2 mx-auto mt-2'>
//         {/* <button className="border" type="submit">
//           add
//         </button> */}
//       <table className='shadow-xl border w-full'>
//         <thead>
//           <tr>
//             <th>app name</th>
//             <th>description</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <input
//                 className="m-4 border"
//                 type="text"
//                 name="appName"
//                 required
//                 placeholder="Enter a app name..."
//                 onChange={handleAddFormChange}
//               />
//             </td>
//             <td>
//               <input
//                 className=" m-4 border"
//                 type="text"
//                 name="description"
//                 required
//                 placeholder="Enter an description..."
//                 onChange={handleAddFormChange}
//               />
//             </td>
//             <td>
//               <button onClick={handleAddFormSubmit} className="m-4 border" type="submit">
//                 create
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <div className='shadow-xl border mt-4 p-9'>
//           <h1 className=' mx-auto'>created apps</h1>
//         <table className='table-auto'>
//           <thead>
//             <tr>
//               <th >app name</th>
//               <th>description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts.map((apps:any) => (
//               <tr>
//                 <td>{apps.appName}</td>
//                 <td>{apps.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Table;
