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
// import { useAuth } from '../../config/contex'
import { storage } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
const Application = () => {
  const [name,setName] = useState("")
  // const { user} =useAuth()
  const [description,setDescription] = useState("")
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const imagesListRef = ref(storage, "images/");
  const navigate = useNavigate();
  const colRef = collection(dbfire, "application form");

  const createUser = async () => {
    await addDoc(colRef, { name: name, description: description })
    .then(()=>{console.log("created")});
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
      console.log("uploaded")
    });
    navigate('/dnd');
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
        <div className='mx-auto w-full'>
            <div className='w-1/2 flex flex-col gap-2 justify-center rounded-2xl bg-gray-400/50 p-9'>
              <h1 className='m-auto text-2xl font-semibold pb-9'>Create a Web App </h1>
              <input
                  type='text'
                  name='name'
                  placeholder='App Name'
                  required
                  onChange={(e)=>{setName(e.target.value)}}
                  />
              <input
                  name='description'
                  type='textarea'
                  placeholder='description'
                  required
                  onChange={(e)=>{setDescription(e.target.value)}}
                  />
              <input
                  name='icon'
                  type='file'
                  placeholder='Icon/Logo'
                  required
                  onChange={(event) => {
                    setImageUpload(event.target.files?.[0] || null);
                  }}                  />
              <button
              className='mx-auto mt-6 bg-blue-400 w-1/4 rounded hover:bg-blue-600 hover:text-white'
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