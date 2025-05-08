import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { useState } from 'react';

const moods = [
  { label: 'Happy', image: 'https://i.pinimg.com/originals/9e/81/9f/9e819f2bf0468a90b1b20fbd619cc01c.gif' },
  { label: 'Sad', image: 'https://media.tenor.com/I0_lUowNpl8AAAAM/verdrietig-sad.gif' },
  { label: 'Angry', image: 'https://i.pinimg.com/originals/74/56/5d/74565dd451bec3132a4b52c137cc2f80.gif' },
  { label: 'Neutral', image: 'https://gifdb.com/images/high/neutral-face-emoji-q767nn9omca8k1ms.gif' },
  { label: ' Anxious', image: 'https://media.tenor.com/D7fCh4Uas3MAAAAj/imemotioal-emotional.gif' }
];

const Home: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
  };

  const displayedImage = selectedMood
    ? `/assets/moods/${selectedMood.toLowerCase()}.gif`
    : '/assets/moods/happy.gif'; // default to happy gif if no mood is selected

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        className="ion-padding"
        style={{
          backgroundImage: 'https://dci832c741skk.cloudfront.net/assets/files/54558/inside-out-2-review.800x600.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>
              Welcome to Our Exciting New App!
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            We're thrilled to have you here! Explore the features of our app, including the Mood Tracker, About page, and more. Start your journey with us and have fun!
            </p>
        <div style={{ marginTop: '30px', width: '100%' }}>
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              {moods.map((mood, index) => (
                <IonCol size="4" key={index} className="ion-text-center">
                  <img
                    src={mood.image}
                    alt={mood.label}
                    style={{
                      width: '70px',
                      height: '70px',
                      marginBottom: '5px',
                      borderRadius: '50%',
                      border: '2px solid white',
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleMoodClick(mood.label)}
                  />
                  <p style={{ fontSize: '1rem', color: '#fff' }}>{mood.label}</p>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>

        {/* Animation Keyframes */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </IonContent>
    </IonPage>
  );
};

export default Home;
