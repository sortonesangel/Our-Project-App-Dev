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
      <IonContent className="ion-padding">
        <h2>Details: Mood Tracker</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {moods.map((mood, index) => (
            <IonButton 
              key={index} 
              onClick={() => openModal(mood)} 
              style={{ fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }}
            >
              {mood.emoji}
            </IonButton>
          ))}
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
