import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home'
import Profile from './pages/Profile';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./util/translations/english.json";
import translationDE from "./util/translations/german.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: translationEN,
      },
      de: {
        translation: translationDE,
      },
    },
    lng: navigator.language === "de-DE" ? "de" : "de", // if you're using a language detector, do not define the lng option
    fallbackLng: "de",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/' element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
