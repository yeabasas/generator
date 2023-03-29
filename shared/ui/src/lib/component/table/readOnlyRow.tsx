import React from "react";

const ReadOnlyRow = ({ post, handleEditClick }:any) => {
  return (
    <tr>
      <td>{post.name}</td>
      <td>{post.description}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, post)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;