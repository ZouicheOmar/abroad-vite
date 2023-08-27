/** @format */
//TODO : finish this component
// left to implement : reducer trigerred at user action and events

import {
  useCallback,
  useContext,
  useEffect,
  createContext,
  useReducer,
  useState,
} from 'react'
import {supabase} from '../functions/functions'

const EventsContext = createContext({})

const useEventsSource = () => {
  //TODO this is a component, so useCallback

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'GET_EVENTS':
        return {...state, events: action.payload}
      case 'TEST_ONE':
        console.log('testing dispatch one', state)
        return {...state}
    }
  })

  const testFuncOne = () => {
    dispatch({type: 'TEST_ONE', payload: state})
  }

  const getEvents = async () => {
    const {data, error} = await supabase.from('events').select()
    if (error) {
      console.log('error fetching', error.message)
      return
    }
    dispatch({type: 'GET_EVENTS', payload: data})
  }

  useEffect(() => {
    getEvents()
  }, [])

  const foo = useCallback(() => {
    console.log('from useEventsSource : ', state)
  }, [])

  return {state, foo, testFuncOne}
}

// useEvents HOOK
// export const useEvents = () => {
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   useEffect(() => {
//     const fetch = async () => {
//       const events = await supabase.from('events').select()
//       error && console.log(error)
//       const n = events.data.length
//       const w = []
//       for (let i = 0; i < n; i++) {
//         w.push(events.data[i])
//       }
//       setLoading(false)
//       if (events.error) {
//         setError(events.error)
//       }
//       setData(w)
//     }
//     fetch()
//   }, [])

//   return {data, loading, error, setData}
// }

export const useEvents = () => {
  return useContext(EventsContext)
}

export const EventsContextProvider = ({children}) => {
  return (
    <EventsContext.Provider value={useEventsSource()}>
      {children}
    </EventsContext.Provider>
  )
}
