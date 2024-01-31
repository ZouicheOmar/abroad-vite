/** @format */

// import {Button} from './button'
import {resolveTripleslashReference} from 'typescript'
import {Button} from '../../@/components/ui/button'

import ParisStamp from '../assets/svg/ParisStamp.svg'

import {DoorIcon, MakeFriendsIcon, DiscroverIcon, CoolIcon} from './Icons'

function PresentationOG() {
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

const PresentationText = () => {
  return (
    <div className="absolute md:w-[24rem] lg:left-[10rem] bg-[#161628] lg:w-[32rem] w-full lg:h-[11rem] h-fit p-2 rounded">
      <p className="lg:text-3xl text-2xl inclusive">
        On a year{' '}
        <span className="text-white text-3xl font-normal abroad-logo">
          ABORAD {'  '}
        </span>
        in France ? Join us to experience and discover cities, places, throught
        our events and adventures
      </p>
    </div>
  )
}

const SquareOne = () => {
  return (
    <div className="absolute top-[11rem] md:top-0 md:left-[24rem] rotate-[3deg] rounded">
      <div className="relative w-fit h-full p-2 bg-white">
        <img
          src="./img.jpg"
          className="object-cover md:w-[15rem] md:h-[15rem] w-[21rem] h-[21rem]"
        />
        <p className="absolute text-xl font-bold inclusive text-white rotate-[-3deg] border-2 border-white  bg-green-900 px-2 w-fit rounded top-0 left-[-0.3rem]">
          Night outs
        </p>
      </div>
    </div>
  )
}

const SquareTwo = () => {
  return (
    <div className="absolute z- top-[29rem] left-[3rem] md:top-[10rem] md:left-[15rem] rotate-[-5deg] rounded">
      <div className="relative w-full h-full p-2 bg-white">
        <img
          src="./img2.jpg"
          className="object-cover md:w-[15rem] md:h-[15rem] w-[18rem] h-[15rem]"
        />
        <p className="absolute text-xl inclusive font-bold text-white rotate-[-3deg] border-2 border-white  bg-red-500 px-2 w-fit rounded top-0 right-[-0.3rem]">
          Parties and festivals
        </p>
      </div>
    </div>
  )
}

const SquareThree = () => {
  return (
    <div className="absolute top-[43rem] md:top-[25rem] md:left-[13rem] rotate-[2deg] rounded">
      <div className="relative w-full h-full p-2 bg-white">
        {/* <div className="absolute flex justify-center font-bold text-white top-[0.5rem] w-full ">
            <p className=" smallDesc text-3xl  bg-yellow-500 px-2  ">
              Montpellier Plage
            </p>
          </div> */}
        <img
          src="./carnon.jpg"
          className="object-cover md:w-[25rem] md:h-[15rem] w-[40rem] h-[15rem]"
        />
      </div>
      <p className="absolute text-2xl text-white font-bold inclusive rotate-[-3deg] border-2 border-white  bg-blue-700 px-2 w-fit rounded bottom-0 left-[-0.3rem]">
        South of France's best spots
      </p>
    </div>
  )
}

const Stamp = () => {
  return (
    <img
      src={ParisStamp}
      className="absolute top-[25rem] md:top-[13rem] md:left-[29rem] md:rotate-[3deg] rotate-[-3deg] h-[10rem]"
    />
  )
}

function Presentation() {
  return (
    <>
      <div className="min-w-full p-2 h-[60rem]">
        <div className="relative w-full bg-slate-70">
          <PresentationText />
          <SquareOne />
          <SquareTwo />
          <SquareThree />
          <Stamp />
        </div>
      </div>
    </>
  )
}

export default Presentation
