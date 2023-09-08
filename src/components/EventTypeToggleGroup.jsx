/** @format */

import {useState} from 'react'
import {makeFirstLetterUpperCase} from '../functions/textFormattingFunctions'

import * as ToggleGroup from '@radix-ui/react-toggle-group'

const EventTypeItem = ({type}) => {
  return (
    <ToggleGroup.Item
      className="min-w-fit data-[state=on]:bg-indigo-800 data-[state=on]:text-white data-[state=on]:border-slate-800 data-[state=on]:font- px-2 border-[1px] border-slate-800 ml-1 mt-1 rounded smallDesc hover:cursor-pointer"
      value={type}
      aria-label="Left aligned"
    >
      {makeFirstLetterUpperCase(type)}
    </ToggleGroup.Item>
  )
}

function EventTypeToggleGroup({type_data}) {
  const {type, setType} = type_data

  const handleValueChange = (value) => {
    console.log(value)
    setType(value)
    console.log('type after value change : ', type)
  }

  return (
    <>
      <label>
        Select a type :
        <ToggleGroup.Root
          className="flex  w-full flex-wrap"
          type="single"
          defaultValue={type}
          aria-label="Text alignment"
          value={type}
          onValueChange={(value) => handleValueChange(value)}
        >
          <EventTypeItem type={'night out'} />
          <EventTypeItem type={'trip'} />
          <EventTypeItem type={'city tour'} />
          <EventTypeItem type={'food tour'} />
          <EventTypeItem type={'hike'} />
          <EventTypeItem type={'party'} />
          <EventTypeItem type={'boat party'} />
          <EventTypeItem type={'house party'} />
        </ToggleGroup.Root>
      </label>
    </>
  )
}

export default EventTypeToggleGroup
