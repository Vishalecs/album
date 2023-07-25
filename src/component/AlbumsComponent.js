import React, { useState, useEffect } from 'react';
import './AlbumsComponent.css';

const AlbumsComponent = () => {
  const [albums, setAlbums] = useState([]);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [editedData, setEditedData] = useState({
    userId: null,
    id: null,
    title: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAlbums();
  }, []);

  const handleUpdate = (id, userId, title) => {
    setEditingAlbum(id);
    setEditedData({ userId, id, title });
  };

  const handleSave = (id) => {
    // Find the album with the provided id and update its data
    const updatedAlbums = albums.map((album) =>
      album.id === id ? { ...editedData } : album
    );
    setAlbums(updatedAlbums);
    setEditingAlbum(null); // Clear the editing state
    setEditedData({ userId: null, id: null, title: '' });
  };

  const handleCancel = () => {
    setEditingAlbum(null); // Clear the editing state
    setEditedData({ userId: null, id: null, title: '' });
  };

  const handleDelete = (id) => {
    // Filter out the album with the provided id to delete it
    const updatedAlbums = albums.filter((album) => album.id !== id);
    setAlbums(updatedAlbums);
  };

  const handleAddNewAlbum = () => {
    setShowAddForm(true);
  };

  const handleAddAlbum = () => {
    // Create a new album object
    const newAlbum = {
      userId: editedData.userId,
      id: editedData.id,
      title: editedData.title,
    };
    setAlbums([...albums, newAlbum]); // Add the new album to the list
    setShowAddForm(false); // Hide the add form after adding
    setEditedData({ userId: null, id: null, title: '' }); // Clear the form data
  };

  return (
    <div>
      <h1>Albums</h1>
      {showAddForm ? (
        <div>
          <input
            type="number"
            placeholder="User ID"
            value={editedData.userId}
            onChange={(e) => setEditedData({ ...editedData, userId: parseInt(e.target.value) })}
          />
          <input
            type="number"
            placeholder="ID"
            value={editedData.id}
            onChange={(e) => setEditedData({ ...editedData, id: parseInt(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Title"
            value={editedData.title}
            onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
          />
          <button onClick={handleAddAlbum}>Add Album</button>
          <button onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleAddNewAlbum}>Add New Album</button>
      )}

      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {editingAlbum === album.id ? (
              <div>
                <input
                  type="number"
                  value={editedData.userId}
                  onChange={(e) => setEditedData({ ...editedData, userId: parseInt(e.target.value) })}
                />
                <input
                  type="number"
                  value={editedData.id}
                  onChange={(e) => setEditedData({ ...editedData, id: parseInt(e.target.value) })}
                />
                <input
                  type="text"
                  value={editedData.title}
                  onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                />
                <button onClick={() => handleSave(album.id)}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>User ID: {album.userId}</p>
                <p>ID: {album.id}</p>
                <p>Title: {album.title}</p>
                <button onClick={() => handleUpdate(album.id, album.userId, album.title)}>
                  Update
                </button>
                <button onClick={() => handleDelete(album.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumsComponent;