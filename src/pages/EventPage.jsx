/** @format */
import {useCallback, useEffect, useState} from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {useLocation} from 'react-router-dom'
import {supabase, useEvent} from '../functions/functions'
import {useUser} from '../context/userStore'

import {Title} from '../components/UIComponents'
import {
  EventBanner,
  EventLocation,
  Description,
  Participants,
  Header,
  Included,
  Plan,
  Join,
  AlreadyIn,
} from '../components/EventPageComponents'

dayjs.extend(relativeTime)

// function EventPage() {
//   //check if user already in event
//   //If yes : don't show join
//   const {user: userLogged, setUser: setUserLogged} = useUser()

//   const [userIsParticipant, setUserIsParticipant] = useState(false)
//   const [listOfParticipants, setListOfParticipants] = useState(null)
//   const location = useLocation()
//   const eventid = location.pathname.slice(8)
//   const {data, loading, error, img} = useEvent(eventid)
//   const [user, setUser] = useState()

//   //   const getUser = async () => {
//   //     const {data, error} = await supabase.auth.getUser()

//   //     if (error) {
//   //       console.log(error.message)
//   //       return
//   //     }

//   //     const user_from_db = await supabase
//   //       .from('profiles')
//   //       .select()
//   //       .eq('id', data.user.id)
//   //     if (user_from_db.error) {
//   //       console.log('error getting user from db', user_from_db.error)
//   //     }
//   //     console.log('user_from_db : ', user_from_db.data[0])
//   //     console.log('data from getUser : ', data)
//   //     setUser(user_from_db.data[0])
//   //     checkUserInEvent(userLogged.user.id)

//   //     /**
//   //      * data : {
//   //      * {
//   //      * "user": {
//   //      *  "id": "46e55f3f-096b-4bd6-90d7-5ef5ec3e95e1",
//   //         "aud": "authenticated",
//   //         "role": "authenticated",
//   //         "email": "oungaounga@gmail.com",
//   //         "email_confirmed_at": "2023-08-15T20:08:15.954841Z",
//   //         "phone": "",
//   //         "confirmation_sent_at": "2023-08-15T20:07:49.933807Z",
//   //         "confirmed_at": "2023-08-15T20:08:15.954841Z",
//   //         "last_sign_in_at": "2023-08-15T22:36:01.746411Z",
//   //         "app_metadata": {
//   //             "provider": "email",
//   //             "providers": [
//   //                 "email"
//   //             ]
//   //         },
//   //         "user_metadata": {
//   //             "first_name": "ounga",
//   //             "last_name": "mowgli"
//   //         },
//   //         "identities": [
//   //             {
//   //                 "id": "46e55f3f-096b-4bd6-90d7-5ef5ec3e95e1",
//   //                 "user_id": "46e55f3f-096b-4bd6-90d7-5ef5ec3e95e1",
//   //                 "identity_data": {
//   //                     "email": "oungaounga@gmail.com",
//   //                     "sub": "46e55f3f-096b-4bd6-90d7-5ef5ec3e95e1"
//   //                 },
//   //                 "provider": "email",
//   //                 "last_sign_in_at": "2023-08-15T20:07:49.929763Z",
//   //                 "created_at": "2023-08-15T20:07:49.929804Z",
//   //                 "updated_at": "2023-08-15T20:07:49.929804Z"
//   //             }
//   //         ],
//   //         "created_at": "2023-08-15T20:07:49.922935Z",
//   //         "updated_at": "2023-08-15T22:36:01.751264Z"
//   //     }
//   // }
//   //      *
//   //      * }
//   //      */
//   //   }

//   const checkUserInEvent = async (user_data) => {
//     console.log('from check user in event ', user_data)
//     const {data, error} = await supabase
//       .from('events_users')
//       .select()
//       .match({event_id: eventid, user_id: user_data.user.id})
//     error && console.log('error checking user in event : ', error.message)
//     console.log('from checkuser in event : ', data)
//     data.length > 0 && setUserIsParticipant(true)
//   }

//   const getListOfParticipants = async () => {
//     const array = []
//     const {data, error} = await supabase
//       .from('events_users')
//       .select('user_id')
//       .eq('event_id', eventid)
//     if (error) {
//       console.log(error)
//     }
//     data.forEach((item) => {
//       array.push(item.user_id)
//     })
//     const usersFromDb = await supabase.from('profiles').select().in('id', array)
//     if (usersFromDb.error) {
//       console.log(error)
//     }
//     setListOfParticipants(usersFromDb.data)
//     // No need for user for db

//     /**
//      * [
//      * {
//         "user_id": "7b837617-acff-48d5-9222-2be927f2481b"
//     },
//     {
//         "user_id": "ae565d78-f6fb-4f9d-9888-80f59d3b5fb8"
//     }
//     ]

//     [
//     {
//         "id": "7b837617-acff-48d5-9222-2be927f2481b",
//         "first_name": "Dupont",
//         "last_name": "Julien",
//         "email": "dupont@test.fr",
//         "role": "dev"
//     },
//     {
//         "id": "ae565d78-f6fb-4f9d-9888-80f59d3b5fb8",
//         "first_name": "Quentin",
//         "last_name": "Fontana",
//         "email": "quentin1220fontana@hotmail.fr",
//         "role": "dev"
//     }
//     ]
//      */
//   }

//   useEffect(() => {
//     window.scrollTo(0, 0)
//     console.log('user context consumed ? :', userLogged)
//     // getUser()
//     userLogged !== null && checkUserInEvent(user)
//     getListOfParticipants()
//   }, [userIsParticipant])

//   return (
//     <div className="page">
//       {loading && <div className="text-5xl">loading</div>}
//       {data && (
//         <>
//           <EventBanner src={img} />
//           <Title title={data.name} />
//           <Header data={data} />
//           <EventLocation />
//           <Description data={data} />
//           <Plan data={data} />
//           <Included data={data.included[0]} />
//           {userIsParticipant ? (
//             <AlreadyIn />
//           ) : (
//             <Join
//               eventid={eventid}
//               user={user}
//               isUserIn={{userIsParticipant, setUserIsParticipant}}
//             />
//           )}
//           {listOfParticipants !== null && (
//             <Participants list={listOfParticipants} />
//           )}
//         </>
//       )}
//     </div>
//   )
// }

function EventPage() {
  const {user} = useUser()
  const [joined, setJoined] = useState(false)

  const [listOfParticipants, setListOfParticipants] = useState(null)
  const location = useLocation()
  const event_id = location.pathname.slice(8)
  const {data, loading, error, img} = useEvent(event_id)

  const getListOfParticipants = useCallback(async () => {
    const array = []
    const {data, error} = await supabase
      .from('events_cross_users')
      .select('user_id')
      .eq('event_id', event_id)
    if (error) {
      console.log(error)
    }
    data.forEach((item) => {
      array.push(item.user_id)
    })
    const usersFromDb = await supabase.from('profiles').select().in('id', array)
    if (usersFromDb.error) {
      console.log(error)
    }
    setListOfParticipants(usersFromDb.data)
  })

  const checkIfCurrentUserIsIn = useCallback(async () => {
    console.log('in checkifcurrentuserisin', user.id, event_id)
    const {data, error} = await supabase
      .from('events_cross_users')
      .select()
      .match({event_id: event_id, user_id: user.id})

    if (error) {
      console.log(error.message)
      return
    }
    data.length > 0 && setJoined(true)
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    user && checkIfCurrentUserIsIn()
    getListOfParticipants()
  }, [])

  return (
    <div className="page">
      {loading && <div className="text-5xl">loading</div>}
      {data && (
        <>
          <EventBanner src={img} />
          <Title title={data.name} />
          <Header data={data} />
          <EventLocation />
          <Description data={data} />
          <Plan data={data} />
          <Included data={data.included[0]} />

          {joined ? (
            <AlreadyIn />
          ) : (
            <Join event_id={event_id} setJoined={setJoined} />
          )}

          {listOfParticipants !== null && (
            <Participants list={listOfParticipants} />
          )}
        </>
      )}
    </div>
  )
}

export default EventPage
