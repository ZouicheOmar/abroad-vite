/** @format */
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import ProfilePage from './pages/ProfilePage'
import EventsPage from './pages/EventsPage'
import EventPage from './pages/EventPage'
import CreateEventPage from './pages/CreateEventPage'
import AuthPage from './pages/AuthPage'
import PaywallPage from './pages/PaywallPage'
import Footer from './components/Footer'
import ConfirmEmailPage from './pages/ConfirmEmail'
// import {EventsContextProvider} from './functions/store'
import {EventsContextProvider} from './context/eventStore'
import {UserContextProvider} from './context/userStore'

function App() {
  return (
    <>
      <EventsContextProvider>
        <UserContextProvider>
          <div className="container">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/profilepage" element={<ProfilePage />} />
              <Route exact path="/events">
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:identifier" element={<EventPage />} />
              </Route>
              <Route exact path="/createevent" element={<CreateEventPage />} />
              <Route exact path="/logpage">
                <Route exact path="/logpage" element={<AuthPage />} />
                <Route
                  exact
                  path="/logpage/confirm_email_page"
                  element={<ConfirmEmailPage />}
                />
                <Route
                  exact
                  path="/logpage/:identifier"
                  element={<ProfilePage />}
                />
              </Route>
              <Route exact path="/paywallTest" element={<PaywallPage />} />
            </Routes>

            <Footer />
          </div>
        </UserContextProvider>
      </EventsContextProvider>
    </>
  )
}

export default App
