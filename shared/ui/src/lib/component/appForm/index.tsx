import React from 'react'
import Sidebar from '../sidebar'

const AppForm = () => {
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