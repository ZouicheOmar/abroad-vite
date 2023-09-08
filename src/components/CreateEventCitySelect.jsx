/** @format */
import {makeFirstLetterUpperCase} from '../functions/textFormattingFunctions'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../@/components/ui/select'

const CityItem = ({item}) => {
  const TO_DISPLAY = makeFirstLetterUpperCase(item)

  return (
    <SelectItem value={item} className="smallDesc">
      {TO_DISPLAY}
    </SelectItem>
  )
}

function CreateEventCitySelect() {
  return (
    <label htmlFor="city" className="bg-inherit ">
      Choose a city:
      <Select
        //    onValueChange={(value) => handleValueChange(value)}
        name="city"
      >
        <SelectTrigger className="w-full rounded border-[1px] border-slate-800 data-[placeholder]:text-slate-400 text-md">
          <SelectValue
            placeholder="Cities"
            className="data-[state=placeholder]:text-slate-400"
          />
        </SelectTrigger>
        <SelectContent className="bg-slate-950  rounded border-[1px] border-slate-800 text-md text-white">
          <CityItem item="montpellier" />
          <CityItem item="Geneva" />
          <CityItem item="Lausanne" />
        </SelectContent>
      </Select>
    </label>
  )
}

export default CreateEventCitySelect
