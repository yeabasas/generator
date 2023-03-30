/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Card, message } from 'antd';
import {SaveOutlined} from '@ant-design/icons'
import { ref, remove } from 'firebase/database';
import { onSnapshot, collection, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../config/AuthContex';
import { dbfire } from '../../../config/firebase';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const FormTable = () => {
  const [posts, setPosts] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const colRef = collection(dbfire, 'form');
  const params = useParams()
  const pathId = params['appId']
  const q = query(colRef, where('userId', '==', userId));

  useEffect(() => {
    const display = onSnapshot(q, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), docId: doc.id });
      });
      setPosts(items);
    });
    return () => {
      display();
    };
  }, []);

  const deleteForm = async (id: any) => {
    try {
      await deleteDoc(doc(colRef, id))
        .then(() => console.log('deleted'))
    } catch (error) {
      console.log(error)
    }
  }
  /******************editable************************ */
  const handleEditFormChange = (event: { preventDefault: () => void; target: { getAttribute: (arg0: string) => any; value: any; }; }) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const [editPostId, setEditPostId] = useState(null)
  const [editFormData, setEditFormData] = useState({ formName: '', formKey: '', appId:"",  description: '' })

  const appDetails = { formName: editFormData.formName, formKey: editFormData.formKey, appId: editFormData.appId, description: editFormData.description };

  const handleEditClick = (e: { preventDefault: () => void; }, post: { formName: string, formKey: string, appId:string, description: string, id: SetStateAction<null>; }) => {
    e.preventDefault();
    setEditPostId(post.id)
    const formValues = {
      formName: post.formName,
      formKey: post.formKey,
      appId: post.appId,
      description: post.description
    }
    setEditFormData(formValues)
  }

  const handleCancel = (e: any) => {
    e.preventDefault()
    setEditPostId(null);
  };

  const handleEditFormSubmit = async (e: any, key: string) => {
    e.preventDefault();
    const socRef = doc(dbfire, 'form', key)
    try {
      await updateDoc(socRef, appDetails)
        .then(message.success('updated successfully'))

    } catch (error) {
      console.log(error)
    }

    setEditPostId(null);
  };
  return (
    <div>
      <table className="w-full">
        <thead className="bg-gray-100 rounded">
          <tr className="p-2">
            <th className="p-2 border border-l-0 border-t-0">Form Name</th>
            <th className="p-2">Form Key</th>
            <th className="p-2">App Reference</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        {posts.map((post: any, index) => (
          <tbody key={index} className="mx-auto">
            {(() => {
              if (post.appId != pathId) return;
              else {
                return (
                  <>
                    {editPostId === post.id ? (
                      <tr>
                        <td>
                          <input
                            type="text"
                            className='border-2 border-black'
                            required
                            name="formName"
                            placeholder="Form name..."
                            value={editFormData.formName}
                            onChange={handleEditFormChange}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            className='border-2 border-black'
                            required
                            name="formKey"
                            placeholder="key..."
                            value={editFormData.formKey}
                            onChange={handleEditFormChange}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            className='hover:cursor-disabled'
                            required
                            disabled
                            name="appId"
                            value={editFormData.appId}
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
                          <Button type='primary' className="bg-blue-400 mx-2" onClick={(e) => handleEditFormSubmit(e, post.docId)}><SaveOutlinedIcon/></Button>
                          <Button type='default' danger onClick={handleCancel}><ClearOutlinedIcon/></Button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={index}>
                        <td className='border border-l-0 pl-9'>{post.formName}</td>
                        <td className='border border-l-0 pl-9'>{post.formKey}</td>
                        <td className='border border-l-0 pl-9'>{post.appId}</td>
                        <td className='border border-r-0 pl-9'>{post.description}</td>
                        <td>
                          <Link to={`attribute/${post.id}`}>
                            <Button type='primary' className='bg-blue-500 mx-2'><SettingsOutlinedIcon /></Button>
                          </Link>
                          <Button type='default' className='mr-2' onClick={(event) => handleEditClick(event, post)}><UpgradeOutlinedIcon /></Button>
                          <Button danger type='default' onClick={() => deleteForm(post.docId)}><DeleteOutlinedIcon /></Button>
                        </td>
                      </tr>
                    )
                    }
                  </>
                )
              }
            })()}
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default FormTable;
