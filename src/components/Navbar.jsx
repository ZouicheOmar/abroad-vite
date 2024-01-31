/** @format */
import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './components.scss'
import {supabase} from '../functions/functions'
import {useUser} from '../context/userStore'

import {UserIcon, MenuIcon} from './Icons'

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
    case 'about':
      return '/about'
  }
}

const MobileNavbarMenuItem = ({item}) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    const NAVIGATE_TO = defineRoutes(item)
    console.log(NAVIGATE_TO)
    navigate(NAVIGATE_TO)
  }

  // const item_style =
  //   'formadjr border-[1px] rounded-[0.35rem] border-neutral-700 hover:border-neutral-400 my-1 py-1 text-2xl text-center hover:cursor-pointer'

  const item_style =
    'formadjr font-bold border-2 border-white py-1 text-2xl pl-[1rem] hover:cursor-pointer text-white'

  const TO_DISPLAY = makeFirstLetterUpperCase(item)

  return (
    <DropdownMenu.Item className={item_style} onClick={(e) => handleClick(e)}>
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
      <DropdownMenu.Trigger className="sm:hidden focus:outline-none">
        <MenuIcon className="px-[2px] active:border-none" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={menu_content_style}>
        <MobileNavbarMenuItem item="home" />
        <MobileNavbarMenuItem item="events" />
        {user.user === null && <MobileNavbarMenuItem item="your account" />}
        <MobileNavbarMenuItem item="about" />
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
      {/* <p
        className="text-sm leading-none hover:cursor-pointer border-[1px] rounded p-1 w-fit h-fit truncate "
        onClick={handleGoToUserPage}
      >
        {user.first_name} <br />
        {user.last_name}
      </p> */}
      <span
        className="text-sm leading-none hover:cursor-pointer border-2 rounded-full hover:curtsor-pointer p-1 w-fit h-fit truncate "
        onClick={handleGoToUserPage}
      >
        <UserIcon className="hover:cursor-pointer" />
      </span>
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

const DesktopNavbarItems = () => {
  const navigate = useNavigate()
  const handleClick = (e, route) => {
    e.stopPropagation()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    navigate(route)
  }

  return (
    <div className="desktop hidden sm:flex text-xl sm:gap-0 md:gap-4 ">
      <span className="navbar-item" onClick={(e) => handleClick(e, '/events')}>
        Events
      </span>
      <span className="navbar-item" onClick={(e) => handleClick(e, '/logpage')}>
        Your Profile
      </span>
      <span className="navbar-item" onClick={(e) => handleClick(e, '/about')}>
        About
      </span>
      <span className="navbar-item" onClick={() => handleClick('/')}>
        Contact Us
      </span>
    </div>
  )
}

function Navbar() {
  const {user} = useUser()

  return (
    <>
      <div className="navbar">
        <HomeButton />
        <div className="z-50 flex gap-2 items-center">
          {user && <UserInNavbar />}
          <NavbarMenu />
          <DesktopNavbarItems />
        </div>
      </div>
    </>
  )
}

export default Navbar
