/** @format */

import {useState, useEffect, useContext, createContext} from 'react'
import {supabase} from '../functions/functions'

const UserContext = createContext({})

const useUserSource = () => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [userEvents, setUserEvents] = useState(null)

  useEffect(() => {
    const fetchUser = async (id) => {
      if (id === null) {
        setUser(null)
      }

      const {data, error} = await supabase
        .from('profiles')
        .select()
        .eq('id', id)

      if (error) {
        console.log('from useUserFromProfiles : ', error)
        return
      }

      setUser(data[0])
    }

    const getUserEvents = async (id) => {
      let SET_EVENTS_STATE = []

      const {data, error} = await supabase
        .from('events_cross_users')
        .select('event_id')
        .eq('user_id', id)

      if (error) {
        console.log('error fetching events', error.message)
        return
      }

      data.forEach((item) => {
        SET_EVENTS_STATE.push(item.event_id)
      })

      const EVENTS_LIST = await supabase
        .from('events')
        .select()
        .in('id', SET_EVENTS_STATE)
      if (EVENTS_LIST.error) {
        console.log(EVENTS_LIST.error.message)
        return
      }

      // EVENTS_LIST.data.length > 0 && setUserEvents(EVENTS_LIST.data)
      setUserEvents(EVENTS_LIST.data)
    }

    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') {
        setSession(session)
        fetchUser(session.user.id)
        getUserEvents(session.user.id)
      }
      if (event == 'SIGNED_OUT') {
        setSession(null)
        setUser(null)
        setUserEvents(null) //useless
      }
    })
  }, [session])

  return {user, userEvents}
}

export const useUser = () => {
  return useContext(UserContext)
}

export const UserContextProvider = ({children}) => {
  return (
    <UserContext.Provider value={useUserSource()}>
      {children}
    </UserContext.Provider>
  )
}
