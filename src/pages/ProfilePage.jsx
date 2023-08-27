/** @format */

/**
 * AUTH table cant be modified, so :
 * will have to get all user data from profiles table
 */
import {useUser} from '../context/userStore'

import {Title} from '../components/UIComponents'
import {Separator} from '../@/components/ui/separator'
import {SmallBrowseEventsButton} from '../components/BrowserEventsButton'
import {SmallEventCard} from '../components/Cards'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../@/components/ui/tabs'
import {Input} from '../@/components/ui/input'
import {Button} from '../@/components/ui/button'
import {supabase} from '../functions/functions'
import {useState, useCallback} from 'react'

const TabsWindows = () => {
  return (
    <TabsList className="w-full p-0 m-0">
      <TabsTrigger
        value="events"
        className="w-full  data-[state=inactive]:text-slate-700 data-[state=active]:scale-[120%]"
      >
        Your events
      </TabsTrigger>
      <TabsTrigger
        value="account"
        className="w-full m-0 data-[state=inactive]:text-slate-600 data-[state=active]:scale-[120%]"
      >
        Account
      </TabsTrigger>
    </TabsList>
  )
}

const EventsTab = () => {
  const {userEvents} = useUser()

  return (
    <TabsContent value="events" className="flex justify-center">
      <div className=" flex flex-col gap-2 items-center w-[90%] border-[1px] border-slate-700 rounded p-2 px-4 text-white ">
        <div className="w-full mb-2"></div>
        {userEvents?.length > 0 &&
          userEvents.map((item, index) => (
            <SmallEventCard event={item} key={index} />
          ))}
        <SmallBrowseEventsButton />
      </div>
    </TabsContent>
  )
}

const AddAccountPhone = () => {
  const user = useUser()
  const [added, setAdded] = useState(false)

  const addPhoneTOTable = useCallback(async (num) => {
    const {data, error} = await supabase
      .from('profiles')
      .update({phone: num})
      .eq('id', user.user.id)
    if (error) {
      console.log(error.message)
      return
    }
    console.log('phone added successfully', data)
    setAdded(true)
  })

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    addPhoneTOTable(formJson.phone)
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex gap-2">
          <Input
            name="phone"
            type="tel"
            placeholder="+44 744 444 444"
            pattern="[\+]?[0-9]{3}[0-9]{3}[0-9]{4,6}"
            required
            className="rounded text-slate-400 focus:bg-slate-900 focus:text-slate-200"
          />
          <Button
            type="submit"
            className="border-[1px] border-slate-400 rounded focus:text-green-500 focus:border-green-700"
          >
            add
          </Button>
        </div>
        {added && <small>Phone number has been successfully registered</small>}
      </form>
    </>
  )
}

const AddAccountInstagram = () => {
  const user = useUser()
  const [added, setAdded] = useState(false)

  const addPhoneTOTable = async (ig) => {
    const {data, error} = await supabase
      .from('profiles')
      .update({instagram: ig})
      .eq('id', user.user.id)
    if (error) {
      console.log(error.message)
      return
    }
    setAdded(true)
    console.log('phone added successfully', data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    addPhoneTOTable(formJson.instagram)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex gap-2">
          <Input
            name="instagram"
            type="text"
            placeholder="@your_instagram"
            required
            className="rounded text-slate-400 focus:bg-slate-900 focus:text-slate-200"
          />
          <Button
            type="submit"
            className="border-[1px] border-slate-400 rounded focus:text-green-500 focus:border-green-700"
          >
            add
          </Button>
        </div>
        {added && <small>Phone instagram @ been successfully registered</small>}
      </form>
    </>
  )
}

const AccountContact = () => {
  const {user} = useUser()

  return (
    <>
      <p className="font-bold text-xl">Phone</p>
      {user.phone === null ? <AddAccountPhone /> : user.phone}
      <Separator className="my-2 bg-slate-700" />
      <p className="font-bold text-xl">Instagram</p>
      {user.instagram === null ? <AddAccountInstagram /> : user.instagram}
      <Separator className="mt-2 mb-2 bg-slate-700" />
      <p className="text-sm pl-2 text-slate-300">
        Your phone number and Instagram help us reach you
      </p>
    </>
  )
}

const AccountTab = () => {
  const {user} = useUser()

  return (
    <TabsContent value="account" className="flex justify-center">
      {user && (
        <div className=" w-[90%] border-[1px] border-slate-700 rounded p-2 px-4 text-white">
          <p className="font-bold text-xl">Email</p>
          <p className="pl-2">{user.email}</p>
          <Separator className="my-2 bg-slate-700" />
          <AccountContact />
        </div>
      )}
    </TabsContent>
  )
}

const PageTabs = () => {
  return (
    <Tabs defaultValue="events" className="max-w-full p-0 mx-2 rounded ">
      <TabsWindows />
      <EventsTab />
      <AccountTab />
    </Tabs>
  )
}

function ProfilePage() {
  const {user} = useUser()

  return (
    <>
      <div className="w-full mt-[3rem] flex flex-col justify-center">
        {user && (
          <>
            <Title
              className="mb-2"
              title={`Hi ${user.first_name} ${user.last_name} `}
            />
            <PageTabs />
          </>
        )}
      </div>
    </>
  )
}

export default ProfilePage
