import {
  collection,
  onSnapshot,
  where,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Fragment, SetStateAction, useEffect, useState } from 'react';
import { dbfire } from '../../../config/firebase';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, Input, Modal, Table, message } from 'antd';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const AttributeTable = () => {
  const [customData, setCustomData] = useState([]);
  const [attCustomData, setAttCustomData] = useState<any[]>([]);
  const colRef = collection(dbfire, 'form');
  const attColRef = collection(dbfire, 'customReceivedData');
  const params = useParams();
  const formId = params['formId'];

  const toApi = query(colRef, where('id', '==', formId));
  const tooApi = query(attColRef, where('formId', '==', formId));
  useEffect(() => {
    const display = onSnapshot(toApi, (querySnapshot) => {
      querySnapshot.forEach((single) => {
        setCustomData(single.data()['attribute']);
      });
    });
    return () => {
      display();
    };
  }, [formId]);

  useEffect(() => {
    const display = onSnapshot(tooApi, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), attId: doc.id });
      });
      setAttCustomData(items);
    });
    return () => {
      display();
    };
  }, [formId]);

  async function deleteApp(app: any) {
    try {
      await deleteDoc(doc(attColRef, app));
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

    const newFormDatas = { ...editFormData };
    newFormDatas[fieldName] = fieldValue;
    console.log(newFormDatas);
    setEditFormData(newFormDatas);
  };

  const [editPostId, setEditPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const appDetails = editFormData;

  const handleEditClick = (
    e: { preventDefault: () => void },
    p: { id: SetStateAction<null> }
  ) => {
    e.preventDefault();
    setEditPostId(p.id);
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    setEditPostId(null);
  };

  const handleEditFormSubmit = async (e: any, key: string) => {
    e.preventDefault();
    const socRef = doc(dbfire, 'customReceivedData', key);
    try {
      await updateDoc(socRef, appDetails).then(
        message.success('updated successfully')
      );
      console.log(key);
    } catch (error) {
      console.log(error);
    }

    setEditPostId(null);
  };
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [element, setElement] = useState({});

  const showModal = () => {
    setOpen(true);
  };

  const handleCancelation = () => {
    setOpen(false);
  };
  const handleInputChange = (
    e: { target: { name: string; value: string } },
    index: string | number
  ) => {
    const { name, value } = e.target;
    const list = { ...element };
    list[name] = value;
    console.log(list);
    attCustomData[index][name] = value;
    setEditFormData(list);
  };
const columns = customData.map((i: any) =>  (i.inputLabel) )
  

  return (
    <div>
      <table className="my-9 w-2/3">
        <thead className="bg-gray-100 rounded">
          <tr>
            {customData.map((i: any) => (
              <th>{i.inputLabel}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attCustomData.map((p: any, j: number) => (
            <>
              {editPostId === p.id ? (
                <tr>
                  {customData.map((i: any, index) => (
                    <td key={index}>
                      <input
                        name={i.inputKey}
                        value={p[i.inputKey]}
                        onChange={(e) => handleInputChange(e, j)}
                      />
                    </td>
                  ))}
                  <td>
                    <Button
                      className="bg-green-400 px-3 p-1 mx-2 border rounded"
                      onClick={(e) => handleEditFormSubmit(e, p.attId)}
                    >
                      Save
                    </Button>
                    <Button
                      className="bg-red-500 p-1 mr-2 border rounded"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ) : (
                <tr>
                  {customData.map((i: any, index) => (
                    <td key={index}>{p[i.inputKey]}</td>
                  ))}
                  <Button
                    type="default"
                    className="mr-2"
                    onClick={(event) => handleEditClick(event, p)}
                  >
                    <UpgradeOutlinedIcon />
                  </Button>
                  <Button
                    danger
                    type="default"
                    onClick={() => deleteApp(p.attId)}
                  >
                    <DeleteOutlinedIcon />
                  </Button>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
      <Table columns={columns}></Table>
    </div>
  );
};

export default AttributeTable;
