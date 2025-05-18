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
import { supabase } from '../utils/supabaseClient';

const Register: React.FC = () => {
  const navigation = useIonRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const doRegister = async () => {
    if (!username || !email || !password) {
      setToastMessage('Please fill in all fields');
      setShowToast(true);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username, // optional metadata
        },
      },
    });

    if (error) {
      setToastMessage(error.message);
      setShowToast(true);
    } else {
      setToastMessage('Registered successfully! Redirecting to Login...');
      setShowToast(true);

      // Redirect to the Login page after successful registration
      setTimeout(() => {
        navigation.push('/Our-Project-App-Dev/Login', 'forward', 'replace'); // Redirect to Login
      }, 1500);
    }
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

        <IonButton
          expand="full"
          fill="clear"
          routerLink="/Our-Project-App-Dev/login"
          style={{ marginTop: '10px', textTransform: 'none' }}
        >
          Already have an account? Login here
        </IonButton>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
          color="medium"
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
