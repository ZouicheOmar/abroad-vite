/** @format */

/**
 * AUTH table cant be modified, so :
 * will have to get all user data from profiles table
 */
import {useUser} from '../context/userStore'
import {useState, useCallback, useEffect} from 'react'
import {supabase} from '../functions/functions'
import {useNavigate} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

import {Title} from '../components/UIComponents'
import {Separator} from '../@/components/ui/separator'
import {SmallBrowseEventsButton} from '../components/BrowserEventsButton'
import {SmallEventCard, SmallEventCardQRCodeAccess} from '../components/Cards'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../@/components/ui/tabs'
import {Input} from '../@/components/ui/input'
import {Button} from '../@/components/ui/button'

const TabsWindows = () => {
  const {user} = useUser()

  return (
    <TabsList className="w-[100vw] p-0 m-0">
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
      {user.user_role === 'manager' && (
        <TabsTrigger
          value="manage"
          className="w-full m-0 data-[state=inactive]:text-slate-600 data-[state=active]:scale-[120%]"
        >
          Manage
        </TabsTrigger>
      )}
    </TabsList>
  )
}

const EventsTab = () => {
  const {userEvents} = useUser()

  return (
    <TabsContent value="events" className="w-full p-0 flex justify-center">
      <div className=" flex flex-col gap-2 items-center w-[90%] border-[1px] border-slate-700 rounded p-2 px-4 text-white ">
        <div className="w-full mb-2"></div>
        {userEvents?.length > 0 &&
          userEvents.map((item, index) => (
            <SmallEventCardQRCodeAccess event={item} key={index} />
          ))}
        {userEvents?.length === 0 && (
          <p className="smallDesc border-[1px] border-orange-500 rounded bg-orange-900 bg-opacity-50 text-orange-500 px-2">
            You joined none of the events, check the upcoming ones !
          </p>
        )}
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

const ManagerEventSmallCard = ({item}) => {
  return (
    <div className="w-full px-2 py-1 border-slate-900 border-[1px] rounded bg-black text-white smallDesc hover:bg-neutral-900 transition-colors">
      <div className="min-w-full flex justify-between ">
        <p className="smallDesc text-lg text-yellow-300">{item.name}</p>
        <span className="smallDesc text-slate-300">{item.city}</span>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex gap-2">
          <span className="smallDesc">
            {dayjs(item.date).format('dd MMM D')},
          </span>
          <span className="smallDesc">
            {' '}
            {dayjs(`${item.date}${item.time}`).format('HH:mm')}{' '}
          </span>
        </div>
        <span className="smallDesc">{item.type}</span>
      </div>
    </div>
  )
}

const ManageTab = () => {
  const {userManagedEvents} = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('from manageTab : ', userManagedEvents)
  }, [])

  return (
    <TabsContent value="manage" className="flex justify-center">
      <div className=" flex flex-col gap-2 items-center w-[90%] border-[1px] border-slate-700 rounded p-2 px-4 text-white ">
        <div
          className="w-full"
          onClick={() => {
            console.log(userManagedEvents)
          }}
        >
          <p className="smallDesc">The events you are managing</p>
        </div>

        {userManagedEvents &&
          userManagedEvents.map((item, index) => {
            return <ManagerEventSmallCard item={item} key={index} />
          })}

        <Separator className="bg-slate-500" />

        <div className="w-full">
          <p className="smallDesc my-1 ">
            Got an idea and a plan for a new event ?
          </p>
          <Button
            variant="custom"
            onClick={() => {
              navigate('/createevent')
            }}
            className="text-start smallDesc bg-slate-700 w-full rounded text-md border-slate-500 border-[1px] hover:cursor-pointer "
          >
            Create an event
          </Button>
          <Separator className="bg-slate-500 my-2" />
        </div>

        <div className="w-full">
          <p className="smallDesc text-slate-500">Modify an event</p>
        </div>
      </div>
    </TabsContent>
  )
}

const PageTabs = () => {
  const {user} = useUser()

  return (
    <Tabs
      defaultValue="events"
      className="w-[100vw] p-0 ml-auto mr-auto rounded "
      id="tabs"
    >
      <TabsWindows />
      <EventsTab />
      <AccountTab />
      {user.user_role === 'manager' && <ManageTab />}
    </Tabs>
  )
}

function ProfilePage() {
  const {user} = useUser()

  return (
    <>
      <div className="w-[100vw] mt-[3rem] flex flex-col justify-center">
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
