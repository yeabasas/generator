import React from 'react'

const EditableFormTable = () => {
  return (
    <tr>
        <td><input type="text" placeholder='form name' /></td>
        <td><input type="text" placeholder='form key' /></td>
        <td><input type="text" placeholder='description' /></td>
    </tr>
  )
}

export default EditableFormTable