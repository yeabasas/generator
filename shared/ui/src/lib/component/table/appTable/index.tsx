/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, message } from 'antd';
import { onSnapshot, collection, query, where, doc, deleteDoc,updateDoc } from 'firebase/firestore';
import { Fragment, SetStateAction, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../config/AuthContex';
import { dbfire } from '../../../config/firebase';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
const Table = () => {
  const [posts, setPosts] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const colRef = collection(dbfire, 'application');
  const params = useParams()
  const appId = params['appId']
  const docRef = doc(dbfire, 'application',`${appId}`);

  const q = query(colRef, where('userId', '==', userId));
  useEffect(() => {
    const display = onSnapshot(q, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), appId: doc.id });
      });
      setPosts(items);
    });
    return () => {
      display();
    };
  }, []);

  async function deleteApp(app: any) {
    try {
      await deleteDoc(doc(colRef, app));
      console.log('deleted')
    } catch (error) {
      console.error(error);
    }
  }
  /**************  editable ********************/

  const handleEditFormChange = (event: { preventDefault: () => void; target: { getAttribute: (arg0: string) => any; value: any; }; }) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const [editPostId, setEditPostId] = useState(null)
  const [editFormData, setEditFormData] = useState({name:'',description:''})
  
  const appDetails = {name: editFormData.name, description: editFormData.description };

  const handleEditClick = (e: { preventDefault: () => void; }, post: { name: string, description: string, id: SetStateAction<null>; }) => {
    e.preventDefault();
    setEditPostId(post.id)
    const formValues = {
      name: post.name,
      description: post.description
    }
    setEditFormData(formValues)
  }

  const handleCancel = (e:any) => {
    e.preventDefault()
    setEditPostId(null);
  };

  const handleEditFormSubmit =async (e:any,key: string) => {
    e.preventDefault();
    const socRef = doc(dbfire,'application',key)
    try {
      await updateDoc(socRef,appDetails)
      .then(message.success('updated successfully'))
      
    } catch (error) {
      console.log(error)
    }
    
    setEditPostId(null);
  };

  return (
    <form> 
      <table className="min-w-full">
        <thead className="bg-gray-100 rounded">
          <tr >
            <th className="p-2 border border-l-0 border-t-0">App Name</th>
            <th className="p-2 border border-l-0 border-t-0">Description</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any, index) => (
            <Fragment>
              {editPostId === post.id ? (
                <tr>
                  <td>
                    <input
                      type="text"
                      className='border-2 border-black'
                      required
                      name="name"
                      placeholder="app name..."
                      value={editFormData.name}
                      onChange={handleEditFormChange}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      required
                      className='border-2 border-black border-radius-2'
                      name="description"
                      value={editFormData.description}
                      placeholder="description..."
                      onChange={handleEditFormChange}
                    ></input>
                  </td>
                  <td>
                    <Button className="bg-green-400 px-3 p-1 mx-2 border rounded" onClick={(e)=>handleEditFormSubmit(e,post.appId)}>Save</Button>
                    <Button className="bg-red-500 p-1 mr-2 border rounded" onClick={handleCancel}>Cancel</Button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className='border border-l-0 pl-9'>{post.name}</td>
                  <td className='border border-r-0 pl-9'>{post.description}</td>
                  <td>
                    <Link to={`forms/${post.id}`}>
                      <Button type='primary' className="bg-blue-500 mx-2"><SettingsOutlinedIcon /></Button>
                    </Link>
                    <Button type='default' className="mr-2" onClick={(event) => handleEditClick(event, post)}><UpgradeOutlinedIcon/></Button>
                    <Button danger type='default' onClick={() => deleteApp(post.appId)}><DeleteOutlinedIcon /></Button>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default Table;
