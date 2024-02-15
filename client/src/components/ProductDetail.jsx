import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function ProductDetailComponent(){

    const { id } = useParams()

    const [data, setData] = useState({
        title : "",
        description : "",
        price : "",
        stock : ""
    })

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

    return (
        <div>
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row -mx-4">
                    <div class="md:flex-1 px-4">
                        <div class="h-[460px] rounded-lg bg-gray-300 mb-4">
                            <img class="w-full h-full object-cover" src={data.thumbnail} alt="Product Image"/>
                        </div>
                        <div class="flex -mx-2 mb-4">
                            <div class="w-1/2 px-2">
                                <button class="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 ">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div class="md:flex-1 px-4">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">{data.title}</h2>
                        <p class="text-gray-600 text-sm mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                            ante justo. Integer euismod libero id mauris malesuada tincidunt.
                        </p>
                        <div class="flex mb-4">
                            <div class="mr-4">
                                <span class="font-bold text-gray-700">Price:</span>
                                <span class="text-gray-600 ">${data.price}</span>
                            </div>
                            <div>
                                <span class="font-bold text-gray-700">Availability:</span>
                                <span class="text-gray-600">{data.stock}</span>
                            </div>
                        </div>
                        <div>
                            <span class="font-bold text-gray-700 ">Product Description:</span>
                            <p class="text-gray-600 text-sm mt-2">
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}