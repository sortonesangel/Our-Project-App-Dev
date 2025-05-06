import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Welcome to Our Project App!</h2>
        <p>This is the home page. Use the menu to explore the About page, Details, or Mood Tracker.</p>
      </IonContent>
    </IonPage>
  );
};


export default Home;
