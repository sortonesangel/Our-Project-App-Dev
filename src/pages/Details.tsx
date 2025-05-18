import { 
  IonBackButton,
  IonButtons,
  IonContent, 
  IonHeader, 
  IonModal,
  IonButton,
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import { useState } from 'react';

const Details: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentMood, setCurrentMood] = useState({ emoji: '', title: '', description: '' });

  const moods = [
    { emoji: '😃', title: 'Happy', description: 'Feeling joyful and content.' },
    { emoji: '😢', title: 'Sad', description: 'Feeling upset or down.' },
    { emoji: '😡', title: 'Angry', description: 'Feeling frustration or anger.' },
    { emoji: '😐', title: 'Neutral', description: 'Feeling calm or indifferent.' },
    { emoji: '😟', title: 'Anxious', description: 'Feeling worried or uneasy.' },
    { emoji: '🤔', title: 'Thoughtful', description: 'Deep in thought or pondering something.' },
  ];

  const openModal = (mood: { emoji: string; title: string; description: string }) => {
    setCurrentMood(mood);
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Our-Project-App-Dev/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Background image + overlay container */}
      <IonContent fullscreen style={{ position: 'relative' }}>
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("https://getwallpapers.com/wallpaper/full/a/8/e/1416764-download-sasuke-wallpaper-1920x1080.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          }}
        />

        {/* Content on top of background */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '1rem',
            color: '#fff',
            minHeight: '100%',
          }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Details: Mood Tracker</h2>

          <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '16px', lineHeight: '1.6' }}>
            Our app, <strong>MoodTracker</strong>, is designed to help you monitor and understand your emotions anytime, anywhere. 
            Whether you're feeling happy, sad, anxious, or anything in between, this app allows you to easily log your mood with just a few taps. 
            MoodTracker aims to promote emotional awareness and mental well-being through a user-friendly and engaging interface. 
            It’s perfect for anyone who wants to reflect on their daily feelings and recognize emotional patterns over time.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
            {moods.map((mood, index) => (
              <IonButton 
                key={index} 
                onClick={() => openModal(mood)} 
                style={{ 
                  fontSize: '24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '60px', 
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#ffd700',
                  color: '#222',
                }}
              >
                {mood.emoji}
              </IonButton>
            ))}
          </div>
        </div>

        {/* Modal for displaying mood details */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{currentMood.title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div style={{ textAlign: 'center', fontSize: '48px' }}>{currentMood.emoji}</div>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px' }}>
              {currentMood.description}
            </p>
            <IonButton expand="full" onClick={() => setShowModal(false)} style={{ marginTop: '20px' }}>
              Close
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};


export default Details;
