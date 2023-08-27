/** @format */
import {useCallback, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './components.scss'
import {supabase} from '../functions/functions'
import {useUser} from '../context/userStore'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {Button} from '../../@/components/ui/button'
import {Menu} from 'lucide-react'

// const NavbarMenu = ({showmenu}) => {
//   const {showMenu, setShowMenu} = showmenu
//   // const {userLogged, setUserLogged} = useUser()
//   return (
//     <>
//       <div
//         className="fixed top-0 left-0 min-w-[100vw] min-h-[100vh] modal flex justify-center"
//         onClick={(e) => {
//           e.target === e.currentTarget && setShowMenu(false)
//         }}
//       >
//         <div
//           className={`p-[1rem] rounded-md absolute w-[75%] right-auto top-[3rem] min-w-fit bg-blur-md text-2xl ${
//             showMenu && 'shadowPage'
//           }`}
//         >
//           <ul>
//             <Link to="/">
//               <li
//                 className="pl-[0.5rem] text-white font-normal pt-[0.8rem] pb-[0.8rem] mt-[0.2rem] mb-[0.2rem] pr-[0.5rem] w-full rounded-md cursor-pointer"
//                 onClick={() => {
//                   setShowMenu(false)
//                 }}
//               >
//                 Home
//               </li>
//             </Link>
//             <Link to="/events">
//               <li
//                 className="text-white font-normal pl-[0.5rem] pt-[0.8rem] pb-[0.8rem] mt-[0.2rem] mb-[0.2rem] pr-[0.5rem] w-full rounded-md  cursor-pointer"
//                 onClick={() => {
//                   setShowMenu(false)
//                 }}
//               >
//                 Events
//               </li>
//             </Link>

//             <li className="pl-[0.5rem] mt-[0.2rem] mb-[0.2rem] pt-[0.8rem] pb-[0.8rem] pr-[0.5rem] w-full rounded-md ">
//               Shop
//             </li>

//             <li className="pl-[0.5rem] mt-[0.2rem] mb-[0.2rem] pt-[0.8rem] pb-[0.8rem] pr-[0.5rem] w-full rounded-md ">
//               Services
//             </li>
//             <li className="pl-[0.5rem] mt-[0.2rem] mb-[0.2rem] pt-[0.8rem] pb-[0.8rem] pr-[0.5rem] w-full rounded-md ">
//               Blog
//             </li>
//             <li className="pl-[0.5rem] mt-[0.2rem] mb-[0.2rem] pt-[0.8rem] pb-[0.8rem] pr-[0.5rem] w-full rounded-md ">
//               About/Contact
//             </li>
//             <Link to="/createevent">
//               <li
//                 className="text-white font-normal pl-[0.5rem] pt-[0.8rem] pb-[0.8rem] mt-[0.2rem] mb-[0.2rem] pr-[0.5rem] w-full rounded-md  cursor-pointer"
//                 onClick={() => {
//                   setShowMenu(false)
//                 }}
//               >
//                 Post an Event
//               </li>
//             </Link>
//             <Link to="/logpage">
//               <li
//                 className="text-white font-normal pl-[0.5rem] pt-[0.8rem] pb-[0.8rem] mt-[0.2rem] mb-[0.2rem] pr-[0.5rem] w-full rounded-md  cursor-pointer"
//                 onClick={() => {
//                   setShowMenu(false)
//                 }}
//               >
//                 Log In / Sign Up
//               </li>
//             </Link>
//           </ul>
//         </div>
//       </div>
//     </>
//   )
// }

const NavbarMenu = () => {
  const menu_content_style =
    'modal p-2 rounded-lg w-[100vw] h-[100vh] data-[state=open]:animate-[opacity-animation-on_300ms] data-[state=closed]:animate-[opacity-animation-off_300ms]'
  const item_style =
    'border-[1px] rounded-[0.35rem] border-neutral-700 hover:border-neutral-400 my-1 py-1 text-2xl text-center hover:cursor-pointer'
  // 'pagename'
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button className="w-fit px-[2px]">
          <Menu />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={menu_content_style}>
        <Link
          to="/"
          style={{textDecoration: 'none', color: 'white', fontWeight: 'normal'}}
        >
          <DropdownMenu.Item className={item_style}>Home</DropdownMenu.Item>
        </Link>
        <Link
          to="/events"
          style={{textDecoration: 'none', color: 'white', fontWeight: 'normal'}}
        >
          <DropdownMenu.Item className={item_style}>Events</DropdownMenu.Item>
        </Link>
        <Link
          to="/createevent"
          style={{textDecoration: 'none', color: 'white', fontWeight: 'normal'}}
        >
          <DropdownMenu.Item className={item_style}>
            Create (admin page)
          </DropdownMenu.Item>
        </Link>
        <Link
          to="/logpage"
          style={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'normal',
          }}
        >
          <DropdownMenu.Item className={item_style}>
            Your Account
          </DropdownMenu.Item>
        </Link>
        <Link
          to="/paywallTest"
          style={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'normal',
          }}
        >
          <DropdownMenu.Item className={item_style}>
            Paywall page test
          </DropdownMenu.Item>
        </Link>
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
  const user = useUser()
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
      <Button onClick={handleGoToUserPage} asChild>
        User
      </Button>
      <Button
        className="text-sm border-[1px] rounded px-2 hover:bg-slate-900 cursor-pointer"
        onClick={handleLogout}
        asChild
      >
        log out
      </Button>
    </>
  )
}

// function Navbar({authed, user}) {
//   const [showMenu, setShowMenu] = useState(false)
//   const [userAuth, setUserAuth] = useState(false)
//   const [userData, setUserData] = useState(null)

//   supabase.auth.onAuthStateChange((event, session) => {
//     if (event == 'SIGNED_IN') {
//       setUserAuth(true)
//       setUserData(session.user)
//     }
//     if (event == 'SIGNED_OUT') {
//       setUserAuth(false)
//       setUserData(null)
//     }
//   })
//   return (
//     <>
//       <div className="navbar">
//         <Link to="/">
//           <span className="navbar-title">ABROAD</span>
//         </Link>
//         <div className="z-50 flex gap-2 items-center">
//           {userAuth && <UserInNavbar user={userData} />}
//           <NewNavbarMenu />
//         </div>
//         {/*
//           <span
//             onClick={() => {
//               setShowMenu(!showMenu)
//             }}
//           >
//             <Menu />
//           </span>
//         {showMenu && <NavbarMenu showmenu={{showMenu, setShowMenu}} />} */}
//       </div>
//     </>
//   )
// }

function Navbar() {
  // const [showMenu, setShowMenu] = useState(false)
  // const [userAuth, setUserAuth] = useState(false)
  // const [userData, setUserData] = useState(null)

  const {user} = useUser()

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <span className="navbar-title">ABROAD</span>
        </Link>
        <div className="z-50 flex gap-2 items-center">
          {user !== null && <UserInNavbar />}
          <NavbarMenu />
        </div>
      </div>
    </>
  )
}

export default Navbar
