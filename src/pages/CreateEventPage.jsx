/** @format */
import {useState} from 'react'
import {createClient} from '@supabase/supabase-js'
import {supabase} from '../functions/functions'

import {v4 as uuidv4} from 'uuid'
import {useNavigate} from 'react-router-dom'

import {SaveIcon, ShareIcon, PlusIcon, XIcon} from '../components/Icons'
import EventTypeToggleGroup from '../components/EventTypeToggleGroup'
import CreateEventCitySelect from '../components/CreateEventCitySelect'

// const supabaseUrl = 'https://bfybtqxgnnnzbcxynyvt.supabase.co'
// const supabaseKey =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmeWJ0cXhnbm5uemJjeHlueXZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDc2MjQzMiwiZXhwIjoyMDAwMzM4NDMyfQ.K5gyt8afxXaeKlbyZ8DpgWJ7IvPQDbE-TLrrTSKgMLE' //! service key, not anon key
// const supabase = createClient(supabaseUrl, supabaseKey)

const uploadImg = async (img) => {
  const avatarFile = img
  const {error} = await supabase.storage
    .from('images')
    .upload('images_folder/event2img.png', avatarFile)
  error && console.log(error)
}
const sendEventData = async (datajson) => {
  const {name, date, created_by, city} = datajson
  const {error} = await supabase.from('events').insert({
    name: name,
    date: date,
    created_by: created_by,
    city: city,
    img_url: 'images_folder/event2img.png',
  })
  error && console.log(error)
}
const insertEvent = async () => {
  const {data, error} = await supabase.from('events').select()
  data && console.log(data)
  error && console.log(error)
}

const MidCardB = ({data}) => {
  const {name, date, type, img} = data
  return (
    <div className="midcardb">
      <div className="midcardb-info">
        <p className="midcardb-title">{name}</p>
        <p>{date}</p>
        <div className="midcardb-tags">
          <button>{type}</button>
        </div>
        <div className="midcardb-share">
          <button>
            <SaveIcon />
          </button>
          <button>
            <ShareIcon />
          </button>
        </div>
      </div>
      <img src="./img2.jpg" alt="tropisme" className="card_img" />
    </div>
  )
}

const Tags = ({state, typeState}) => {
  const {tags, setTags} = state
  const {type, setType} = typeState
  const [shine, setShine] = useState()

  const handleClick = (e, prop) => {
    e.preventDefault()
    e.stopPropagation()
    const prev = tags
    Object.keys(tags).map((item) => {
      item === prop ? (prev[item] = !tags[item]) : (prev[item] = false)
    })
    setTags({...tags, prev})
    setType(prop)
    setShine(prop)
    console.log('type : ', type)
  }

  const Tag = ({name}) => {
    const prop = name.replace(' ', '').toLowerCase()
    return (
      <button
        className={`bg-black py-1 px-2 rounded-md w-fit border-[1px] border-slate-800 mt-1 ml-1 hover:cursor-pointer hover:bg-gray-900 hover:border-slate-700 ${
          type === name && 'bg-gray-900'
        }`}
        onClick={(e) => handleClick(e, name)}
      >
        {name}
      </button>
    )
  }

  return (
    <>
      <div className="min-h-fit min-w-full grid-flow-row ">
        <Tag name="Night Out" />
        <Tag name="Trip" />
        <Tag name="City Tour" />
        <Tag name="Food Tour" />
        <Tag name="Hike" />
        <Tag name="Party" />
        <Tag name="Boat Party" />
        <Tag name="House Party" />
      </div>
    </>
  )
}

const AddButton = ({add}) => {
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
        // required
      />
    </label>
  )
}

const LocationOfTheEvent = () => {
  return (
    <label>
      Where are you organizing an event ?
      <input
        type="text"
        name="location"
        placeholder="a particular club, place.."
        // required
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
          // // required
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
        // required
        placeholder="MM/DD/YYYY"
        onFocus={(e) => {
          e.target.type = 'date'
        }}
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
        // required
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

const WhereDoYouMeet = () => {
  return (
    <label>
      Where do you plan to meet with participants ?
      <input
        type="text"
        name="meeting_point"
        placeholder="Train station, club entry, city center..."
        // required
      />
    </label>
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
        // required
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
        // required
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
        // required
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
  const optionStyle = 'bg-slate-800 rounded-md overflow-hidden'

  const [steps, setSteps] = useState([])
  const [includes, setIncludes] = useState([])
  const [brings, setBrings] = useState([])
  const [type, setType] = useState('night out')
  // const [tags, setTags] = useState({
  //   nightout: false,
  //   trip: false,
  //   citytour: false,
  //   foodtour: false,
  //   hike: false,
  //   party: false,
  //   boatparty: false,
  //   houseparty: false,
  // })
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

    console.log(datajson)
    console.log(steps)
    const uuid = uuidv4()

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
      location: location,
      meeting_point: meeting_point,
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
        send.error.message
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
      type: type,
      brings: brings,
      includes: includes,
      steps: steps,
    })
  }

  return (
    <>
      {form && (
        <div className="page md:w-fit text-white">
          <p className="title">Create an Event</p>
          <div className="block">
            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={handleSubmit}>
              {/*
              <label>
                Select a type :
                 <Tags state={{tags, setTags}} typeState={{type, setType}} /> 
              </label>
                 */}
              <CreateEventCitySelect />
              <NameYourEvent />
              <LocationOfTheEvent />
              <WhenIsYourEvent />
              <WhatTimeIsYourEvent />
              <WhereDoYouMeet />
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
