import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonTextarea,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { happy, sad, alertCircle, removeCircle, helpCircle } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

const moods = [
  { label: '😊 Happy', icon: happy, color: '#f1c40f' },
  { label: '😢 Sad', icon: sad, color: '#3498db' },
  { label: '😠 Angry', icon: alertCircle, color: '#e74c3c' },
  { label: '😐 Neutral', icon: removeCircle, color: '#8e44ad' },
  { label: '😰 Anxious', icon: helpCircle, color: '#f39c12' },
];

const animatedMoodGIFs: Record<string, string> = {
  '😊 Happy': 'https://i.pinimg.com/originals/3b/88/06/3b88061f541255f8dc17d358befd7e80.gif',
  '😢 Sad': 'https://media.tenor.com/cXI2cy9yEYoAAAAM/crying-sad.gif',
  '😠 Angry': 'https://media.tenor.com/maT9ZhBqf2gAAAAM/argh-angry.gif',
  '😐 Neutral': 'https://media.tenor.com/zqh7JkYNKggAAAAM/bored-ennui.gif',
  '😰 Anxious': 'https://media.tenor.com/y66OKxpG16oAAAAM/anxiety-inside-out.gif',
};

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<any[]>([]);
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching mood entries:', error.message);
    } else {
      setEntries(data || []);
    }
  };

  const saveMood = async (mood: string, note = '') => {
    const { error } = await supabase.from('mood_entries').insert([
      {
        mood,
        note,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error saving mood:', error.message);
    } else {
      fetchEntries();
    }
  };

  const handleSubmit = () => {
    if (selectedMood) {
      saveMood(selectedMood, note);
      setNote('');
      setSelectedMood('');
      setShowLog(true);
    }
  };

  const toggleLog = () => setShowLog(!showLog);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mood Tracker - AppDev & Emerging Tech</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding" style={{ maxWidth: 480, margin: 'auto' }}>
        {/* Selected Mood Display */}
        {selectedMood && (
          <div
            style={{
              textAlign: 'center',
              marginBottom: '1rem',
              padding: '1rem',
              background: '#f9f9f9',
              borderRadius: '12px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={animatedMoodGIFs[selectedMood]}
              alt={selectedMood}
              style={{ height: '120px', borderRadius: '12px', marginBottom: '0.5rem' }}
            />
            <h2 style={{ margin: 0 }}>{selectedMood}</h2>
          </div>
        )}

        {/* Mood Selector Horizontal Scroll */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            paddingBottom: '1rem',
            gap: '1rem',
            marginBottom: '1rem',
            scrollSnapType: 'x mandatory',
          }}
        >
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              style={{
                minWidth: 100,
                minHeight: 100,
                borderRadius: '15px',
                border: selectedMood === mood.label ? `3px solid ${mood.color}` : '2px solid #ccc',
                background: selectedMood === mood.label ? mood.color + '33' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.3s ease',
                scrollSnapAlign: 'start',
              }}
              aria-label={mood.label}
              title={mood.label}
            >
              <span style={{ fontSize: '3rem', marginBottom: '0.3rem' }}>{mood.label.split(' ')[0]}</span>
              <span style={{ fontWeight: '600' }}>{mood.label.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>

        {/* Note Input */}
        <IonItem lines="full" style={{ borderRadius: '12px', marginBottom: '1rem' }}>
          <IonLabel position="stacked">Optional Note</IonLabel>
          <IonTextarea
            placeholder="Write about your day or feelings..."
            value={note}
            onIonChange={(e) => setNote(e.detail.value!)}
            rows={4}
            style={{ borderRadius: '8px', padding: '8px' }}
          />
        </IonItem>

        {/* Save & Toggle History Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <IonButton expand="block" color="success" onClick={handleSubmit} disabled={!selectedMood} style={{ flex: 1 }}>
            Save Mood Entry
          </IonButton>

          <IonButton expand="block" color="medium" onClick={toggleLog} style={{ flex: 1 }}>
            {showLog ? 'Hide History' : 'Show History'}
          </IonButton>
        </div>

        {/* Mood History & Percentages */}
        {showLog && (
          <IonCard>
            <IonCardContent>
              <h3>📅 Mood History</h3>
              {entries.length === 0 ? (
                <p>No mood entries yet.</p>
              ) : (
                <ul
                  style={{
                    listStyle: 'none',
                    paddingLeft: 0,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    marginBottom: '1rem',
                  }}
                >
                  {entries.map((entry, idx) => {
                    const moodData = moods.find((m) => m.label === entry.mood);
                    return (
                      <li
                        key={idx}
                        style={{
                          marginBottom: '0.75rem',
                          borderLeft: `5px solid ${moodData?.color}`,
                          paddingLeft: '0.75rem',
                          wordBreak: 'break-word',
                        }}
                      >
                        <strong>{entry.mood}</strong> on {new Date(entry.created_at).toLocaleString()}
                        {entry.note && (
                          <p style={{ fontStyle: 'italic', marginTop: '0.25rem' }}>Note: {entry.note}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Mood Percentages */}
              {entries.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <h3>📊 Mood Summary</h3>
                  {(() => {
                    const total = entries.length;
                    const moodCounts: Record<string, number> = {};
                    entries.forEach((entry) => {
                      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
                    });

                    // Get dominant mood
                    const dominantMood = Object.entries(moodCounts).reduce((a, b) =>
                      a[1] > b[1] ? a : b
                    )[0];

                    return (
                      <>
                        {Object.entries(moodCounts).map(([mood, count]) => {
                          const percent = ((count / total) * 100).toFixed(1);
                          const moodData = moods.find((m) => m.label === mood);
                          return (
                            <div key={mood} style={{ marginBottom: '0.5rem' }}>
                              <div style={{ fontWeight: 600 }}>
                                {mood}: {percent}%
                              </div>
                              <div
                                style={{
                                  height: '12px',
                                  width: '100%',
                                  background: '#eee',
                                  borderRadius: '6px',
                                  overflow: 'hidden',
                                }}
                              >
                                <div
                                  style={{
                                    width: `${percent}%`,
                                    background: moodData?.color || '#666',
                                    height: '100%',
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}

                        {/* Fun dominant mood feedback */}
                        <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                          You mostly feel <strong>{dominantMood}</strong> in this subject. Keep it up! 🎉
                        </p>
                      </>
                    );
                  })()}
                </div>
              )}
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MoodTracker;
