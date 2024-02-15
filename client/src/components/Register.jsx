import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

export default function RegisterComponent(){

    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    async function handleRegister(e){
        e.preventDefault()
        try {
            let requestBody = { fullName, email, password, phoneNumber, address }
            let response = await axios.post('http://localhost:3000/register', requestBody)
            console.log(response);
            Swal.fire({
                title: "Good job!",
                text: "Your account has been created!",
                icon: "success"
            });
            navigate('/login')
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">Your name</label>
                        <div className="mt-2">
                            <input onChange={e => {setFullName(e.target.value)}} id="fullName" name="fullName" type="text" autoComplete="fullName" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input onChange={e => {setEmail(e.target.value)}} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input onChange={e => {setPassword(e.target.value)}} id="password" name="password" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
                        <div className="mt-2">
                            <input onChange={e => {setPhoneNumber(e.target.value)}} id="phoneNumber" name="phoneNumber" type="text" autoComplete="phoneNumber" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Your address</label>
                        <div className="mt-2">
                            <input onChange={e => {setAddress(e.target.value)}} id="address" name="address" type="text" autoComplete="address" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account? 
                <Link to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login here</Link>
                </p>
            </div>
        </div>
    )
}

