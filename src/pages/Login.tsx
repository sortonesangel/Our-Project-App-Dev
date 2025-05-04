import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    IonToast,
    useIonRouter,
  } from '@ionic/react';
  import React, { useState } from 'react';
  
  const Login: React.FC = () => {
    const navigation = useIonRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
  
    const doLogin = () => {
      // Mock login check
      if (username === 'admin' && password === '1234') {
        navigation.push('/our-project-app-dev/app', 'forward', 'replace');
      } else {
        setToastMessage('Invalid username or password');
        setShowToast(true);
      }
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              clearInput
            />
          </IonItem>
  
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              clearInput
            />
          </IonItem>
  
          <IonButton expand="full" onClick={doLogin} style={{ marginTop: '20px' }}>
            Login
          </IonButton>
  
          <IonToast
            isOpen={showToast}
            message={toastMessage}
            duration={2000}
            onDidDismiss={() => setShowToast(false)}
            color="danger"
          />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;
  