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
  const [customData, setCustomData] = useState<Array<any>>([]);
  const [attCustomData, setAttCustomData] = useState<Array<any>>([]);
  const [render, setRender] = useState(false);
  const [column, setColumn] = useState([]);
  const [row, setRow] = useState([]);
  const colRef = collection(dbfire, 'form');
  const attColRef = collection(dbfire, 'customReceivedData');
  const params = useParams();
  const formId = params['formId'];

  const toApi = query(colRef, where('id', '==', formId));
  const tooApi = query(attColRef, where('formId', '==', formId));
  useEffect(() => {
    const customData1: any=[];
    const display = onSnapshot(toApi, (querySnapshot) => {
      querySnapshot.forEach((single) => {
        customData1.push(single.data()['attribute']);
      });
      const columns = customData1[0].map((i: any) => {
          return {
              title: `${i['inputLabel']}`,
              dataIndex: `${i['inputKey']}`,
              key: `${i['inputKey']}`,
            };
        });
        setCustomData(...customData1);
        setColumn(columns)
        setRender(true);
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
      })
          setRow(items)
          console.log(items)
      setRender(true);
    });
    return () => {
        display();
    };
}, [formId]);

const dataSources = ()=>{
    let returnd
    attCustomData.map((i:any)=>(
        <>
        {customData.map((k:any)=>{
            returnd= i[k['inputKey']];
        })}
        </>
    ))
    return returnd;
}
  async function deleteApp(app: any) {
    try {
      await deleteDoc(doc(attColRef, app)).then(() =>
        message.success('deleted')
      );
    } catch (error) {
      console.error(error);
    }
  }
  /**************  editable ********************/

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
  const [element, setElement] = useState({});

  const handleInputChange = (
    e: { target: { name: string; value: string } },
    index: string | number
  ) => {
    const { name, value } = e.target;
    const list = { ...element };
    list[name] = value;
    attCustomData[index][name] = value;
    setEditFormData(list);
  };

//   const dataSource = Object.keys(attCustomData).map((p: any) =>
//     Object.keys(customData).map((i: any) => {
//         return{
//             key:`${p[i['inputKey']]}`,
//             title:`${p[i['inputKey']]}`
//         }
//     })
//   );


  return (
    <div>
      {render && <Table columns={column} dataSource={row} />}
    </div>
  );
};

export default AttributeTable;
