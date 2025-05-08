import { 
    IonBackButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  
  const Details: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot='start'>
                <IonBackButton defaultHref='/our-project-app-dev/app/home'></IonBackButton>
            </IonButtons>
            <IonTitle> Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
        </IonContent>
      </IonPage>
    ); 
  };
  
  export default Details;