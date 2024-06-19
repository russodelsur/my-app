import React, { useState } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';

const PhotoCapture = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(filesArray);
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                />
                <IonButton onClick={() => document.getElementById('fileInput')?.click()}>
                    Select Photos
                </IonButton>
                {selectedFiles.map((file, index) => (
                    <div key={index}>
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`Selected Preview ${index}`}
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </IonContent>
        </IonPage>
    );
};

export default PhotoCapture;
