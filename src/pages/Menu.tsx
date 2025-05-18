import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { homeOutline, logOutOutline, rocketOutline, happyOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import { useState } from 'react';

import Home from './Home';
import About from './About';
import Details from './Details';
import MoodTracker from './Home-tabs/MoodTracker';

const Menu: React.FC = () => {
  const navigation = useIonRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const path = [
    { name: 'Home', url: '/Our-Project-App-Dev/app/home', icon: homeOutline },
    { name: 'About', url: '/Our-Project-App-Dev/app/about', icon: rocketOutline },
    { name: 'Details', url: '/Our-Project-App-Dev/app/home/details/1', icon: rocketOutline },
    { name: 'Mood Tracker', url: '/Our-Project-App-Dev/app/home/mood', icon: happyOutline },
  ];

  const handleLogout = () => {
    try {
      setShowToast(true);
      setTimeout(() => {
        navigation.push('/Our-Project-App-Dev', 'back', 'replace');
      }, 500);
    } catch (error: any) {
      setErrorMessage('Logout failed due to an unexpected error.');
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        {/* Sidebar Menu */}
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {path.map((item, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem routerLink={item.url} routerDirection="forward">
                  <IonIcon icon={item.icon} slot="start" />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}

            <IonButton expand="full" onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              Logout
            </IonButton>
          </IonContent>
        </IonMenu>

        {/* Main Content Routing */}
        <IonRouterOutlet id="main">
          <Route exact path="/Our-Project-App-Dev/app/home" component={Home} />
          <Route exact path="/Our-Project-App-Dev/app/about" component={About} />
          <Route exact path="/Our-Project-App-Dev/app/home/details/:id" component={Details} />
          <Route exact path="/Our-Project-App-Dev/app/home/mood" component={MoodTracker} />
          <Route exact path="/Our-Project-App-Dev/app">
            <Redirect to="/Our-Project-App-Dev/app/home" />
          </Route>
        </IonRouterOutlet>

        {/* Alerts & Toasts */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Logout Failed"
          message={errorMessage}
          buttons={['OK']}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Logout Successful"
          duration={1500}
          position="top"
          color="primary"
        />
      </IonSplitPane>
    </IonPage>
  );
}; 
export default Menu;
 