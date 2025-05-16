import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import TankDetails from './components/TankDetails';
import Country from './components/Country';
import Types from './components/Types';
import TankComparator from './components/TankComparator';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Router> 
      <Routes> 
        <Route path = "/" element={<App />} />
        <Route path = "/tank/:id" element={<TankDetails />} />
        <Route path = "/country/:country" element={<Country/>} />
        <Route path = "/type/:tanktype" element={<Types/>} />
        <Route path = "/compare" element={<TankComparator/>} />
      </Routes>
    </Router>
  </StrictMode>
);
