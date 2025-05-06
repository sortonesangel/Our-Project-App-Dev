import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Login/Register routes */}
        <Route exact path="/" render={() => <Redirect to="/our-project-app-dev" />} />
        <Route exact path="/our-project-app-dev" component={Login} />
        <Route exact path="/our-project-app-dev/login" component={Login} />
        <Route exact path="/our-project-app-dev/register" component={Register} />

        {/* App layout with Menu */}
        <Route path="/our-project-app-dev/app" component={Menu} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
