/** @format */
import {useState, createContext} from 'react'
import {useEvents} from '../functions/functions'

// import {useEvents} from '../context/eventStore'
import {MidCardB, Filters} from '../components/EventRelatedComponents'
import {Title} from '../components/UIComponents'

export const EventsContext = createContext()

function EventsPage() {
  const {data, loading, error, setData} = useEvents()
  const [defaultEvents, setDefaultEvents] = useState(null)

  return (
    <div className="page">
      <Title title={'Events'} />

      {error && <p>There's been an error loading your events..</p>}

      {loading && <p>Loading...</p>}

      {data && (
        <>
          <EventsContext.Provider
            value={{
              data,
              setData,
              defaultEvents,
              setDefaultEvents,
            }}
          >
            <Filters />
          </EventsContext.Provider>
          <div className="section">
            <p className="title mb-2">Events on 🔥🔥🔥</p>

            {data.map((item, index) => {
              return <MidCardB data={item} key={index} />
            })}
          </div>
        </>
      )}
    </div>
  )
}
export default EventsPage
