/** @format */

import ImgLoop from '../components/ImgLoop'
import Presentation from '../components/Presentation'
import Upcoming from '../components/Upcoming'
import Garanties from '../components/Garanties'
import EventsOfDate from '../components/Calendar'
import {BrowseEventsButton} from '../components/BrowserEventsButton'

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
      </div>
    </>
  )
}

export default Homepage
