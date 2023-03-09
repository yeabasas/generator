import { doc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { dbfire } from '../../config/firebase'
import Sidebar from '../sidebar'
const AppForm = () => {
  const colRef = collection(dbfire, 'users');
  console.log(colRef.id)
  return (
    <div className='mx-16 flex m-auto shadow-2xl border'>
        <Sidebar/>
        <div>
            <h1>name of the app</h1>
            <form className='w-full'>
                <input className='border' type="text" placeholder='name'/>
                <input className='border' type="text" placeholder='key'/>
                <input className='border' type="text" placeholder='description'/>
                <button className='border'>Create From</button>
            </form>
        </div>
    </div>
  )
}

export default AppForm