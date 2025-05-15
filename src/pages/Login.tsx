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
      <IonContent
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#f3f4f6', // Light gray background
        }}
      >
        {/* Floating Card */}
        <div
          style={{
            maxWidth: '400px',
            width: '100%',
            padding: '30px',
            borderRadius: '15px',
            background: '#ffffff', // White background for the card
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow
            textAlign: 'center',
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: '20px' }}>
            <img
              src="/assets/logo.png" // Replace with your logo path
              alt="Mood Tracker Logo"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            Welcome Back!
          </h1>

          {/* Email Input */}
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              clearInput
              type="email"
            />
          </IonItem>

          {/* Password Input */}
          <IonItem style={{ marginTop: '10px' }}>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              clearInput
            />
          </IonItem>

          {/* Login Button */}
          <IonButton
            expand="full"
            onClick={doLogin}
            style={{
              marginTop: '20px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Login
          </IonButton>

          {/* Register Link */}
          <IonButton
            expand="full"
            fill="clear"
            routerLink="/our-project-app-dev/register"
            style={{
              marginTop: '10px',
              fontSize: '14px',
              color: '#007aff', // Primary color for link
              textTransform: 'none',
            }}
          >
            Don’t have an account? Register
          </IonButton>
        </div>

        {/* Toast Notification */}
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
