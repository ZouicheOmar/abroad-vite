/** @format */
/** TODO
 * - re add email confirmation
 */

import {supabase} from '../functions/functions'

import AuthCard from '../components/AuthComponents'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../@/components/ui/accordion'
import {Input} from '../@/components/ui/input'
import {Label} from '../@/components/ui/label'
import {Button} from '../@/components/ui/button'
import {useNavigate} from 'react-router-dom'

const SignupCard = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    SignUp(formJson)
  }

  const SignUp = async (formJson) => {
    const {email, password, first_name, last_name} = formJson
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: first_name,
          last_name: last_name,
        },
      },
    })
    if (error) {
      console.log(error)
      return error
    }

    const GET_SESSION = await supabase.auth.refreshSession()
    if (GET_SESSION.error) {
      console.log(GET_SESSION.error)
      return
    }

    const ADD_USER_TO_TABLE = await supabase.from('profiles').insert({
      id: GET_SESSION.data.user.id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      role: 'user',
    })

    if (ADD_USER_TO_TABLE.error) {
      console.log(ADD_USER_TO_TABLE.error)
      return
    }

    // navigate('confirm_email_page')
    // window.scrollTo(0, 0)
    return
  }

  return (
    <AccordionItem value="item-1" className=" min-w-70%">
      <AccordionTrigger>New Account</AccordionTrigger>
      <AccordionContent>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-10">
          <form onSubmit={handleSubmit}>
            <p className="mb-1">Name for the team to id you</p>
            <div className="flex gap-2 mb-4 ">
              <Input
                name="first_name"
                type="text"
                placeholder="John"
                required
                className="rounded text-slate-400"
              />
              <Input
                name="last_name"
                type="text"
                placeholder="DOE"
                required
                className="rounded text-slate-400"
              />
            </div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="dupont@hotmail.com"
              required
              className="rounded text-slate-400"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              id="password"
              placeholder="********"
              required
              className="rounded text-slate-400"
            />
            <div className="flex flex-col justify-items-center">
              <Button
                type="submit"
                variant="outline"
                className="rounded  mt-4 w-[70%] self-center border-green-300 hover:border-green-700 hover:text-green-400 hover:font-bold focus:border-green-700 focus:text-green-400 focus:font-bold "
              >
                Create account
              </Button>
            </div>
          </form>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

const LoginCard = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    const {email, password} = formJson
    console.log(email, password)
    LogInFunction(email, password)
  }

  const LogInFunction = async (email, password) => {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      console.log(error)
      return
    }
    window.scrollTo(0, 0)
    navigate('/')
    console.log(data)
    return
  }

  return (
    <AccordionItem value="item-2" className=" min-w-70%">
      <AccordionTrigger>Already got an account ?</AccordionTrigger>
      <AccordionContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <form onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="dupont@hotmail.com"
              className="rounded text-slate-400"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              id="password"
              placeholder="********"
              className="rounded text-slate-400"
            />
            <div className="flex flex-col justify-items-center">
              <Button
                type="submit"
                variant="outline"
                className="rounded  mt-4 w-[70%] self-center border-green-300 hover:border-green-700 hover:text-green-400 hover:font-bold focus:border-green-700 focus:text-green-400 focus:font-bold "
              >
                Log in
              </Button>
              <Button className="underline text-slate-400 ">
                forgot password ?
              </Button>
            </div>
          </form>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

const AuthAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-[90%]">
      <SignupCard />
      <LoginCard />
    </Accordion>
  )
}

const Container = ({children}) => (
  <div className="page pt-[10%] ">{children}</div>
)

const Title = () => <p className="title">Create or Log In to your Account</p>

const Log = () => {
  // user always signs up, if account already created, automatically
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    const {email, password} = formJson
    console.log(email, password)
    logupin(email, password)
  }

  const logIn = async (email, password) => {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      return error
    }
    window.scrollTo(0, 0)
    navigate('/')
    console.log(data)
    return {data}
  }

  const logupin = async (email, password) => {
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) {
        return error
      }
      window.scrollTo(0, 0)
      navigate('/')
      console.log(data)
      return {data}
    }
    return data
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <form onSubmit={handleSubmit}>
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="email"
          id="email"
          placeholder="dupont@hotmail.com"
          className="rounded text-slate-400"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          type="password"
          id="password"
          placeholder="********"
          className="rounded text-slate-400"
        />
        <div className="flex flex-col justify-items-center">
          <Button
            type="submit"
            variant="outline"
            className="rounded mt-4 w-[70%] self-center hover:border-green-700 hover:text-green-400 hover:font-bold"
          >
            Log in
          </Button>
          <Button className="underline text-slate-400 ">
            forgot password ?
          </Button>
        </div>
      </form>
    </div>
  )
}

const Description = () => {
  return (
    <div className="section flex justify-center">
      <div className="max-w-[70%] flex flex-col justify-end border rounded p-4 border-green-600 ">
        <p>By creating an account you can : </p>
        <ul className="list-disc list-inside text-start leading-tight">
          <li>Participate to events</li>
          <li>Manage your events</li>
          <li className="text-slate-500">Invite people</li>
        </ul>
      </div>
    </div>
  )
}

function AuthPage() {
  return (
    <>
      <Container>
        <Title />
        <Description />
        <AuthAccordion />
      </Container>
    </>
  )
}

export default AuthPage
