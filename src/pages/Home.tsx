import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { happyOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';

import MoodTracker from './Home-tabs/MoodTracker';

const Home: React.FC = () => {

  return (
    <IonReactRouter>
      <IonTabs>

        {/* Bottom Tab Bar */}
        <IonTabBar slot="bottom">
          <IonTabButton tab="mood" href="/our-project-app-dev/app/home/mood">
            <IonIcon icon={happyOutline} />
            <IonLabel>Mood Tracker</IonLabel>
          </IonTabButton>
        </IonTabBar>

        {/* Routing Outlet for Tabs */}
        <IonRouterOutlet>
          <Route exact path="/our-project-app-dev/app/home/mood" component={MoodTracker} />
          <Route exact path="/our-project-app-dev/app/home">
            <Redirect to="/our-project-app-dev/app/home/mood" />
          </Route>
        </IonRouterOutlet>

      </IonTabs>
    </IonReactRouter>
  );
};

export default Home;
