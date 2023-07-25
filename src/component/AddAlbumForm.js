import React, { useState } from 'react';
const AddAlbumForm = ({ handleAddAlbum }) => {
  const [userId, setUserId] = useState('');
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the correct data object to handleAddAlbum function
    handleAddAlbum({ userId: parseInt(userId), id: parseInt(id), title });
    setUserId('');
    setId('');
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add Album</button>
    </form>
  );
};

export default AddAlbumForm;
