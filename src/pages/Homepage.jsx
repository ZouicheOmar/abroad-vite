/** @format */

import ImgLoop from '../components/ImgLoop'
import Presentation from '../components/Presentation'
import Upcoming from '../components/Upcoming'
import Garanties from '../components/Garanties'
import EventsOfDate from '../components/Calendar'
import AboutAbroad from './AboutAbroad'
import { BrowseEventsButton } from '../components/BrowserEventsButton'
import QRCode from 'react-qr-code'

function Homepage() {
  return (
    <>
      <div className="page">
        <ImgLoop />
        <div className='w-full'>
          <p id='message'>
            This website was created for the <a href="https://www.instagram.com/erasmus_montpellier/"> Erasmus & Internationals Network </a>, though the project was eventually discontinued.
            <br />
            I'm keeping it here as it was my first web development project.
            <br />
            Please note that all backend features (Supabase) are inactive.
          </p>
        </div>
        <Presentation />
        <Upcoming />
        <BrowseEventsButton />
        <Garanties />
        <AboutAbroad />
      </div>
    </>
  )
}

export default Homepage
