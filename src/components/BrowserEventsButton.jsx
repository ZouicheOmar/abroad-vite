/** @format */

import {Link, Navigate, useNavigate} from 'react-router-dom'
import {Button} from '../@/components/ui/button'
import {useCallback} from 'react'

export const BrowseEventsButton = () => {
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    window.scrollTo(0, 0)
    navigate('./events')
  })
  return (
    <p
      className="nicebutton w-full py-4 sm:w-[16rem] sm:text-lg sm:py-2"
      onClick={handleClick}
    >
      Browse all events
    </p>
  )
}

export const SmallBrowseEventsButton = () => {
  return (
    <Link to="../../events">
      <Button
        variant="outline"
        className="rounded text-lg my-2  self-center text-white border-green-300 hover:border-green-700 hover:text-green-400 hover:font-bold focus:border-green-700 focus:text-green-400 focus:font-bold hover:cursor-pointer focus:cursor-pointer"
      >
        Browse all events
      </Button>
    </Link>
  )
}
