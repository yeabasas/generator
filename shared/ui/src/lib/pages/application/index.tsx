import { useState } from 'react'
import { dbfire } from '../../config/firebase';
import Sidebar from '../../component/sidebar';
import { collection, addDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from '../../config/firebase';
const Application = () => {
  // const colRef = collection(dbfire,"form")
  // const [users, setUsers] = useState([]);
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const imagesListRef = ref(storage, "images/");
  
  const colRef = collection(dbfire, "application form");
  
  const createUser = async () => {
    await addDoc(colRef, { name: name, description: description })
    .then(()=>{console.log("created")});
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        console.log("uploaded")
      });
    });
  };
  
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(colRef);
  //     // console.log(data)
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getUsers();
  // }, []);
  return (
    <>
    <div className="h-screen flex justify-center bg-gray-300">
        <Sidebar/>
        <div className='m-auto w-1/2'>
            <div className='flex flex-col gap-2 justify-center rounded-2xl bg-blue-900/50 p-9'>
              <h1 className='m-auto text-2xl font-semibold pb-9'>Create a Web App </h1>
              <input
                  type='text'
                  name='name'
                  placeholder='App Name'
                  required
                  onChange={(e)=>{setName(e.target.value)}}
                  />
              <input
                  name='icon'
                  type='file'
                  placeholder='Icon/Logo'
                  required
                  onChange={(event) => {
                    setImageUpload(event.target.files?.[0] || null);
                  }}                  />
              <input
                  name='description'
                  type='textarea'
                  placeholder='description'
                  required
                  onChange={(e)=>{setDescription(e.target.value)}}
                  />
              <button
                  name="Create"
                  type='submit'
                  onClick={createUser}
                  >Create</button>
            </div>
        </div>
    </div>
    </>
  );
}


export default Application