import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        style={{
          background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          color: '#fff',
        }}
      >
        {/* Optional Image/Illustration Section */}
        

        {/* Text Content Section */}
        <div
          style={{
            flex: '1.5',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
            animation: 'fadeIn 1s ease-in-out',
          }}
        >
          <div
          style={{
            flex: '1',
            textAlign: 'center',
            paddingRight: '20px',
          }}
        >
          <img
            src="https://www.icegif.com/wp-content/uploads/2023/12/icegif-234.gif"
            alt="Mood Tracker Illustration"
            style={{
              width: '100%',
              maxWidth: '850px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
            }}
          />
        </div>
        
        
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '15px' }}>💡 About Our App</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            Welcome to our mood-tracking app! 🌟<br />
            Our app helps you monitor your emotional well-being in a simple and visual way.
            Track your moods, identify patterns, and explore a better you through self-awareness and reflection.
          </p>
        </div>

        {/* Animation Keyframes */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateX(40px); }
              to { opacity: 1; transform: translateX(0); }
            }
          `}
        </style>
      </IonContent>
    </IonPage>
  );
};


export default About;
