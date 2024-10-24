/** @format */
import { resolveTripleslashReference } from 'typescript'
import { Button } from '../../@/components/ui/button'
import ParisStamp from '../assets/svg/ParisStamp.svg'
import { DoorIcon, MakeFriendsIcon, DiscroverIcon, CoolIcon } from './Icons'

const PresentationText = () => {
  return (
    <div className="md:w-[40rem] bg-[#161628] w-full h-fit p-2 rounded">
      <p className=" text-2xl inclusive">
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
    <div className="mx-auto sm:mx-0 relative p-2 h-fit w-fit bg-white rounded-xl rotate-[3deg]">
      <img
        src="./img.jpg"
        className="object-cover md:w-[25rem] h-fit w-[21rem] h-[21rem] rounded-[6px]"
      />
      <p className="absolute text-xl font-bold inclusive text-white rotate-[-3deg] border-2 border-white outline outline-indigo-500 outline-2  bg-green-900 px-2 w-fit rounded top-0 right-0">
        Night outs
      </p>
    </div>
  )
}

const SquareTwo = () => {
  return (
    <div className="relative p-2 h-fit w-fit bg-white rounded-xl rotate-[-3deg] sm:translate-x-1/3 -translate-y-full md:translate-x-[70%] sm:-translate-y-[170%]">
      <img
        src="./img2.jpg"
        className="object-cover md:w-[25rem] md:h-fit w-[18rem] h-[15rem] rounded-[6px]"
      />
      <p className="absolute text-xl inclusive font-bold text-white rotate-[-3deg] border-2 border-white  bg-red-500 px-2 w-fit rounded top-0 right-[-0.3rem]">
        Parties and festivals
      </p>
    </div>
  )
}

const SquareThree = () => {
  return (
    <div className="mx-auto relative p-2 h-fit w-fit bg-white rounded-xl rotate-[1deg] -translate-y-[120%]  sm:-translate-y-[220%] ">
      <img
        src="./carnon.jpg"
        className="object-cover w-full md:w-[25rem] w-[40rem] h-[15rem] rounded-[6px]"
      />
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
      className="rotate-[-3deg] h-[10rem] -translate-y-[180%] sm:-translate-y-3/4"
    />
  )
}

function Presentation() {
  return (
    <>
      <div className="w-fit h-fit mx-auto">
        <PresentationText />
        <div className="h-[55rem] sm:h-[38rem] md:h-[48rem]">
          <SquareOne />
          <Stamp />
          <SquareTwo />
          <SquareThree />
        </div>
      </div>
    </>
  )
}

export default Presentation
