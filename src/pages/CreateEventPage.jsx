/** @format */
import {useState} from 'react'
import {createClient} from '@supabase/supabase-js'
import {SaveIcon, ShareIcon, PlusIcon} from '../components/Icons'
import {v4 as uuidv4} from 'uuid'
import {stringify as uuidStringify} from 'uuid'
import {Link} from 'react-router-dom'

const supabaseUrl = 'https://bfybtqxgnnnzbcxynyvt.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmeWJ0cXhnbm5uemJjeHlueXZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDc2MjQzMiwiZXhwIjoyMDAwMzM4NDMyfQ.K5gyt8afxXaeKlbyZ8DpgWJ7IvPQDbE-TLrrTSKgMLE' //! service key, not anon key
const supabase = createClient(supabaseUrl, supabaseKey)
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
      <div>
        <label>
          What's included for all participants ?
          <ul className="list-disc list-inside pl-4 py-2">
            {includes &&
              includes.map((item, index) => {
                return (
                  <li className="text-sm " key={index}>
                    {item}
                  </li>
                )
              })}
          </ul>
          <input
            type="text"
            name="included"
            value={include}
            onChange={(e) => setInclude(e.target.value)}
            placeholder="what's included ?"
          />
        </label>

        <button
          className="my-1 w-1/2 ml-auto mr-auto flex justify-center py-2 bg-blue-900 rounded-md hover:bg-blue-800 cursor-pointer"
          onClick={addInclude}
        >
          <PlusIcon />
        </button>
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
      <div className="w-full mt-2 ">
        <label>
          What do the participants need to bring ?
          <ul className="list-disc list-inside pl-4 py-2">
            {brings &&
              brings.map((item, index) => {
                return (
                  <li className="text-sm " key={index}>
                    {item}
                  </li>
                )
              })}
          </ul>
          <input
            type="text"
            name="bring_with"
            value={bring}
            placeholder="bring with"
            onChange={(e) => setBring(e.target.value)}
          />
        </label>
        <button
          className="my-1 w-1/2 ml-auto mr-auto flex justify-center py-2 bg-blue-900 rounded-md hover:bg-blue-800 cursor-pointer"
          onClick={addBring}
        >
          <PlusIcon />
        </button>
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
    <div className="relative w-full border-[1px] my-2 p-2 leading-tight border-slate-700 rounded-md">
      <p className="text-md"> Step {stepn}</p>
      <div className="ml-4 text-sm leading-tight">
        <p>
          {action}
          <br />
          location : {location}
          <br />
          at : {time}
        </p>
      </div>
      <button
        onClick={handleClick}
        className="hover:cursor-pointer absolute top-0 mt-1 right-2  box-border  rounded-md hover:bg-red-900 border-[0.5px] border-neutral-800 text-lg px-2"
      >
        x
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
        {steps &&
          steps.map((item, index) => {
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
        <button
          className=" flex justify-center w-1/2 ml-auto mr-auto py-2 bg-blue-900 rounded-md hover:bg-blue-800 "
          onClick={addStep}
        >
          <PlusIcon />
        </button>
      </div>
    </>
  )
}

function CreateEventPage() {
  const optionStyle = 'bg-slate-800 rounded-md overflow-hidden'

  const [steps, setSteps] = useState([])
  const [includes, setIncludes] = useState([])
  const [brings, setBrings] = useState([])
  const [type, setType] = useState()
  const [tags, setTags] = useState({
    nightout: false,
    trip: false,
    citytour: false,
    foodtour: false,
    hike: false,
    party: false,
    boatparty: false,
    houseparty: false,
  })
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
      // created_by: created_by,
      description: description,
      steps: steps,
      included: [includes],
      img_url: `events/${uuid}.jpg`,
    })

    const img = await supabase.storage
      .from('media')
      .upload(`events/${uuid}.jpg`, img_file, {
        cacheControl: '3600',
        upsert: false,
      })
    setLoading(false)
    setEventSent(true)
  }

  return (
    <>
      {eventSent && (
        <div className="page">
          <p className="title">Congrats ! Event posted !</p>
          <Link to="/">
            <span className="text-white text-2xl border-2 cursor-pointer border-white rounded-md p-4">
              {' '}
              back to home page
            </span>
          </Link>
          <Link to={window.location.pathname}>
            <span className="text-white text-xl border-2 m-2 cursor-pointer border-white rounded-md p-4">
              {' '}
              Add another event (for test purpose)
            </span>
          </Link>
        </div>
      )}
      {form && (
        <div className="page">
          <p className="title">Create an Event</p>
          <div className="block">
            <form onSubmit={handleSubmit}>
              <label>
                Give a name to the Event :
                <input
                  type="text"
                  name="name"
                  placeholder="Name of your event"
                  required
                />
              </label>

              <label htmlFor="city" className="bg-inherit ">
                Choose a city:
                <select
                  name="city"
                  className="bg-inherit px-2 py-2 w-full border-[1px] border-slate-800 rounded-md"
                >
                  <option value="" className={optionStyle}>
                    --Please choose a city--
                  </option>
                  <option value="Geneva" className={optionStyle}>
                    Geneva
                  </option>
                  <option value="Lausanne" className={optionStyle}>
                    Lausanne
                  </option>
                  <option value="Montpellier" className={optionStyle}>
                    Montpellier
                  </option>
                </select>
              </label>

              <label>
                When ?
                <input
                  type="text"
                  name="date"
                  required
                  placeholder="MM/DD/YYYY"
                  onFocus={(e) => {
                    e.target.type = 'date'
                  }}
                />
              </label>

              <label>
                At what time ?
                <input
                  type="text"
                  name="timestamp"
                  placeholder="00:00"
                  required
                  onFocus={(e) => {
                    e.target.type = 'time'
                  }}
                />
              </label>

              <label>
                Select a type :
                <Tags state={{tags, setTags}} typeState={{type, setType}} />
              </label>

              <label>
                Describe your event :
                <textarea
                  type="text"
                  name="description"
                  placeholder="we are going to.."
                  required
                />
              </label>

              <Steps state={{steps, setSteps}} />
              <Brings state={{brings, setBrings}} />
              <Includes state={{includes, setIncludes}} />

              <label>
                Add an image to illustrate your post :
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  name="img_file"
                  required
                />
              </label>

              <button
                type="submit"
                className="text-xl w-1/2 max-w-fit ml-auto mr-auto rounded-md border-[1px] border-gray-700 px-2 py-1 hover:text-yellow-400 hover:cursor-pointer"
              >
                publish event
              </button>
            </form>
          </div>
        </div>
      )}
      {loading && (
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
      )}
    </>
  )
}

export default CreateEventPage
