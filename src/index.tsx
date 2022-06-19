import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { reducer, StateProvider } from "./state";
import Container from '@mui/material/Container';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StateProvider reducer={reducer}>
     <Auth0Provider
      domain="dev-a4yoc0sx.us.auth0.com"
      clientId="4TvEhCTxjZQKBofpvyNsNwDplc70apF7"
      redirectUri={window.location.origin}
    >
      <Router>
        <Container>
          <App />
        </Container>
      </Router>
    </Auth0Provider>
  </StateProvider>
);
