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
  import { homeOutline, logOutOutline, rocketOutline } from 'ionicons/icons';
  import { Redirect, Route } from 'react-router';
  import Home from './Home';
  import About from './About';
  import Details from './Details';
  import { useState } from 'react';
  
  const Menu: React.FC = () => {
    const navigation = useIonRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
  
    const path = [
      { name: 'Home', url: '/it35-lab/app/home', icon: homeOutline },
      { name: 'About', url: '/it35-lab/app/about', icon: rocketOutline },
    ];
  
    const handleLogout = () => {
      try {
        // Simulate successful logout (no Supabase here)
        setShowToast(true);
        setTimeout(() => {
          navigation.push('/it35-lab', 'back', 'replace');
        }, 300);
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
                <IonMenuToggle key={index}>
                  <IonItem routerLink={item.url} routerDirection="forward">
                    <IonIcon icon={item.icon} slot="start" />
                    {item.name}
                  </IonItem>
                </IonMenuToggle>
              ))}
  
              {/* Logout Button */}
              <IonButton expand="full" onClick={handleLogout}>
                <IonIcon icon={logOutOutline} slot="start" />
                Logout
              </IonButton>
            </IonContent>
          </IonMenu>
  
          {/* Routing Outlet */}
          <IonRouterOutlet id="main">
            <Route exact path="/it35-lab/app/home" component={Home} />
            <Route exact path="/it35-lab/app/home/details" component={Details} />
            <Route exact path="/it35-lab/app/about" component={About} />
            <Route exact path="/it35-lab/app">
              <Redirect to="/it35-lab/app/home" />
            </Route>
          </IonRouterOutlet>
  
          {/* Alert */}
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Logout Failed"
            message={errorMessage}
            buttons={['OK']}
          />
  
          {/* Toast */}
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
  