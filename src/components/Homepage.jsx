/** @format */

import ImgLoop from './ImgLoop'
import Presentation from './Presentation'
import Upcoming from './Upcoming'
import Garanties from './Garanties'
import CalendarAndEvent from './Calendar'

function Homepage() {
  return (
    <>
      <div className="homepage">
        <ImgLoop />
        <Presentation />
        <Upcoming />
        <CalendarAndEvent />
        <Garanties />
      </div>
    </>
  )
}

export default Homepage
