/** @format */
import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './components.scss'
import {supabase} from '../functions/functions'
import {useUser} from '../context/userStore'

import {makeFirstLetterUpperCase} from '../functions/textFormattingFunctions'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {Button} from '../../@/components/ui/button'
import {Menu} from 'lucide-react'

const defineRoutes = (route) => {
  switch (route) {
    case 'home':
      return '/'
    case 'events':
      return '/events'
    case 'your account':
      return '/logpage'
    case 'paywall test':
      return '/paywallTest'
    case 'create an event':
      return '/createevent'
  }
}

const MobileNavbarMenuItem = ({item}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    const NAVIGATE_TO = defineRoutes(item)
    console.log(NAVIGATE_TO)
    navigate(NAVIGATE_TO)
  }

  const item_style =
    'border-[1px] rounded-[0.35rem] border-neutral-700 hover:border-neutral-400 my-1 py-1 text-2xl text-center hover:cursor-pointer'

  const TO_DISPLAY = makeFirstLetterUpperCase(item)

  return (
    <DropdownMenu.Item className={item_style} onClick={handleClick}>
      {TO_DISPLAY}
    </DropdownMenu.Item>
  )
}

const NavbarMenu = () => {
  const user = useUser()
  useEffect(() => {
    console.log('from navbar', user)
  }, [])
  const menu_content_style =
    'modal p-2 rounded-lg w-[100vw] h-[100vh] data-[state=open]:animate-[opacity-animation-on_300ms] data-[state=closed]:animate-[opacity-animation-off_300ms]'

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button className="w-fit px-[2px]">
          <Menu />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={menu_content_style}>
        <MobileNavbarMenuItem item="home" />
        <MobileNavbarMenuItem item="events" />
        {user.user === null && <MobileNavbarMenuItem item="your account" />}
        <MobileNavbarMenuItem item="create an event" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

/**
 * TODO : refactor : compound all user related action
 * example :
 *  User clicking on profile name in navbar
 *  User clicking on log out
 *  User Clicking on join
 *  etc..
 * All actions should be compound in one reducer
 */

const UserInNavbar = () => {
  const navigate = useNavigate()
  const {user} = useUser()

  const handleLogout = useCallback(async () => {
    const {error} = supabase.auth.signOut()
    error && console.log('error loging out : ', error.message)
    navigate('/')
  })

  const handleGoToUserPage = useCallback(() => {
    console.log('user data : ', user)
    navigate(`/logpage/${user.id}`)
  })

  return (
    <>
      <p
        className="text-sm leading-none hover:cursor-pointer border-[1px] rounded p-1 w-fit h-fit truncate "
        onClick={handleGoToUserPage}
      >
        {user.first_name} <br />
        {user.last_name}
      </p>
      <p
        className="text-sm min-h-full border-[1px] rounded px-2 hover:bg-slate-900 cursor-pointer"
        onClick={handleLogout}
      >
        log out
      </p>
    </>
  )
}

const HomeButton = () => {
  const navigate = useNavigate()

  return (
    <span
      className="navbar-title"
      onClick={() => {
        navigate('/')
      }}
    >
      ABROAD
    </span>
  )
}

function Navbar() {
  const {user} = useUser()
  const navigate = useNavigate()

  return (
    <>
      <div className="navbar">
        <HomeButton />
        <div className="z-50 flex gap-2 items-center">
          {user && <UserInNavbar />}
          <NavbarMenu />
        </div>
      </div>
    </>
  )
}

export default Navbar
