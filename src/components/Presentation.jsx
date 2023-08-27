/** @format */

// import {Button} from './button'
import {Button} from '../../@/components/ui/button'

import {DoorIcon, MakeFriendsIcon, DiscroverIcon, CoolIcon} from './Icons'

function Presentation() {
  return (
    <>
      <div>
        <p className="title">Are you in a year abroad in MTP ?</p>
        <div className="presentation">
          <div className="body">
            <div>
              <DoorIcon />
              <p>We welcome you ABROAD</p>
            </div>
            <div>
              <MakeFriendsIcon />
              <p>Connect with locals and internationals</p>
            </div>
            <div>
              <DiscroverIcon />
              <p>Discover places, cities, it's adventures time</p>
            </div>
            <div>
              <CoolIcon />
              <p>Take it with ease and enjoy your year</p>
            </div>
          </div>
          {/* <Button variant="outline">Button</Button> */}
        </div>
      </div>
    </>
  )
}

export default Presentation
