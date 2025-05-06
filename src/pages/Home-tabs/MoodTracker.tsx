import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonTextarea,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { happy, sad, alertCircle, removeCircle, helpCircle } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { supabase } from '../../utils/supabaseClient'; // 🔗 Adjust path if needed

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

  useEffect(() => {
    if (showLog && entries.length > 0) {
      renderChart();
    }
  }, [entries, showLog]);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .order('created_at', { ascending: false }); // Changed 'time' to 'created_at'

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
        created_at: new Date().toISOString(), // Changed 'time' to 'created_at'
      },
    ]);

    if (error) {
      console.error('Error saving mood:', error.message);
    } else {
      fetchEntries(); // Refresh data after save
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

  const renderChart = () => {
    const ctx = document.getElementById('moodChart') as HTMLCanvasElement;
    if (!ctx) return;

    const currentWeek = getWeekRange();
    const filtered = entries.filter(e => {
      const d = new Date(e.created_at); // Changed 'time' to 'created_at'
      return d >= currentWeek.monday && d <= currentWeek.sunday;
    });

    const dataPerDay: any = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.forEach(day => {
      dataPerDay[day] = moods.reduce((acc, m) => ({ ...acc, [m.label]: 0 }), {});
    });

    filtered.forEach(e => {
      const day = new Date(e.created_at).toLocaleDateString('en-US', { weekday: 'long' }); // Changed 'time' to 'created_at'
      if (dataPerDay[day]) dataPerDay[day][e.mood]++;
    });

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: moods.map(mood => ({
          label: mood.label,
          data: days.map(day => dataPerDay[day][mood.label]),
          backgroundColor: mood.color,
        })),
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
          },
        },
      },
    });
  };

  const getWeekRange = () => {
    const now = new Date();
    const monday = new Date(now);
    const sunday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return { monday, sunday };
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mood Tracker - AppDev & Emerging Tech</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard className="ion-margin">
          <IonCardContent>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>🧠 Track Your Mood</h2>
            <p style={{ textAlign: 'center', color: '#666' }}>
              Log your emotional state and see weekly summaries!
            </p>

            {/* Replace IonSelect with Mood Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              {moods.map((mood) => (
                <IonButton
                  key={mood.label}
                  color={selectedMood === mood.label ? 'success' : 'light'}
                  onClick={() => setSelectedMood(mood.label)}
                  style={{
                    margin: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={mood.icon}
                    alt={mood.label}
                    style={{ height: '40px', marginBottom: '0.5rem' }}
                  />
                  <span>{mood.label}</span>
                </IonButton>
              ))}
            </div>

            {selectedMood && (
              <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                <img
                  src={animatedMoodGIFs[selectedMood]}
                  alt={selectedMood}
                  style={{ height: '100px', borderRadius: '1rem' }}
                />
                <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{selectedMood}</p>
              </div>
            )}

            <IonItem lines="none">
              <IonLabel position="stacked">Optional Note</IonLabel>
              <IonTextarea
                placeholder="Write about your day or feelings..."
                value={note}
                onIonChange={e => setNote(e.detail.value!)}
              />
            </IonItem>

            <IonButton expand="block" onClick={handleSubmit} color="success">
              Save Mood Entry
            </IonButton>

            <IonButton expand="block" color="medium" onClick={toggleLog}>
              {showLog ? 'Hide Mood History' : 'Show Weekly Mood Log'}
            </IonButton>

            {showLog && (
              <>
                <h3 style={{ marginTop: '1rem' }}>📅 Mood Timeline</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {entries.length === 0 ? (
                    <p>No mood entries yet.</p>
                  ) : (
                    entries.map((entry, idx) => {
                      const moodData = moods.find(m => m.label === entry.mood);
                      return (
                        <li
                          key={idx}
                          style={{
                            marginBottom: '1rem',
                            borderLeft: `4px solid ${moodData?.color}`,
                            paddingLeft: '1rem',
                          }}
                        >
                          <strong>{entry.mood}</strong> on{' '}
                          {new Date(entry.created_at).toLocaleString()} {/* Changed 'time' to 'created_at' */}
                          {entry.note && (
                            <div style={{ fontStyle: 'italic', marginTop: '0.25rem' }}>
                              Note: {entry.note}
                            </div>
                          )}
                        </li>
                      );
                    })
                  )}
                </ul>
                <canvas id="moodChart" style={{ maxHeight: '400px', marginTop: '2rem' }} />
              </>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MoodTracker;
