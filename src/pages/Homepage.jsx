/** @format */

import ImgLoop from '../components/ImgLoop'
import Presentation from '../components/Presentation'
import Upcoming from '../components/Upcoming'
import Garanties from '../components/Garanties'
import EventsOfDate from '../components/Calendar'
import AboutAbroad from './AboutAbroad'
import {BrowseEventsButton} from '../components/BrowserEventsButton'
import QRCode from 'react-qr-code'

function Homepage() {
  return (
    <>
      <div className="page">
        <ImgLoop />
        <Presentation />
        <Upcoming />
        {/* <EventsOfDate /> */}
        <BrowseEventsButton />
        <Garanties />
        <AboutAbroad />
      </div>
    </>
  )
}

export default Homepage
