import { Card } from 'antd';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../config/AuthContex';
import { dbfire } from '../../../config/firebase';

const FormTable = () => {
  const [posts, setPosts] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const colRef = collection(dbfire, 'form');
  const { appId } = useParams()
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
  const params = useParams()
  const pathId = params['appId']
  return (
    <div>
    <table className="w-full">
      <thead className="bg-gray-100 rounded">
        <tr className="p-2">
          <th className="p-2 border border-l-0 border-t-0">Form Name</th>
          <th className="p-2">Form Key</th>
          <th className="p-2">App Reference</th>
          <th className="p-2">Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="mx-auto">
      {posts.map((post: any, index) => (
          <div key={index}>
            {(() => {
              if (post.appId != pathId) return;
              else {
                return (
                  <tr key={index}>
                    <td className='border border-l-0 pl-9'>{post.formName}</td>
                    <td className='border border-l-0 pl-9'>{post.formKey}</td>
                    <td className='border border-l-0 pl-9'>{post.appId}</td>
                    <td className='border border-r-0 pl-9'>{post.description}</td>
                    <td>
                      <Link to={`attribute/${post.formKey}`}>
                        <button className="bg-gray-200 p-1 border rounded">Details</button>
                      </Link>
                    </td>
                </tr>
                )
              }
            })()}
          </div>
      ))}
      </tbody>
        </table>
        </div>
  );
};

export default FormTable;
