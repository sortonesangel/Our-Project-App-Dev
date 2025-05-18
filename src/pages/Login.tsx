import {
  IonAlert,
  IonButton,
  IonContent,
  IonPage,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const NotificationBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Heads up!"
      message={message}
      buttons={['Close']}
    />
  );
};

const AccessPortal: React.FC = () => {
  const router = useIonRouter();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [showNotice, setShowNotice] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });

    if (error) {
      setNotice(error.message);
      setShowNotice(true);
      return;
    }

    setToastVisible(true);
    setTimeout(() => {
      router.push('/Our-Project-App-Dev/app', 'forward', 'replace');
    }, 300);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
 style={{
  backgroundImage: 'url("https://discovertemplate.com/wp-content/uploads/2021/06/Emoji-Animated-GIF-Icon-pack.gif")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain', // Or use 'cover' if you want it full screen
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
}}

>
          <div
            style={{
              backgroundColor: 'rgba(194, 193, 194, 0.57)', 
              borderRadius: '15px',
              padding: '30px',
              width: '100%',
              maxWidth: '420px',
              backdropFilter: 'blur(8px)', 
              border: '1px solid rgba(255, 255, 255, 0.68)',
            }}
          >
           
          <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  }}
>
  <img
    src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f60a.png"
    alt="Smiling Face Emoji"
    style={{ width: '60px', height: '60px' }}
  />
  <img
    src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f60d.png"
    alt="Heart Eyes Emoji"
    style={{ width: '60px', height: '60px' }}
  />
  <img
    src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f622.png"
    alt="Crying Face Emoji"
    style={{ width: '60px', height: '60px' }}
  />
  <img
    src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f973.png"
    alt="Partying Face Emoji"
    style={{ width: '60px', height: '60px' }}
  />
  <img
    src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f633.png"
    alt="Flushed Face Emoji"
    style={{ width: '60px', height: '60px' }}
  />
</div>


            <h2
  style={{
    color: '#ffffff', // Light pink
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
  }}
>
  Welcome to Mood Tracker
</h2>

            {/* Email Input */}
            <div style={{ position: 'relative', marginBottom: '15px' }}>
              <input
                type="email"
                placeholder=" "
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#282828',
                  border: '1px solidrgb(208, 25, 138)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '12px 10px',
                  fontSize: '16px',
                  transition: 'box-shadow 0.3s ease',
                }}
              />
              {userEmail.length === 0 && (
                <label
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    color: '#FFC0CB',
                    fontSize: '16px',
                    pointerEvents: 'none',
                    transform: 'translateY(-50%)',
                    transition: '0.2s ease all',
                  }}
                >
                  Email
                </label>
              )}
            </div>

            {/* Password Input */}
            <div style={{ position: 'relative', marginBottom: '25px' }}>
              <input
                type="password"
                placeholder=" "
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#282828',
                  border: '1px solidrgb(164, 26, 120)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '12px 10px',
                  fontSize: '16px',
                  transition: 'box-shadow 0.3s ease',
                }}
              />
              {userPassword.length === 0 && (
                <label
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    color: '#FFC0CB',
                    fontSize: '16px',
                    pointerEvents: 'none',
                    transform: 'translateY(-50%)',
                    transition: '0.2s ease all',
                  }}
                >
                  Password
                </label>
              )}
            </div>

            {/* Login Button */}
            <IonButton
              expand="block"
              style={{
                backgroundColor: '#1DB954',
                color: '#ffffff',
                fontWeight: 'bold',
                borderRadius: '10px',
                marginBottom: '10px',
                transition: 'background-color 0.4s ease, box-shadow 0.3s ease',
              }}
              onClick={handleLogin}
            >
              Log In
            </IonButton>

            {/* Register Link */}
            <IonButton
              routerLink="/Our-Project-App-Dev/Register"
              expand="block"
              fill="clear"
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                fontSize: '14px',
                transition: 'color 0.3s ease',
              }}
            >
              Need an account? Register here
            </IonButton>
          </div>
        </div>

        <NotificationBox message={notice} isOpen={showNotice} onClose={() => setShowNotice(false)} />

        <IonToast
          isOpen={toastVisible}
          onDidDismiss={() => setToastVisible(false)}
          message="Welcome! Redirecting to your dashboard..."
          duration={1500}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default AccessPortal;
