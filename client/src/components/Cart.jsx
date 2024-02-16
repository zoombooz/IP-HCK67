import { useEffect, useState } from "react"
import axios from "axios"
import { Link, redirect } from "react-router-dom"
import Swal from "sweetalert2"

export default function CartComponent(){

    const [data, setData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        async function fetchData(){
            try {
                const {data : cart} = await axios({
                    method : "GET",
                    url : "http://localhost:3000/cart",
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                console.log(cart);

                let price = 0
                cart.forEach(item => {
                    price += (item.Product.price * item.amount)
                })
                setData(cart)
                setTotalPrice(price)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [reload])

    async function handleCheckOut(e){
        try {
            const response = await axios.post('http://localhost:3000/cart/generate-midtrans-token', {}, {
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            window.location.href = response.data.redirect_url
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        }
    }

    async function handleDelete(id){
        try {
            const response = await axios.delete(`http://localhost:3000/cart/${id}`, {
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            setReload(!reload)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="h-full bg-gray-100 pt-20" style={{height:"100vh"}}>
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {data.map(item => (
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                <img src={item.Product.thumbnail} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">{item.Product.title}</h2>
                                        <p className="mt-1 text-xs text-gray-700">{item.Product.description}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 transition duration-300 ease-in-out"> - </span>
                                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item.amount} min="1" />
                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50 transition duration-300 ease-in-out"> + </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">${item.Product.price * item.amount}</p>
                                            <svg onClick={e => {handleDelete(item.Product.id)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">${totalPrice}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">${totalPrice ? 5 : 0}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">${totalPrice ? totalPrice + 5 : 0} USD</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        <button onClick={handleCheckOut} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 transition duration-300 ease-in-out">Check out</button>
                    </div>
                </div>
            </div>
        </>
    )
}