/** @format */
import {useState} from 'react'
import {AddButton} from '../../pages/CreateEventPage'

import {XIcon} from '../Icons'

const init_state = {
  place_name: null,
  address: null,
  zipcode: null,
  city: null,
}

const ShowEventAddress = ({data, data_manage}) => {
  const {eventAddress, setEventAddress} = data
  const {setState, setErrorMessage} = data_manage

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setState(init_state)
    setErrorMessage(null)
    setEventAddress(null)
  }

  return (
    <div className="relative w-full border-[1px] p-2 leading-tight border-indigo-950 rounded ">
      <p>{eventAddress.place_name}</p>
      <p>{eventAddress.address}</p>
      {eventAddress.zipcode && (
        <p>
          {eventAddress.zipcode}, {eventAddress.city}
        </p>
      )}
      <span
        className="hover:cursor-pointer absolute top-0 mt-1 right-2  box-border rounded hover:bg-red-700 hover:border-red-900 scale-75 border-[0.5px] border-neutral-800 px-2"
        onClick={handleClick}
      >
        <XIcon />
      </span>
    </div>
  )
}

const ShowErrorMessage = ({message}) => {
  return (
    <p className="text-red-500 bg-red-950 border-[1px] rounded border-red-500 w-[90%] text-center ml-auto mr-auto p-1 bg-opacity-50 ">
      {message}
    </p>
  )
}

function LocationOfTheEvent({value_data}) {
  const {eventAddress, setEventAddress} = value_data
  const [state, setState] = useState(init_state)
  const [errorMessage, setErrorMessage] = useState(null)

  const addEventAddress = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (
      !Object.values(state).includes(null) &&
      !Object.values(state).includes('')
    ) {
      setEventAddress({...state})
    } else {
      if (Object.values(state)[0] === null || Object.values(state)[0] === '') {
        setErrorMessage("Please add a the event's place name ")
      } else if (
        Object.values(state)[1] === null ||
        Object.values(state)[1] === ''
      ) {
        setErrorMessage('Please add an address')
      } else if (
        Object.values(state)[2] === null ||
        Object.values(state)[2] === ''
      ) {
        setErrorMessage('Please add a zipcode')
      } else if (
        Object.values(state)[3] === null ||
        Object.values(state)[3] === ''
      ) {
        setErrorMessage('Please confirm the city')
      }
    }
  }

  return (
    <label className="flex flex-col gap-1">
      <span className="smallDesc">Where are you organizing an event ?</span>
      {!eventAddress && (
        <>
          <input
            type="text"
            name="location"
            placeholder="JOST hotel, Panama Club..."
            autoComplete="off"
            onChange={(e) => setState({...state, place_name: e.target.value})}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="50 Rue Isabelle Eberhardt"
            value={state.address}
            autoComplete="off"
            onChange={(e) => setState({...state, address: e.target.value})}
            required
          />
          <input
            type="text"
            name="zipcode"
            placeholder="34000"
            autoComplete="off"
            value={state.zipcode}
            onChange={(e) => setState({...state, zipcode: e.target.value})}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Montpellier"
            autoComplete="off"
            value={state.city}
            onChange={(e) => setState({...state, city: e.target.value})}
            required
          />
          {errorMessage && <ShowErrorMessage message={errorMessage} />}
          <AddButton add={addEventAddress} />
        </>
      )}
      {eventAddress && (
        <ShowEventAddress
          data={{eventAddress, setEventAddress}}
          data_manage={{setState, setErrorMessage}}
        />
      )}
    </label>
  )
}

export default LocationOfTheEvent
