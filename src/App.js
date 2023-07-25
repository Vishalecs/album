import React, { useState } from 'react';
import AlbumsComponent from './component/AlbumsComponent';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);

 

  return (
    <div className="App">
     
      <main>
        <AlbumsComponent albums={albums} setAlbums={setAlbums} />
      </main>
    </div>
  );
}

export default App;