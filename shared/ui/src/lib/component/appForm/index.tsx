import { doc, setDoc ,getDoc} from 'firebase/firestore';
import { useState } from 'react';
import { database, dbfire } from '../../config/firebase';
import Sidebar from '../sidebar';
import { useCookies } from 'react-cookie';
import FormTable from '../table/formTable';
const AppForm = () => {
  const [formName, setFormName] = useState('');
  const [description, setDescription] = useState('');
  const [formKey, setFormKey] = useState('');
  const [cookies] = useCookies();
  const [formList,setFormList]=useState([{ formName:"",formKey:"",Description:""}])

  const key = cookies['user'];

  const formDetails = {
    formName: formName,
    formKey: formKey,
    description: description,
  };
  const createForm = async (event:any) => {
    event.preventDefault();
    try {
      await setDoc(doc(dbfire, 'form', key), formDetails)
      .then(() => {
        console.log('created');
      });
    } catch (error) {
      console.log(error)
    }
  };

  // const handleFormListChange = (e:any,index:any)=>{
  //   const { formName , nameValue } = e.target;
  //   const { formKey , keyValue } = e.target;
  //   const { description , desValue } = e.target;
  //   const list = [...formList];
  //   // list[index][formName]= nameValue
  //   // list[index][formKey]= keyValue
  //   // list[index][description]= desValue
  //   setFormList(list)
  // }

  const handleFormAdd = () => {
    setFormList([...formList,{ formName:"",formKey:"",Description:"" }])
  }
  return (
    <div className="mx-16 flex m-auto shadow-2xl border">
      <Sidebar />
      <div className='mt-4 mx-auto w-fit flex flex-col'>
        <h1 className='mx-auto mb-4 font-bold text-2xl'>name of the app</h1>
        <button className=' text-right bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-1 font-semibold tracking-wider text-white ' onClick={handleFormAdd}>add</button>
        {formList.map((formData,index) => (
        <form key={index} className="w-full flex justify-around">
          <input
            name="formName"
            className="border mr-4"
            type="text"
            placeholder="name"
            onChange={(e) => {
              setFormName(e.target.value);
            }}
          />
          <input
            name="formKey"
            className="border mr-4"
            type="text"
            placeholder="key"
            onChange={(e) => {
              setFormKey(e.target.value);
            }}
          />
          <input
            name="description"
            className="border mr-4"
            type="text"
            placeholder="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button onClick={createForm} className="border">Create From</button>
        </form>
        ))}
        <FormTable/>
      </div>
    </div>
  );
};

export default AppForm;
