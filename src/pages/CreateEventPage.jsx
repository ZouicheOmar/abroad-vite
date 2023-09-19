/** @format */
import {useState} from 'react'
import {supabase} from '../functions/functions'
import {stripeNode} from '../utils/stripe'

import {v4 as uuidv4} from 'uuid'
import {useNavigate} from 'react-router-dom'

import {SaveIcon, ShareIcon, PlusIcon, XIcon} from '../components/Icons'
import LocationOfTheEvent from '../components/create event components/LocationOfTheEvent'
import EventTypeToggleGroup from '../components/EventTypeToggleGroup'
import CreateEventCitySelect from '../components/CreateEventCitySelect'

export const AddButton = ({add}) => {
  return (
    <button
      className=" flex justify-center w-1/2 ml-auto mr-auto py-2 bg-sky-900 rounded hover:bg-sky-800 hover:cursor-pointer "
      onClick={add}
    >
      <PlusIcon />
    </button>
  )
}

const NameYourEvent = () => {
  return (
    <label>
      Give a name to the Event :
      <input
        type="text"
        name="name"
        placeholder="Name of your event"
        required
      />
    </label>
  )
}

const HowMuch = () => {
  return (
    <label>
      This part will be filled by the managers
      <div className="flex">
        <input
          type="number"
          name="price"
          placeholder="99.99, 0..."
          step="0.01"
          min="0"
          max="1000"
          required
        />
        <span className="ml-2 pt-2 text-xl inline align-middle">€</span>
      </div>
    </label>
  )
}

const WhenIsYourEvent = () => {
  return (
    <label>
      When ?
      <input
        type="text"
        name="date"
        placeholder="MM/DD/YYYY"
        onFocus={(e) => {
          e.target.type = 'date'
        }}
        required
      />
    </label>
  )
}

const WhatTimeIsYourEvent = () => {
  return (
    <label>
      At what time ? *
      <input
        type="text"
        name="timestamp"
        placeholder="00:00"
        required
        onFocus={(e) => {
          e.target.type = 'time'
        }}
      />
      <p className="text-sm mt-1 text-slate-300 smallDesc">
        * : Different from the meeting time, it is the time at which the actual
        event start
      </p>
    </label>
  )
}

const ShowMeetingPoint = ({data, data_manage}) => {
  const {meetingPoint, setMeetingPoint} = data

  const init_state = {
    place_name: '',
    address: '',
    zipcode_and_city: '',
    description: '',
  }

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    data_manage(init_state)
    setMeetingPoint(null)
  }

  return (
    <div className="relative w-full border-[1px] p-2 leading-tight border-indigo-950 rounded ">
      <p className="font-bold">Meeting point : </p>
      <p>{meetingPoint.place_name}</p>
      <p>{meetingPoint.address}</p>
      <p>{meetingPoint.zipcode_and_city}</p>
      <p>{meetingPoint.description}</p>

      <button
        className="hover:cursor-pointer absolute top-0 mt-1 right-2  box-border rounded hover:bg-red-700 hover:border-red-900 scale-75 border-[0.5px] border-neutral-800 px-2"
        onClick={handleClick}
      >
        <XIcon />
      </button>
    </div>
  )
}

const WhereDoYouMeet = ({value_data}) => {
  const init_state = {
    place_name: '',
    address: '',
    zipcode_and_city: '',
    description: '',
  }
  const [state, setState] = useState(init_state)
  const {meetingPoint, setMeetingPoint} = value_data

  const addMeetingPoint = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setMeetingPoint({...state})
    console.log('meeting point state : ', state)
    console.log('meeting point : ', meetingPoint)
  }

  return (
    <>
      <label className="flex flex-col gap-1">
        Where do you plan to meet with participants ?
        {!meetingPoint && (
          <>
            <input
              type="text"
              name="meeting_point_place_name"
              placeholder="A certain train station, "
              onChange={(e) => setState({...state, place_name: e.target.value})}
              value={state.place_name}
              className="focus:text-white-500"
              autoComplete="off"
              required
            />
            <input
              type="text"
              name="meeting_point_adress"
              placeholder="11 Rue Pagezy"
              value={state.address}
              autoComplete="off"
              onChange={(e) => setState({...state, address: e.target.value})}
            />
            <input
              type="text"
              name="meeting_point_zipcode_and_city"
              placeholder="34000, Montpellier"
              autoComplete="off"
              value={state.zipcode_and_city}
              onChange={(e) =>
                setState({...state, zipcode_and_city: e.target.value})
              }
            />
            <p>Add further description to the meeting point</p>
            <input
              type="text"
              name="meeting_point_description"
              placeholder="Next to McDonalds, in front of tram station.."
              value={state.description}
              onChange={(e) =>
                setState({...state, description: e.target.value})
              }
            />
            <AddButton add={addMeetingPoint} />
          </>
        )}
        {meetingPoint && (
          <ShowMeetingPoint
            data={{meetingPoint, setMeetingPoint}}
            data_manage={setState}
          />
        )}
      </label>
    </>
  )
}

const AtWhatTimeDoYouMeet = () => {
  return (
    <label>
      At what time do you plan to meet with participants ?
      <input
        type="text"
        name="meeting_time"
        placeholder="00:00"
        required
        onFocus={(e) => {
          e.target.type = 'time'
        }}
      />
    </label>
  )
}

const DescribeYourEvent = () => {
  return (
    <label>
      Describe your event :
      <textarea
        type="text"
        name="description"
        placeholder="we are going to.."
        required
      />
    </label>
  )
}

const GiveAnImageToYourEvent = () => {
  return (
    <label>
      Add an image to illustrate your post :
      <input
        type="file"
        accept="image/png, image/jpeg"
        name="img_file"
        required
      />
    </label>
  )
}

const IncludesItem = ({value_data, index}) => {
  const {includes, item, setIncludes} = value_data
  const handleClick = () => {
    const PREV_STATE = includes
    PREV_STATE.splice(includes.indexOf(item), 1)
    setIncludes([...PREV_STATE])
  }
  return (
    <li className="smallDesc flex justify-between">
      <span>
        {' '}
        {/* {index + 1} -  */}
        {item}
      </span>
      <span
        onClick={handleClick}
        className="hover:cursor-pointer  box-border rounded hover:bg-red-700 hover:border-red-900 scale-75 border-[0.5px] border-neutral-800 px-2 bg-black"
      >
        <XIcon />
      </span>
    </li>
  )
}

const BringsItem = ({value_data, index}) => {
  const {brings, item, setBrings} = value_data
  const handleClick = () => {
    const PREV_STATE = brings
    PREV_STATE.splice(brings.indexOf(item), 1)
    setBrings([...PREV_STATE])
  }
  return (
    <li className="smallDesc flex justify-between">
      <span> {item}</span>
      <span
        onClick={handleClick}
        className="hover:cursor-pointer  box-border rounded hover:bg-red-700 hover:border-red-900 scale-75 border-[0.5px] border-neutral-800 px-2 bg-black"
      >
        <XIcon />
      </span>
    </li>
  )
}

const Includes = ({state}) => {
  const [include, setInclude] = useState()
  const {includes, setIncludes} = state
  const addInclude = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIncludes([...includes, include])
    setInclude('')
  }
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="">
          What's included for all participants ?
          {includes.length > 0 && (
            <div className="border-[1px] border-indigo-950 rounded w-full my-1">
              <ul className="list-disc list-inside leading-tight pl-4 py-2">
                {includes.map((item, index) => {
                  return (
                    // <li className="smallDesc" key={index}>
                    //   {item}
                    // </li>
                    <IncludesItem
                      value_data={{includes, item, setIncludes}}
                      index={index}
                      key={index}
                    />
                  )
                })}
              </ul>
            </div>
          )}
          <input
            type="text"
            name="included"
            value={include}
            onChange={(e) => setInclude(e.target.value)}
            placeholder="what's included ?"
          />
        </label>
        <AddButton add={addInclude} />
      </div>
    </>
  )
}

const Brings = ({state}) => {
  const [bring, setBring] = useState()
  const {brings, setBrings} = state

  const addBring = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setBrings([...brings, bring])
    setBring('')
  }

  return (
    <>
      <div className="w-full mt-2 flex flex-col gap-1 ">
        <label>
          What do the participants need to bring ?
          {brings.length > 0 && (
            <div className="border-[1px] border-indigo-950 rounded w-full my-1">
              <ul className="list-disc list-inside leading-tight pl-4 py-2">
                {brings.map((item, index) => {
                  return (
                    <BringsItem
                      value_data={{brings, item, setBrings}}
                      index={index}
                      key={index}
                    />
                  )
                })}
              </ul>
            </div>
          )}
          <input
            type="text"
            name="bring_with"
            value={bring}
            placeholder="bring with"
            onChange={(e) => setBring(e.target.value)}
          />
        </label>

        <AddButton add={addBring} />
      </div>
    </>
  )
}

const Added = ({data, stepn, setSteps, steps}) => {
  const {action, location, time} = data
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let prev = steps
    prev.splice(stepn - 1, 1)
    setSteps([...prev])
  }
  return (
    <div className="relative w-full border-[1px] p-2 leading-tight border-indigo-950 rounded ">
      <p className="text-md smallDesc "> Step {stepn}</p>
      <div className="ml-4 text-sm leading-tight">
        <p className="smallDesc">
          {action}
          <br />
          location : {location}
          <br />
          at : {time}
        </p>
      </div>
      <button
        onClick={handleClick}
        className="hover:cursor-pointer absolute top-0 mt-1 right-2  box-border rounded hover:bg-red-700 hover:border-red-900 scale-75 border-[0.5px] border-neutral-800 px-2"
      >
        <XIcon />
      </button>
    </div>
  )
}

const Steps = ({state}) => {
  const input =
    'bg-inherit px-2 py-2 border-[1px] border-slate-700 rounded-sm cursor-pointer'

  const initStep = {
    action: '',
    location: '',
    time: '',
  }

  const [step, setStep] = useState(initStep)
  const {steps, setSteps} = state

  const addStep = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setSteps([...steps, step])
    setStep(initStep)
  }
  return (
    <>
      <div className="flex flex-col gap-1 rounded-md ">
        Plan :
        {steps && (
          <div className="flex flex-col gap-1">
            {steps.map((item, index) => {
              return (
                <Added
                  data={item}
                  stepn={index + 1}
                  steps={steps}
                  setSteps={setSteps}
                  key={index}
                />
              )
            })}
          </div>
        )}
        <input
          type="text"
          name="step_action"
          placeholder="action"
          value={step.action}
          onChange={(e) => {
            setStep({...step, action: e.target.value})
          }}
          className={input}
        />
        <input
          type="text"
          name="step_location"
          placeholder="location"
          value={step.location}
          onChange={(e) => {
            setStep({...step, location: e.target.value})
          }}
          className={input}
        />
        <input
          type="time"
          name="step_time"
          className={input}
          onChange={(e) => {
            setStep({...step, time: e.target.value})
          }}
          value={step.time}
        />
        <AddButton add={addStep} />
      </div>
    </>
  )
}

const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="text-xl w-1/2 max-w-fit ml-auto mr-auto rounded border-2 border-indigo-700 px-2 py-1 hover:text-yellow-400 hover:cursor-pointer"
    >
      Submit event
    </button>
  )
}

const EventPosted = () => {
  const navigate = useNavigate()

  return (
    <div className="page">
      <p className="title">Congrats ! Event posted !</p>
      <span
        onClick={() => {
          navigate('/')
        }}
        className="text-white text-2xl border-2 cursor-pointer border-white rounded-md p-4"
      >
        {' '}
        back to home page
      </span>
      <span
        onClick={() => {
          navigate(window.location.pathname)
        }}
        className="text-white text-xl border-2 m-2 cursor-pointer border-white rounded-md p-4"
      >
        {' '}
        Add another event (for test purpose)
      </span>
    </div>
  )
}

const LoadingPage = () => {
  return (
    <div className="page">
      <p>Loading ...</p>
      <p>.........</p>
      <p>.........</p>
      <p>.........</p>
      <p>.........</p>
      <p>.........</p>
      <p>.........</p>
      <p>.........</p>
      <p>.........</p>
      <p>.........</p>
      <p>.........</p>
    </div>
  )
}

function CreateEventPage() {
  const [meetingPoint, setMeetingPoint] = useState()
  const [eventAddress, setEventAddress] = useState()
  const [steps, setSteps] = useState([])
  const [includes, setIncludes] = useState([])
  const [brings, setBrings] = useState([])
  const [type, setType] = useState('night out')
  const [eventSent, setEventSent] = useState(false)
  const [form, setForm] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)
    setForm(false)
    setLoading(true)
    const form = e.target
    const data = new FormData(form)
    const datajson = Object.fromEntries(data.entries())
    const {
      city,
      date,
      description,
      name,
      timestamp,
      img_file,
      meeting_time,
      price,
    } = datajson

    const uuid = uuidv4()
    const price_decimal = price * 100

    const send = await supabase.from('events').insert({
      id: uuid,
      name: name,
      city: city,
      date: date,
      type: type,
      time: timestamp,
      description: description,
      steps: steps,
      included: [includes],
      bring_with: [brings],
      img_url: `events/${uuid}.jpg`,
      location: eventAddress,
      meeting_point: meetingPoint,
      meeting_time: meeting_time,
      price: price,
    })

    const img = await supabase.storage
      .from('media')
      .upload(`events/${uuid}.jpg`, img_file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (send.error) {
      console.log(
        'there has been an error on submitting the event : ',
        send.error.message,
        send.error
      )
      return
    }
    if (img.error) {
      console.log(
        'there has been an error on submitting the event : ',
        img.error.message
      )
      return
    }

    const CREATE_EVENT_ON_STRIPE = await stripeNode.products.create({
      id: uuid,
      name: name,
      default_price_data: {
        currency: 'eur',
        unit_amount_decimal: price_decimal,
      },
    })

    console.log('send data : ', send)
    console.log(CREATE_EVENT_ON_STRIPE)
    setLoading(false)
    setEventSent(true)
  }

  const handleShowData = async (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)
    const form = e.target
    const data = new FormData(form)
    const datajson = Object.fromEntries(data.entries())
    const {
      // bring_with,
      city,
      // created_by,
      date,
      description,
      // included,
      name,
      // tags,
      timestamp,
      img_file,
      meeting_point,
      meeting_time,
      location,
      price,

      // type,
    } = datajson

    console.log({
      ...datajson,
      type,
      brings,
      includes,
      steps,
      location,
    })
  }

  return (
    <>
      {form && (
        <div className="page md:w-fit text-white">
          <p className="title">Create an Event</p>
          <div className="create-event-block">
            <form onSubmit={handleSubmit}>
              {/* <form onSubmit={handleShowData}> */}
              <CreateEventCitySelect />
              <NameYourEvent />
              <LocationOfTheEvent
                value_data={{eventAddress, setEventAddress}}
              />
              <WhenIsYourEvent />
              <WhatTimeIsYourEvent />
              <WhereDoYouMeet value_data={{meetingPoint, setMeetingPoint}} />
              <AtWhatTimeDoYouMeet />
              <EventTypeToggleGroup type_data={{type, setType}} />
              <DescribeYourEvent />
              <Steps state={{steps, setSteps}} />
              <Brings state={{brings, setBrings}} />
              <Includes state={{includes, setIncludes}} />
              <GiveAnImageToYourEvent />
              <HowMuch />
              <SubmitButton />
            </form>
          </div>
        </div>
      )}

      {eventSent && <EventPosted />}
      {loading && <LoadingPage />}
    </>
  )
}

export default CreateEventPage
