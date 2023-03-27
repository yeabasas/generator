import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../config/AuthContex';
import { dbfire } from '../../config/firebase';

const Table = () => {
  const [posts, setPosts] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const colRef = collection(dbfire, 'application');
  const {appId}=useParams()
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
  return (
      <table className="w-full">
        <thead className="bg-gray-100 rounded">
          <tr className="p-2">
            <th className="p-2 border border-l-0 border-t-0">App Name</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody className="mx-auto">
          {posts.map((post: any, index) => (
            <tr key={index}>
              <td className='border border-l-0 pl-9'>{post.name}</td>
              <td  className='border border-r-0 pl-9'>{post.description}</td>
              <td>
                <Link to={`forms/${post.id}`}>
                  <button className="bg-gray-200 p-1 border rounded">Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default Table;
