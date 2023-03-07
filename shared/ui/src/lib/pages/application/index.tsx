import { useState } from 'react'
import { dbfire } from '../../config/firebase';
import Sidebar from '../../component/sidebar';
import { collection, addDoc } from "firebase/firestore";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import Table from '../../component/table'
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
    <div className="h-screen mx-16 flex justify-center shadow-2xl">
        <Sidebar/>
        <div className='mx-auto w-full'>
            <div className='w-full flex flex-col gap-2 justify-center rounded-2xl bg-gra-400/50 p-9'>
              <h1 className='m-auto text-2xl font-semibold pb-2 border-2 border-gray border-b-white-500 border-t-0 border-l-0 border-r-0'>Create a Web App </h1>
              {/* <div className='flex justify-around border'> */}
                {/* <table className='border-separate border-spacing-2 border border-slate-500'>
                  <thead>
                    <tr>
                      <th>App Name</th>
                      <th>Description</th>
                      <th>Icon Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border border-slate-600'>
                        <input
                          type='text'
                          name='name'
                          placeholder='App Name'
                          required
                          onChange={(e)=>{setName(e.target.value)}}
                          />
                      </td>
                      <td className='border border-slate-600'>
                        <input
                          name='description'
                          type='textarea'
                          placeholder='description'
                          required
                          onChange={(e)=>{setDescription(e.target.value)}}
                          />
                      </td>
                      <td className='border border-slate-600 px-4'>
                        <input
                          name='icon'
                          type='file'
                          placeholder='Icon/Logo'
                          required
                          onChange={(event) => {
                            setImageUpload(event.target.files?.[0] || null);
                          }}
                          />
                      </td>
                    </tr>
                  </tbody>
                </table> */}
                <Table/>
              <button
                className='mx-auto mt-6 bg-blue-400 w-1/4 rounded hover:bg-blue-600 hover:text-white'
                name="Create"
                type='submit'
                onClick={createUser}
                >Create
              </button>
            </div>
        </div>
    </div>
    </>
  );
}


export default Application