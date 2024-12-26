import './App.css'
import InfoForm from './components/IntakePage/InfoForm';
import Login from './components/IntakePage/Login';
import SignUpForm from './components/IntakePage/SignUpForm';
import WelcomePage from './components/IntakePage/WelcomePage';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';
import PrivateRoutes from './util/PrivateRoutes';
import InterviewQuestions from './components/IntakePage/InterviewQuestions';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  // const logout = () => {
  // setIsAuthenticated(false);
  // };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes isAuthenticated= {isAuthenticated}/>}>
            <Route path='/info-form' element={<InfoForm/>}/>
            <Route path='/interview' element={<InterviewQuestions/>}/>
          </Route>
          <Route path='/' element={<WelcomePage/>}/>
          <Route path='/login' element={<Login login= {login}/>}/>
          <Route path='/sign-up' element={<SignUpForm/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
