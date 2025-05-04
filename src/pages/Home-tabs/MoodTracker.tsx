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
  IonSelect,
  IonSelectOption,
  IonList,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const moods = ['😊 Happy', '😢 Sad', '😠 Angry', '😐 Neutral', '😰 Anxious'];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<any[]>([]);
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mood_entries');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('mood_entries', JSON.stringify(entries));
    renderChart();
  }, [entries]);

  const saveMood = (mood: string, note = '') => {
    const newEntry = {
      mood,
      note,
      time: new Date().toISOString(),
    };
    setEntries([...entries, newEntry]);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      saveMood(selectedMood, note);
      setNote('');
      setSelectedMood('');
    }
  };

  const toggleLog = () => setShowLog(!showLog);

  const renderChart = () => {
    const ctx = document.getElementById('moodChart') as HTMLCanvasElement;
    if (!ctx) return;

    const currentWeek = getWeekRange();
    const filtered = entries.filter(e => {
      const d = new Date(e.time);
      return d >= currentWeek.monday && d <= currentWeek.sunday;
    });

    const dataPerDay: any = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    days.forEach(day => {
      dataPerDay[day] = moods.reduce((acc, m) => ({ ...acc, [m]: 0 }), {});
    });

    filtered.forEach(e => {
      const day = new Date(e.time).toLocaleDateString('en-US', { weekday: 'long' });
      dataPerDay[day][e.mood]++;
    });

    const datasets = moods.map((mood, idx) => ({
      label: mood,
      data: days.map(day => dataPerDay[day][mood]),
      backgroundColor: ['#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6'][idx],
    }));

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets,
      },
      options: {
        responsive: true,
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
        <IonToolbar>
          <IonTitle>Mood Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonList>
          {moods.map(mood => (
            <IonButton key={mood} expand="block" onClick={() => saveMood(mood)}>
              {mood}
            </IonButton>
          ))}
        </IonList>

        <IonItem>
          <IonLabel>Optional Mood with Note</IonLabel>
        </IonItem>
        <IonItem>
          <IonSelect
            placeholder="Select Mood"
            value={selectedMood}
            onIonChange={(e) => setSelectedMood(e.detail.value)}
          >
            {moods.map(mood => (
              <IonSelectOption key={mood} value={mood}>{mood}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonTextarea
            value={note}
            placeholder="Write how you feel..."
            onIonChange={(e) => setNote(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="full" onClick={handleSubmit} style={{ marginTop: 10 }}>
          Save Mood with Note
        </IonButton>

        <IonButton expand="full" color="tertiary" onClick={toggleLog}>
          📂 {showLog ? 'Hide' : 'Show'} Mood Log
        </IonButton>

        {showLog && (
          <div style={{ marginTop: 20 }}>
            <h3>Your Weekly Mood Log</h3>
            {entries.length === 0 ? (
              <p>No entries yet.</p>
            ) : (
              <ul>
                {entries.map((entry, idx) => (
                  <li key={idx}>
                    <strong>{entry.mood}</strong> - {new Date(entry.time).toLocaleString()}
                    {entry.note && <div>📝 {entry.note}</div>}
                  </li>
                ))}
              </ul>
            )}
            <canvas id="moodChart" />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MoodTracker;
