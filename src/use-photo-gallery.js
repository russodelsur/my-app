import React from 'react';
import { Camera, CameraResultType, CameraSource, Photo } from './capacitor-camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

const PHOTO_STORAGE = 'photos';

export default function usePhotoGallery () {

  const [photos, setPhotos] = React.useState([]);

  const savePicture = async (photo, fileName)=> {
    const base64Data = await base64FromPath(photo.webPath);
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
  
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      allowEditing: true,
      quality: 100,
      isWeb: true,
    });
    const fileName = Date.now() + '.jpeg';
    const savedPhoto = await savePicture(photo, fileName);
    const newPhotos = [savedPhoto, ...photos];
    setPhotos(newPhotos);
  };

  const saveAllPhotos = async () => {
    await Preferences.set({
      key: 'photos',
      value: JSON.stringify(photos),
    });
  };

  return {
    photos,
    takePhoto,
    saveAllPhotos,
  };
}

async function base64FromPath(path){
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
}
