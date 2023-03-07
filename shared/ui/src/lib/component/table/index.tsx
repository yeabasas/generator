import { nanoid } from 'nanoid';
import React ,{ useState } from 'react'
import data from '../../data/data.json'

const Table = () => {
    const [contacts, setContacts] = useState(data);
    const [editFormData, setEditFormData] = useState<any>({
        appName: "",
        description: ""
      });
      const [addFormData, setAddFormData] = useState<any>({
        appName: "",
        description: ""
      });
    
  const handleAddFormChange = (event:any) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
      const handleAddFormSubmit = (event:any) => {
        event.preventDefault();
    
        const newContact = {
          id: nanoid(),
          appName: addFormData.appName,
          description: addFormData.description
        };
    
        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
      };
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>app name</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact:any)=>(
                    <tr>
                        <td>{contact.appName}</td>
                        <td>{contact.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <form onSubmit={handleAddFormSubmit}>
            <input
            type="text"
            name="appName"
            required
            placeholder="Enter a app name..."
            onChange={handleAddFormChange}
            />
            <input
            type="text"
            name="description"
            required
            placeholder="Enter an description..."
            onChange={handleAddFormChange}
            />
            <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default Table