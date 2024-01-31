/** @format */
import {NorthEastArrowIcon} from '../components/Icons'
import {useNavigate} from 'react-router-dom'

const AboutAbroad = () => {
  const navigate = useNavigate()
  return (
    <div>
      <p className="text-2xl font-bold">More about ABROAD</p>
      <p className="">
        Abroad is a student association here to help create a network and
        discover all the surroundings around and beyond your city
      </p>
      <span
        className="flex gap-1 items-center hover:text-white cursor-pointer"
        onClick={() => navigate('/about')}
      >
        Learn More
        <NorthEastArrowIcon className="h-[1.3rem] w-[1.3rem]  " />
      </span>
    </div>
  )
}

export default AboutAbroad
