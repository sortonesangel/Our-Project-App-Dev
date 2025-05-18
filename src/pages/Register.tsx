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
  IonCard,
  IonCardContent,
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
        data: { username },
      },
    });

    if (error) {
      setToastMessage(error.message);
      setShowToast(true);
    } else {
      setToastMessage('Registered successfully! Redirecting to Login...');
      setShowToast(true);
      setTimeout(() => {
        navigation.push('/Our-Project-App-Dev/Login', 'forward', 'replace');
      }, 1500);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Background wrapper */}
        <div
          style={{
            backgroundImage: `url('https://25.media.tumblr.com/4981aa50cb40c02bb3a32ccd23293979/tumblr_mpzog4yg7X1s1minfo1_500.gif')`, // ← your image path here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
          }}
        >
          {/* Center container */}
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <IonCard
              style={{
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderRadius: '20px',
                padding: '16px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              <IonCardContent>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  Create Account
                </h2>

                <IonItem lines="inset">
                  <IonLabel position="floating">Username</IonLabel>
                  <IonInput
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                    clearInput
                  />
                </IonItem>

                <IonItem lines="inset">
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    clearInput
                  />
                </IonItem>

                <IonItem lines="inset">
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    clearInput
                  />
                </IonItem>

                <IonButton expand="block" onClick={doRegister} style={{ marginTop: '1.5rem' }}>
                  Register
                </IonButton>

                <IonButton
                  expand="block"
                  fill="clear"
                  routerLink="/Our-Project-App-Dev/login"
                  style={{ marginTop: '1rem', textTransform: 'none' }}
                >
                  Already have an account? Login here
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </div>

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
