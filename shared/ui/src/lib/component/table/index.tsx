import {
  onSnapshot,
  collection,
  query,
  where,} from "firebase/firestore";
import { ref, listAll,getDownloadURL } from "firebase/storage";
import {useEffect, useState} from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { dbfire } from "../../config/firebase";
import {storage}  from '../../config/firebase'
const Table = ()=>{
  const [cookies]=useCookies()
  const [posts,setPosts]=useState<[]>([])
  const userId = cookies['user']
  const colRef = collection(dbfire,'application form');
  const q = query(colRef,where('userId','==',userId))
  useEffect(()=>{
    const display = onSnapshot(q,(querySnapshot)=>{
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
      <table className="w-full">
        <thead className="bg-gray-100 rounded">
          <tr>
            <th>App Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="mx-auto">
          {posts.map((post:any, index)=>(
            <tr key={index} className="border border-x-0">
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td><Link to='/application/applicationform'><button className="bg-gray-200 p-1 rounded">Details</button></Link> </td>
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
// const listRef = ref(storage, 'files/uid');

// // Find all the prefixes and items.
// listAll(listRef)
//   .then((res) => {
//     res.prefixes.forEach((folderRef) => {
//       // All the prefixes under listRef.
//       // You may call listAll() recursively on them.
//     });
//     res.items.forEach((itemRef) => {
//       // All the items under listRef.
//       itemRef.fullPath
//     });
//   }).catch((error) => {
//     // Uh-oh, an error occurred!
//     console.log(error)
//   });






















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
