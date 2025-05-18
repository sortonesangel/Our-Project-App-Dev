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
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
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
  const chartRef = useRef<Chart | null>(null);

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
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching mood entries:', error.message);
    else setEntries(data || []);
  };

  const saveMood = async (mood: string, note = '') => {
    const { error } = await supabase.from('mood_entries').insert([
      {
        mood,
        note,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) console.error('Error saving mood:', error.message);
    else fetchEntries();
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

  const renderChart = () => {
    const ctx = document.getElementById('moodChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (chartRef.current) chartRef.current.destroy();

    const currentWeek = getWeekRange();
    const filtered = entries.filter(e => {
      const d = new Date(e.created_at);
      return d >= currentWeek.monday && d <= currentWeek.sunday;
    });

    const moodCounts: Record<string, number> = {};
    moods.forEach(m => (moodCounts[m.label] = 0));
    filtered.forEach(e => moodCounts[e.mood]++);

    const moodLabels = moods.map(m => m.label);
    const moodData = moodLabels.map(label => moodCounts[label]);
    const moodColors = moods.map(m => m.color);

    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: moodLabels,
        datasets: [{
          data: moodData,
          backgroundColor: moodColors,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center' }}>Mood Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonCard className="ion-margin" style={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <IonCardContent>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🧠 Track Your Mood</h2>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Log how you feel and see your emotional patterns!
              </p>
            </div>
    
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {moods.map((mood) => (
                <IonButton
                  key={mood.label}
                  color={selectedMood === mood.label ? 'success' : 'light'}
                  onClick={() => setSelectedMood(mood.label)}
                  style={{
                    margin: '0.5rem',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: selectedMood === mood.label ? '0 0 10px rgba(0, 128, 0, 0.3)' : 'none',
                  }}
                >
                  <img
                    src={mood.icon}
                    alt={mood.label}
                    style={{ height: '32px', marginBottom: '0.5rem' }}
                  />
                  <span style={{ fontSize: '0.85rem', textAlign: 'center' }}>{mood.label}</span>
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

            <IonItem lines="none" style={{ marginBottom: '1rem' }}>
              <IonLabel position="stacked">Optional Note</IonLabel>
              <IonTextarea
                placeholder="Write about your day..."
                value={note}
                onIonChange={e => setNote(e.detail.value!)}
                autoGrow
              />
            </IonItem>

            <IonButton expand="block" color="success" onClick={handleSubmit}>
              Save Mood Entry
            </IonButton>

            <IonButton expand="block" color="medium" onClick={toggleLog}>
              {showLog ? 'Hide Mood History' : 'Show Weekly Mood Log'}
            </IonButton>

            {showLog && (
              <>
                <h3 style={{ marginTop: '2rem', textAlign: 'center' }}>📅 Mood Entries (This Week)</h3>
                {entries.length === 0 ? (
                  <p style={{ textAlign: 'center' }}>No mood entries yet.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                          <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Date</th>
                          <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Mood</th>
                          <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((entry, idx) => (
                          <tr key={idx}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                              {new Date(entry.created_at).toLocaleString()}
                            </td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{entry.mood}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{entry.note || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <h3 style={{ marginTop: '2rem', textAlign: 'center' }}>📊 Weekly Mood Chart</h3>
                <canvas id="moodChart" style={{ maxHeight: '400px', margin: '0 auto', display: 'block' }} />
              </>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MoodTracker;
