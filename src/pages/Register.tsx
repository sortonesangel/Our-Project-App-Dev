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
  
  const Register: React.FC = () => {
    const navigation = useIonRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
  
    const doRegister = () => {
      if (!username || !email || !password) {
        setToastMessage('Please fill in all fields');
        setShowToast(true);
        return;
      }
  
      // Simulate saving data or calling an API
      console.log('User registered:', { username, email, password });
  
      // Redirect to app after registration
      navigation.push('/our-project-app-dev/app', 'forward', 'replace');
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Register</IonTitle>
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
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
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
  
          <IonButton expand="full" onClick={doRegister} style={{ marginTop: '20px' }}>
            Register
          </IonButton>
  
          {/* Navigate to Login Page */}
          <IonButton
            expand="full"
            fill="clear"
            routerLink="/our-project-app-dev"
            style={{ marginTop: '10px', textTransform: 'none' }}
          >
            Already have an account? Login here
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
  
  export default Register;
  