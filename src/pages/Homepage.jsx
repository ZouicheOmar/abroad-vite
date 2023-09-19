/** @format */

import ImgLoop from '../components/ImgLoop'
import Presentation from '../components/Presentation'
import Upcoming from '../components/Upcoming'
import Garanties from '../components/Garanties'
import EventsOfDate from '../components/Calendar'
import {BrowseEventsButton} from '../components/BrowserEventsButton'
import QRCode from 'react-qr-code'

const QRCodeTest = () => {
  return (
    <div className="h-auto w-full bg-white">
      <QRCode
        size={256}
        className=" bg-red-300 w-[7rem] h-[7rem] ml-auto mr-auto mt-2 mb-2 "
        // value="https://www.npmjs.com/package/react-qr-code"
        value="success"
        viewBox={`0 0 256 256`}
      />
    </div>
  )
}

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
