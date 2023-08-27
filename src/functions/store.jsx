/** @format */

import {
  useCallback,
  useContext,
  useEffect,
  createContext,
  useReducer,
  useState,
} from 'react'
import {supabase} from './functions.js'

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

// const userReducer = (state, action) => {
//   switch (action.type) {
//     case 'USER_LOGGED_IN':
//       console.log('user logged in ')
//       break
//     case 'USER_LOOGED_OUT':
//       console.log('user logged in ')
//       break
//     case 'USER_SIGN_IN':
//       console.log('user logged in ')
//       break
//     case 'GET_USER_EVENTS_LIST':
//       console.log('user logged in ')
//       break
//   }
// }
