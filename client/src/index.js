import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import Cv from './components/Cv';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';
import { getToken } from './Utils/Common';

import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
    useLocation
} from 'react-router-dom';

function IsAuth({ children }) {
    let auth = getToken();
    let location = useLocation();

    if (auth) {
      return <Navigate to="/cv" state={{ from: location }} />;
    }
  
    return children;
  }

  function RequireAuth({ children }) {
    let auth = getToken();
    let location = useLocation();

    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
  }

const Root = () => (
    <Router>
        <Routes>
            <Route exact path='/' element={<App />} />
            <Route path='/register' element={
                <IsAuth>
                    <Register />
                </IsAuth>}/>
            <Route path='/login' element={
                <IsAuth>
                    <Login />
                </IsAuth>}/>
            <Route path='/cv' element={
                <RequireAuth>
                    <Cv />
                </RequireAuth>}/>
            <Route path='/contact' element={
                <RequireAuth>
                    <Contact />
                </RequireAuth>} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
