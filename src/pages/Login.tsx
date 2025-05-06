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
import { supabase } from '../utils/supabaseClient'; // Adjust path as needed

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const doLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) {
      setToastMessage(error.message);
      setShowToast(true);
    } else {
      navigation.push('/our-project-app-dev/app', 'forward', 'replace');
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
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            clearInput
            type="email"
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

        <IonButton
          expand="full"
          fill="clear"
          routerLink="/our-project-app-dev/register"
          style={{ marginTop: '10px', textTransform: 'none' }}
        >
          Don’t have an account? Register
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
