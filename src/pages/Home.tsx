import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { useState } from 'react';

const moods = [
  { label: 'Happy', image: 'https://i.pinimg.com/originals/9e/81/9f/9e819f2bf0468a90b1b20fbd619cc01c.gif' },
  { label: 'Sad', image: 'https://media.tenor.com/I0_lUowNpl8AAAAM/verdrietig-sad.gif' },
  { label: 'Angry', image: 'https://i.pinimg.com/originals/74/56/5d/74565dd451bec3132a4b52c137cc2f80.gif' },
  { label: 'Neutral', image: 'https://gifdb.com/images/high/neutral-face-emoji-q767nn9omca8k1ms.gif' },
  { label: 'Anxious', image: 'https://media.tenor.com/D7fCh4Uas3MAAAAj/imemotioal-emotional.gif' },
];

const Home: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        style={{
          backgroundImage:
            'url("https://dci832c741skk.cloudfront.net/assets/files/54558/inside-out-2-review.800x600.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          position: 'relative',
        }}
      >
        {/* Dark overlay para sa contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url("https://i.pinimg.com/474x/70/d4/f1/70d4f17f31e45122a7a3e965a6d2937e.jpg")',
            backgroundSize: 'cover',
            zIndex: 0,
            opacity: 0.7, // Optional para mas visible yung overlay
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem 1rem 1rem 1rem', // less bottom padding para lumapit 'You are feeling'
            textAlign: 'center',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              marginBottom: '0.5rem',
              letterSpacing: '0.05em',
            }}
          >
            Track Your Mood, Feel Your Day
          </h1>
          <p
            style={{
              fontSize: '1.20rem',
              fontWeight: '500',
              maxWidth: 500,
              margin: '0 auto 3rem auto',
            }}
          >
            Welcome to our app where you can easily track your daily mood through fun animated GIFs. Select how you feel and get started on understanding your emotions better!
          </p>

          <IonGrid>
            <IonRow
              style={{
                justifyContent: 'center',
                gap: '2rem',
              }}
            >
              {moods.map((mood, i) => (
                <IonCol
                  key={i}
                  size="auto"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedMood === mood.label ? '#ffd700' : 'rgba(255,255,255,0.15)',
                    borderRadius: '20px',
                    padding: '1rem',
                    boxShadow:
                      selectedMood === mood.label
                        ? '0 6px 18px rgba(255, 217, 0, 0.17)'
                        : '0 3px 10px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    userSelect: 'none',
                    minWidth: '160px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  onClick={() => handleMoodClick(mood.label)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleMoodClick(mood.label);
                    }
                  }}
                >
                  <img
                    src={mood.image}
                    alt={mood.label}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      marginBottom: '1rem',
                      border:
                        selectedMood === mood.label
                          ? '4px solid #fff'
                          : '3px solid rgba(255,255,255,0.7)',
                      objectFit: 'cover',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: selectedMood === mood.label ? '#222' : '#fff',
                      textShadow: selectedMood === mood.label ? 'none' : '1px 1px 4px rgba(0,0,0,0.7)',
                    }}
                  >
                    {mood.label}
                  </span>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>

          {selectedMood && (
            <div
              style={{
                marginTop: '1rem', // mas maliit na margin top para lumapit
                padding: '1.5rem',
                borderRadius: '24px',
                backgroundColor: 'rgba(255, 215, 0, 0.9)',
                boxShadow: '0 6px 20px rgba(255, 215, 0, 0.5)',
                color: '#222',
                fontWeight: '800',
                fontSize: '1.8rem',
                textAlign: 'center',
                width: 'fit-content',
                minWidth: '280px',
                userSelect: 'none',
                transition: 'all 0.3s ease',
                animation: 'fadeIn 0.5s ease forwards',
              }}
            >
              You are feeling <span style={{ textTransform: 'capitalize' }}>{selectedMood}</span> today!
            </div>
          )}
        </div>

        <style>{`
          @keyframes fadeIn {
            from {opacity: 0; transform: translateY(20px);}
            to {opacity: 1; transform: translateY(0);}
          }

          div[role="button"]:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 24px rgba(255, 215, 0, 0.8) !important;
            transition: transform 0.3s ease;
          }

          div[role="button"]:focus {
            outline: none;
            transform: scale(1.05);
            box-shadow: 0 8px 24px rgba(255, 215, 0, 0.9) !important;
          }
        `}</style>
      </IonContent>
    </IonPage>
  );
};

export default Home;
