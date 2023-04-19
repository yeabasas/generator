/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Form, Input, Table, message } from 'antd';
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  Fragment,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../config/AuthContex';
import { dbfire } from '../../../config/firebase';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';


const Tables = () => {
  const [posts, setPosts] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const colRef = collection(dbfire, 'application');
  const params = useParams();
  const appId = params['appId'];
  const docRef = doc(dbfire, 'application', `${appId}`);
  const [editingRow, setEditingRow] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const q = query(colRef, where('userId', '==', userId));

  useEffect(() => {
    const display = onSnapshot(q, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), appId: doc.id, key: doc.id });
      });
      setPosts(items);
    });
    return () => {
      display();
    };
  }, []);
  const columns = [
    {
      title: 'App Name',
      dataIndex: 'name',
      render: (
        text:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | ReactFragment
          | ReactPortal
          | null
          | undefined,
        record: { name: any; key: null }
      ) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="name">
              <Input
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
              />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (
        text:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | ReactFragment
          | ReactPortal
          | null
          | undefined,
        record: { description: any; key: any }
      ) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="description">
              <Input
                name="description"
                value={editFormData.description}
                onChange={handleEditFormChange}
              />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      render: (
        _: any,
        record: {
          key: SetStateAction<any>;
          name: any;
          description: any;
          appId: string;
          id:any;
        }
      ) => {
        return (
          <>
            {editingRow != record.key ? (
              <>
              <Link to={`forms/${record.id}`}>
                  <Button type="link">
                    <InfoOutlinedIcon />
                  </Button>
                </Link>
                <Button
                  type="link"
                  onClick={() => {
                    setEditingRow(record.key);
                    form.setFieldsValue({
                      name: record.name,
                      description: record.description,
                    });
                  }}
                >
                  <UpgradeOutlinedIcon />
                </Button>
                <Button
                  danger
                  type="link"
                  onClick={() => deleteApp(record.appId)}
                >
                  <DeleteOutlinedIcon />
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="link"
                  onClick={(e) => handleEditFormSubmit(e, record.appId)}
                >
                  save
                </Button>
                <Button type="link" onClick={handleCancel}>
                  cancel
                </Button>
              </>
            )}
          </>
        );
      },
    },
  ];

  async function deleteApp(app: any) {
    try {
      await deleteDoc(doc(colRef, app));
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  }
  /**************  editable ********************/

  const handleEditFormChange = (event: {
    preventDefault: () => void;
    target: { getAttribute: (arg0: string) => any; value: any };
  }) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const [editPostId, setEditPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
  });

  const appDetails = {
    name: editFormData.name,
    description: editFormData.description,
  };

  const handleEditClick = (
    e: { preventDefault: () => void },
    post: { name: string; description: string; id: SetStateAction<null> }
  ) => {
    e.preventDefault();
    setEditPostId(post.id);
    const formValues = {
      name: post.name,
      description: post.description,
    };
    setEditFormData(formValues);
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    setEditingRow(null);
  };

  const handleEditFormSubmit = async (e: any, key: string) => {
    e.preventDefault();
    const socRef = doc(dbfire, 'application', key);
    try {
      await updateDoc(socRef, appDetails)
        .then(() => setEditingRow(null))
        .then(message.success('updated successfully'));
    } catch (error) {
      console.log(error);
    }
  };
  const onFinish = (e: any) => {
    e.preventDefault();
    const updatedDataSource = [...dataSource];
    setDataSource(updatedDataSource);
    setEditingRow(null);
  };

  return (
      <Form form={form} onFinish={onFinish}>
        <Table columns={columns} dataSource={posts} />
      </Form>
    // <form>
    //   <table className="min-w-full">
    //     <thead className="bg-gray-100 rounded">
    //       <tr>
    //         {/* <th className="p-2 border border-l-0 border-t-0">App Name</th>
    //         <th className="p-2 border border-l-0 border-t-0">Description</th> */}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {posts.map((post: any, index) => (
    //         <Fragment>
    //           {editPostId === post.id ? (
    //             <tr>
    //               <td>
    //                 <input
    //                   type="text"
    //                   className="border-2 border-black"
    //                   required
    //                   name="name"
    //                   placeholder="app name..."
    //                   value={editFormData.name}
    //                   onChange={handleEditFormChange}
    //                 ></input>
    //               </td>
    //               <td>
    //                 <input
    //                   type="text"
    //                   required
    //                   className="border-2 border-black border-radius-2"
    //                   name="description"
    //                   value={editFormData.description}
    //                   placeholder="description..."
    //                   onChange={handleEditFormChange}
    //                 ></input>
    //               </td>
    //               <td>
    //                 <Button
    //                   className="bg-green-400 px-3 p-1 mx-2 border rounded"
    //                   onClick={(e) => handleEditFormSubmit(e, post.appId)}
    //                 >
    //                   Save
    //                 </Button>
    //                 <Button
    //                   className="bg-red-500 p-1 mr-2 border rounded"
    //                   onClick={handleCancel}
    //                 >
    //                   Cancel
    //                 </Button>
    //               </td>
    //             </tr>
    //           ) : (
    //             <tr>
    //               <td className="border border-l-0 pl-9">{post.name}</td>
    //               <td className="border border-r-0 pl-9">{post.description}</td>
    //               <td>
    //                 <Link to={`forms/${post.id}`}>
    //                   <Button type="primary" className="bg-blue-500 mx-2">
    //                     <InfoOutlinedIcon />
    //                   </Button>
    //                 </Link>
    //                 <Button
    //                   type="default"
    //                   className="mr-2"
    //                   onClick={(event) => handleEditClick(event, post)}
    //                 >
    //                   <UpgradeOutlinedIcon />
    //                 </Button>
    //                 <Button
    //                   danger
    //                   type="default"
    //                   onClick={() => deleteApp(post.appId)}
    //                 >
    //                   <DeleteOutlinedIcon />
    //                 </Button>
    //               </td>
    //             </tr>
    //           )}
    //         </Fragment>
    //       ))}
    //     </tbody>
    //   </table>
    //     </form>
  );
};

export default Tables;
