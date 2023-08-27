/** @format */
import {useEvents, useImage} from '../functions/functions'
import {useNavigate} from 'react-router-dom'
import dayjs from 'dayjs'
import {useCallback} from 'react'

// import {Skeleton} from '../../@/components/ui/skeleton'

function Card({data}) {
  const {name, date, city, type, img_url, id} = data
  const {imgdata, imgloading, imgerror} = useImage(img_url)
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`events/${id}`)
  })

  return (
    <>
      <div className="card" onClick={handleClick}>
        {imgloading && <p> loading ... </p>}
        {imgdata !== null && (
          <img src={imgdata} alt="tropisme" className="card_img" />
        )}
        <div className="card-describe">
          <p className="card_title">{name}</p>
          <p className="card_date">{dayjs(date).format('dddd MMMM D')}</p>
        </div>
        <div className="flex gap-2">
          <p className="relative text-sm text-yellow-400 z-50 inline pl-[0.5rem] pr-[0.5rem] rounded-md bg-black">
            {city}
          </p>
          <p className="relative text-sm text-yellow-400 z-50 inline pl-[0.5rem] pr-[0.5rem] rounded-md bg-black">
            {type}
          </p>
        </div>
      </div>
    </>
  )
}

function Upcoming() {
  const {data, error, loading} = useEvents()
  error && console.log(error)
  return (
    <>
      <div className="upcoming">
        <p className="title pl-4">Evenements à venir</p>
        <div className="body">
          {loading && <p className="text-3xl">loading...</p>}
          {data &&
            data.map(
              (item, index) => index <= 5 && <Card data={item} key={index} />
            )}
        </div>
      </div>
    </>
  )
}

export default Upcoming
