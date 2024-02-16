import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios"
import Swal from "sweetalert2"
import { jwtDecode } from "jwt-decode";

export default function LoginComponent(){

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin(e){
        e.preventDefault()
        try {
            let requestBody = { email, password }
            let {data} = await axios.post('http://localhost:3000/login', requestBody)
            console.log(data);
            localStorage.setItem('access_token', data.accessToken)
            navigate('/')
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        }
    }

    async function handleGoogleLogin(decode){
        try {
            let { name : fullName, email, sub : password } = decode
            let { data } = await axios.post('http://localhost:3000/check-user', {
                email
            })
            let response = ""
            if(!data){
                await axios.post('http://localhost:3000/register', {
                    fullName, 
                    email,
                    password,
                    address : "Google address" 
                })
            }
            response = await axios.post('http://localhost:3000/login', {
                email,
                password
            })
            console.log(response, "<<<");
            localStorage.setItem('access_token', response.data.accessToken)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin} >
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input onChange={e => {setEmail(e.target.value)}} id="email" name="email" type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                    <input onChange={e => {setPassword(e.target.value)}} id="password" name="password" type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                Don't have an account yet? 
                <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register here</Link>
                </p>
                <div className="flex justify-center mt-5">
                    <GoogleLogin
                    onSuccess={credentialResponse => {
                        const decoded = jwtDecode(credentialResponse?.credential);
                        console.log(decoded);
                        handleGoogleLogin(decoded)
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    />
                </div>
                
            </div>
        </div>
    )
}

