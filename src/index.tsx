import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { reducer, StateProvider } from "./state";
import Container from '@mui/material/Container';
import { Box } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StateProvider reducer={reducer}>
      <Router>
        <Box component="main">
          <App />
        </Box>
      </Router>
  </StateProvider>
);
