/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { dbfire } from '../../config/firebase';
import Sidebar from '../../component/sidebar';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import Table from '../../component/table';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import data from '../../data/data.json';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
// import { useAuth } from '../../config/contex'
import { storage } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const Application = () => {
  const [name, setName] = useState('');
  // const { user} =useAuth()
  const [description, setDescription] = useState('');
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const imagesListRef = ref(storage, 'images/');
  const navigate = useNavigate();
  const colRef = collection(dbfire, 'application form');
  const [cookies, setCookie, removeCookie] =useCookies()
  console.log('====================================');
  console.log(cookies['user'].uid);
  console.log('====================================');
  const appDetails ={
    name:name,
    description:description
  }
  const key = cookies['user']
  const createApp = async () => {
    removeCookie('users')
    await setDoc(doc(dbfire,'application form',key),appDetails).then(() => {
      console.log('created');
    });
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${cookies['user']}/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
      console.log('uploaded');
    });
  };

  return (
    <div className="h-screen mx-16 flex justify-center shadow-2xl">
      <Sidebar />
      <div className="mx-auto w-full">
        <div className="w-full flex flex-col gap-2 justify-center rounded-2xl bg-gra-400/50 p-9">
          <h1 className="m-auto text-2xl font-semibold pb-2 border-2 border-gray border-b-white-500 border-t-0 border-l-0 border-r-0">
            Create a Web App
          </h1>
          <div className="mt-2">
            <table className="shadow-xl border w-full">
              <thead>
                <tr>
                  <th>app name</th>
                  <th>description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      className="m-4 border"
                      type="text"
                      name="appName"
                      required
                      placeholder="Enter a app name..."
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className=" m-4 border"
                      type="text"
                      name="description"
                      required
                      placeholder="Enter an description..."
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      name="icon"
                      type="file"
                      placeholder="Icon/Logo"
                      required
                      onChange={(event) => {
                        setImageUpload(event.target.files?.[0] || null);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={createApp}
                      className="m-4 border"
                      type="submit"
                    >
                      create
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex flex-col justify-around' >
            <h1 className='font-bold text-2xl m-auto'>Created Apps</h1>
            <Table/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;