import { Card } from 'antd';
import { onSnapshot, collection, query, where, doc, deleteDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../config/AuthContex';
import { dbfire } from '../../../config/firebase';

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
        items.push(doc.data());
      });
      setPosts(items);
    });
    return () => {
      display();
    };
  }, []);

  const deleteForm = async (postId: string | undefined)=>{
    const formDoc = doc(colRef,postId)
    await deleteDoc(formDoc)
  }
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
                  <tr key={index}>
                    <td className='border border-l-0 pl-9'>{post.formName}</td>
                    <td className='border border-l-0 pl-9'>{post.formKey}</td>
                    <td className='border border-l-0 pl-9'>{post.appId}</td>
                    <td className='border border-r-0 pl-9'>{post.description}</td>
                    <td>
                      <Link to={`attribute/${post.id}`}>
                        <button className="bg-gray-200 p-1 mr-2 border rounded">Details</button>
                      </Link>
                      <button className="bg-gray-400 p-1 mr-2 border rounded">Update</button>
                      <button className="bg-red-400 p-1 border rounded" onClick={()=>{deleteForm(post.id)}}>Delete</button>
                    </td>
                </tr>
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
