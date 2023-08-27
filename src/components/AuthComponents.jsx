/** @format */
import { useState, useEffect, useContext } from 'react'
import { supabase } from '../functions/functions'
import { useNavigate, redirect } from 'react-router-dom'

//TODO email verification

const LoginCard = () => {
    const navigate = useNavigate()
    const [authError, setAuthError] = useState(false)
    const authfoo = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            setAuthError(true)
            throw new Error(error.message)
        }
        window.scrollTo(0, 0)
        navigate('/')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())
        const { email, password } = formJson
        authfoo(email, password)
    }

    return (
        <div>
            <p>Login using Email</p>
            <form className="flex flex-col my-2 gap-1" onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="p-2 rounded-md text-black hover:cursor-pointer "
                />
                <input
                    name="password"
                    type="password"
                    className="p-2 rounded-md text-black hover:cursor-pointer"
                />
                {authError && (
                    <p className="text-red-500 text-center py-2">Wrong email/password</p>
                )}
                <button type="submit bg-green-900" className="filter-button">
                    connexion
                </button>
            </form>
        </div>
    )
}
const SignUpCard = () => {
    const navigate = useNavigate()
    const authfoo = async (formData) => {
        const { email, password, first_name, last_name } = formData
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
            throw new Error(error.message)
        }
        const { user, session } = data


        const addUserToTable = await supabase.from('profiles').insert({
            id: user.id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            role: 'dev'
        })

        addUserToTable.error && console.log('error inserting user into db', addUserToTable.error.message)
        addUserToTable.data && console.log('user successfully inserted in db', addUserToTable.data)
        navigate(`${user.id}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())
        const { email, password } = formJson
        authfoo(formJson)
        console.log(formJson)
    }

    return (
        <div>

            <p>Sign up with Email</p>

            <form className="flex flex-col my-2 gap-1" onSubmit={handleSubmit}>

                <input
                    name="first_name"
                    type="text"
                    placeholder='your first name'
                    className="p-2 rounded-md text-black hover:cursor-pointer "
                />

                <input
                    name="last_name"
                    type="text"
                    placeholder='your last name'
                    className="p-2 rounded-md text-black hover:cursor-pointer "
                />

                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="p-2 rounded-md text-black hover:cursor-pointer "
                />

                <input
                    name="password"
                    type="password"
                    className="p-2 rounded-md text-black hover:cursor-pointer"
                />

                <button type="submit" className="filter-button">
                    Sign Up
                </button>

            </form>

        </div>
    )
}
function AuthCard() {
    return (
        <div className="section">
            <LoginCard />
            <SignUpCard />
        </div>
    )
}

export default AuthCard
