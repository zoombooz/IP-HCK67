import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function ProductCardComponent(){

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData(){
            try {
                let { data : products } = await axios({
                    method : "GET",
                    url : "http://localhost:3000/products/pub"
                })
                console.log(products);
                setData(products)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
}, [])

    return (
        <div className="flex flex-wrap justify-center">
            {data.map(product => (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-gray-500 ring-opacity-40 max-w-xs mx-2 my-4">
                    <div className="relative">
                        <img className="w-full h-48 w-96 object-cover" src={product.thumbnail} alt="Product Image"/>
                        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
                        </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between" style={{height:"14rem"}}>
                        <div>
                            <h3 className="text-xl font-medium mb-2">{product.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">${product.price}</span>
                                <Link to={`/product/${product.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Buy Now
                                </Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    )
}