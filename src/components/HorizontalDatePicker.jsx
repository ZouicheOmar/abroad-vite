/** @format */
import {Button} from '../../@/components/ui/button'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import {getHorizontalDates, getDayOfWeek} from '../functions/dayjsrelated'
import {useEvents} from '../functions/functions'

import './horizontalDatePicker.css'
import dayjs from 'dayjs'
import {useCallback, useEffect} from 'react'

export const HorizontalDatePicker = ({filter}) => {
  const DATES_DATA = getHorizontalDates()
  const DATES_ARRAY = DATES_DATA.monthArray
  const {selectedDate, setSelectedDate} = filter
  const {data} = useEvents()

  const checkDate = useCallback(
    (item) => {
      for (const event of data) {
        if (item.isSame(dayjs(event.date), 'D')) {
          return true
        }
      }
      return false
    },
    [data]
  )

  const handleClick = useCallback((item) => {
    checkDate(item) && setSelectedDate(item)
  }, [])

  return (
    <>
      <div className="upcoming-dates-body">
        <p className="title"> see upcoming events </p>
        <ScrollArea.Root className="w-full h-fit overflow-hidden rounded">
          <ScrollArea.Viewport className="w-full h-full mb-[2px]">
            <div className="min-w-[112rem] max-h-fit">
              {data &&
                DATES_ARRAY.map((item, index) => (
                  <Button
                    key={index}
                    onClick={(e) => {
                      handleClick(item)
                    }}
                    className={`${
                      checkDate(item) &&
                      'text-yellow-500 font-bold hover:bg-slate-500 hover:cursor-pointer'
                    } bg-slate-700 p-0 w-[3rem] h-[3rem] m-1 mb-2 rounded-[0.5rem] `}
                  >
                    <p className={`text-lg leading-none`}>
                      {getDayOfWeek(item.$W)} <br /> {item.$D}
                    </p>
                  </Button>
                ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </>
  )
}
