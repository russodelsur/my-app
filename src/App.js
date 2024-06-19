import logo from './logo.svg';
import './App.css';
import React from 'react';
import usePhotoGallery from './use-photo-gallery';
import { IonReactRouter } from '@ionic/react-router';
import { IonApp } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import PhotoCapture from './CapturePhotos';

function App() {
  const { takePhoto } = usePhotoGallery();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => takePhoto()} size="large" style={{margin:"auto"}} >
          PHOTO MATE
        </button>
      </header>
      {/* <IonApp>
      <IonReactRouter>
        <Route path="/capture" component={PhotoCapture} exact />
        <Redirect exact from="/" to="/capture" />
      </IonReactRouter>
    </IonApp> */}
    </div>
  );
}

export default App;
