import React from "react";

const EditableRow = (handleInputChange: React.ChangeEventHandler<HTMLInputElement> | undefined) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required
          name="name"
          placeholder="app name..."
          onChange={handleInputChange}
          ></input>
      </td>
      <td>
        <input
          type="text"
          required
          name="description"
        //   value={handleInputChange}
          placeholder="description..."
          onChange={handleInputChange}
        ></input>
      </td>
    </tr>
  );
};

export default EditableRow;