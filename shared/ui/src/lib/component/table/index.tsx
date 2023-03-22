import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../config/AuthContex';
import { dbfire } from '../../config/firebase';
import { storage } from '../../config/firebase';
import { routeName } from '../../constant';
import { Button, Modal,Space } from 'antd';

const Table = () => {
  const [cookies] = useCookies();
  const [posts, setPosts] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const colRef = collection(dbfire, 'application form');
  const q = query(colRef, where('userId', '==', userId));
  useEffect(() => {
    const display = onSnapshot(q, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPosts(items);
    });
    return () => {
      display();
    };
  }, []);
  const key =cookies['docRef']


  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 20000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <Space wrap>
      <Button type="default" onClick={showModal}>
        Open Table
      </Button>
      <Modal
        title="Created Apps"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{hidden:true}}
      >
        <table className="w-full">
          <thead className="bg-gray-100 rounded">
            <tr className="p-2">
              <th className="p-2">App Name</th>
              <th className="p-2">Description</th>
            </tr>
          </thead>
          <tbody className="mx-auto">
            {posts.map((post: any, index) => (
              <tr key={index} className="border border-x-0 border-">
                <td>{post.name}</td>
                <td>{post.description}</td>
                <td>
                  <Link to={`${routeName.APPLICATION}/${useContext(AuthContext).currentUser?.uid}${routeName.APPLICATIONFORM}/${key}`}>
                    <button className="bg-gray-200 p-1 rounded">Details</button>
                  </Link>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </Space>
  );
};

export default Table;
