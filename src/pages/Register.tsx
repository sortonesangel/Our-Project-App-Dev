import { 
    IonButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar, 
      useIonRouter
  } from '@ionic/react';
  
  const Register: React.FC = () => {
    const navigation = useIonRouter();

    const doLogin = () => {
        navigation.push('/our-project-app-dev/app','forward','replace');
    }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
            <IonButton onClick={() => doLogin()} expand="full">
                Register
            </IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Register;