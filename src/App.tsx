import "./App.css";
import InfoForm from "./components/IntakePage/InfoForm";
import Login from "./components/IntakePage/Login";
import SignUpForm from "./components/IntakePage/SignUpForm";
import WelcomePage from "./components/IntakePage/WelcomePage";
import { BrowserRouter, Route, Routes } from "react-router";
import InterviewQuestions from "./components/IntakePage/InterviewQuestions";
import AuthProtectedRoute from "./util/AuthProtectedRoute.tsx";
import Provider from "./util/Provider.tsx";
import VideoPage from "./components/VideoPage/VideoPage.tsx";
import HomePage from "./components/HomePage/HomePage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Provider />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/video" element={<VideoPage />} />

            <Route element={<AuthProtectedRoute />}>
              <Route path="/info-form" element={<InfoForm />} />
              <Route path="/interview" element={<InterviewQuestions />} />
              <Route path="/home" element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
