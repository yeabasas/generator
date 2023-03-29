import { onSnapshot, collection, query, where,doc ,deleteDoc, DocumentSnapshot} from 'firebase/firestore';
import { Fragment, SetStateAction, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../config/AuthContex';
import { dbfire } from '../../../config/firebase';
import EditableAppTable from '../editableAppTable';
import ReadOnlyRow from '../readOnlyRow';
const Table = () => {
  const [posts, setPosts] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const colRef = collection(dbfire, 'application');
  const colRefDoc = doc(collection(dbfire, 'form'));

  const {appId}=useParams()
  const q = query(colRef, where('userId', '==', userId));
  useEffect(() => {
    const display = onSnapshot(q, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push({...doc.data(),appId:doc.id});
      });
      setPosts(items);
    });
    return () => {
      display();
    };
  }, []);

  async function deleteApp(app:any) {
    try {
        await deleteDoc(doc(colRef,app));
        console.log('deleted')
      } catch (error) {
      console.error(error);
    }
  }
  /**************  editable ********************/
  
  const [attributeList, setAttributeList] = useState([
    { name: '', description: ''},
  ]);
  const handleInputChange = (
    e: { target: { name: string; value: string } },
    index: string | number
  ) => {
    const { name, value } = e.target;
    const lists = [...attributeList];
    lists[index][name] = value;
    console.log(lists);
    setAttributeList(lists);
  };

  const [editPostId,setEditPostId] = useState(null)
  const [editFormData,setEditPostData]=useState({name:'',description:''})
  
  const handleEditClick =(e: { preventDefault: () => void; },post: { name:string, description:string, id: SetStateAction<null>; })=>{
    e.preventDefault();
    setEditPostId(post.id)
    const formValues = {
      name: post.name, 
      description: post.description
    }
    setEditPostData(formValues)
  }
  return (
    <form>
      <table className="w-full">
        <thead className="bg-gray-100 rounded">
          <tr className="p-2">
            <th className="p-2 border border-l-0 border-t-0">App Name</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody className="mx-auto">
          {posts.map((post: any, index) => (
              <Fragment>
                {editPostId === post.id ?(
                  <EditableAppTable handleInputChange={handleInputChange}/>
                ):(
                  <ReadOnlyRow post={post} handleEditClick={handleEditClick}/>
                )}
              </Fragment>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default Table;

// <td>
//   <Link to={`forms/${post.id}`}>
//     <button className="bg-gray-300 p-1 mx-2 border rounded">Details</button>
//   </Link>
//     <button className="bg-green-300 p-1 mr-2 border rounded">update</button>
//     <button className="bg-red-400 p-1 border rounded" onClick={()=>deleteApp(post.appId)}>Delete</button>
// </td>