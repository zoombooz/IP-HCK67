import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

export default function ProductDetailComponent(){

    const { id } = useParams()

    const [data, setData] = useState({
        title : "",
        description : "",
        price : "",
        stock : ""
    })
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        async function fetchData(){
            const { data : product } = await axios({
                method : "GET",
                url : `http://localhost:3000/products/${id}/pub`
            })
            setData(product)
        }
        fetchData()
    }, [])

    async function handleCart(id){
        try {
            const token = `Bearer ${localStorage.getItem("access_token")}`
            const quantity = {amount}
            const {data : cart} = await axios({
                method : "GET",
                url : `http://localhost:3000/cart/${id}`,
                headers : {
                    "Authorization" : token
                }
            })

            console.log(cart, "CART");

            let response = ""
            if(!cart && amount > 0){
                response = await axios.post(`http://localhost:3000/cart/${id}`, quantity, {
                    headers : {
                        "Authorization" : token
                    }
                })
            }else if(cart && amount > 0){
                console.log("MASUK2", cart);
                response = await axios.patch(`http://localhost:3000/cart/${id}`, quantity, {
                    headers : {
                        "Authorization" : token
                    }
                })
            }else if(cart && amount == 0){
                console.log("MASUK");
                response = await axios.delete(`http://localhost:3000/cart/${id}`, {
                    headers : {
                        "Authorization" : token
                    }
                })
            }else {
                throw {name : "You need to at least add 1 product to cart"}
            }
            console.log(response);
            Swal.fire({
                title: "Good job!",
                text: response.data.message,
                icon: "success"
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.name,
            });
        }
    }

    return (
        <div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                            <img className="w-full h-full object-cover" src={data.thumbnail} alt="Product Image"/>
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <form className="max-w-xs mx-auto mb-2">
                                    <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
                                    <div className="relative flex items-center max-w-[8rem]">
                                        <button onClick={e => {if(amount > 0){setAmount(amount - 1)}}} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <input onChange={e => {setAmount(e.target.value)}} value={amount} type="text" id="amount" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        <button onClick={e => {setAmount(amount + 1)}} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                                <button onClick={e => {handleCart(id)}} className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 ">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.title}</h2>
                        <p className="text-gray-600 text-sm mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                            ante justo. Integer euismod libero id mauris malesuada tincidunt.
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700">Price:</span>
                                <span className="text-gray-600 ">${data.price}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700">Availability:</span>
                                <span className="text-gray-600">{data.stock}</span>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 ">Product Description:</span>
                            <p className="text-gray-600 text-sm mt-2">
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}