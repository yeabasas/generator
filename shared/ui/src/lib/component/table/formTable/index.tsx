/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Card, Form, Input, Table, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { ref, remove } from 'firebase/database';
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

const FormTable = () => {
  const [posts, setPosts] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const colRef = collection(dbfire, 'form');
  const params = useParams();
  const pathId = params['appId'];
  const [editingRow, setEditingRow] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const q = query(colRef, where('appId', '==', pathId));

  useEffect(() => {
    const display = onSnapshot(q, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), docId: doc.id, key: doc.id });
      });
      setPosts(items);
    });
    return () => {
      display();
    };
  }, []);

  async function deleteForm(app: any) {
    try {
      await deleteDoc(doc(colRef, app));
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  }
  /******************editable************************ */
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
    formName: '',
    formKey: '',
    appId: '',
    description: '',
  });

  const appDetails = {
    formName: editFormData.formName,
    formKey: editFormData.formKey,
    appId: editFormData.appId,
    description: editFormData.description,
  };

  const handleEditClick = (
    e: { preventDefault: () => void },
    post: {
      formName: string;
      formKey: string;
      appId: string;
      description: string;
      id: SetStateAction<null>;
    }
  ) => {
    e.preventDefault();
    setEditPostId(post.id);
    const formValues = {
      formName: post.formName,
      formKey: post.formKey,
      appId: post.appId,
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
    const socRef = doc(dbfire, 'form', key);
    try {
      await updateDoc(socRef, appDetails)
        .then(() => setEditingRow(null))
        .then(message.success('updated successfully'));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Form Name',
      dataIndex: 'formName',
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
        record: { FormName: any; key: null }
      ) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="formName">
              <Input
                name="formName"
                value={editFormData.formName}
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
      title: 'Form Key',
      dataIndex: 'formKey',
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
        record: { FormKey: any; key: null }
      ) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="formKey">
              <Input
                name="formKey"
                value={editFormData.formKey}
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
      title: 'App Ref',
      dataIndex: 'appId',
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
        record: { appId: any; key: null }
      ) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="appId">
              <Input
                name="appId"
                value={editFormData.appId}
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
          formName: any;
          formKey: any;
          appId: any;
          description: any;
          docId: any;
          id: any;
        }
      ) => {
        return (
          <>
            {!editingRow ? (
              <>
                <Link to={`attribute/${record.id}`}>
                  <Button type="link">
                    <InfoOutlinedIcon />
                  </Button>
                </Link>
                <Button
                  type="link"
                  onClick={() => {
                    setEditingRow(record.key);
                    form.setFieldsValue({
                      formName: record.formName,
                      formKey: record.formKey,
                      appId: record.appId,
                      description: record.description,
                    });
                  }}
                >
                  <UpgradeOutlinedIcon />
                </Button>
                <Button
                  danger
                  type="link"
                  onClick={() => deleteForm(record.docId)}
                >
                  <DeleteOutlinedIcon />
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="link"
                  onClick={(e) => handleEditFormSubmit(e, record.docId)}
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
  const onFinish = (e: any) => {
    e.preventDefault();
    const updatedDataSource = [...dataSource];
    setDataSource(updatedDataSource);
    setEditingRow(null);
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Table columns={columns} dataSource={posts} />
      </Form>
      {/* <table className="w-full">
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
      </table> */}
    </div>
  );
};

export default FormTable;
