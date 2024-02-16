import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

export default function ProductFormComponent(){

    const {id} = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [discountPercentage, setDiscountPercentage] = useState("")
    const [rating, setRating] = useState("")
    const [stock, setStock] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        if(id){
            async function fetchData(){
                try {
                    const token = localStorage.getItem("access_token")
                    const { data : product } = await axios({
                        method : "GET",
                        url : `http://localhost:3000/products/${id}`,
                        headers : {
                            "Authorization" : `Bearer ${token}`
                        }
                    })
                    console.log(product);
                    setTitle(product.title)
                    setDescription(product.description)
                    setPrice(product.price)
                    setDiscountPercentage(product.discountPercentage)
                    setRating(product.rating)
                    setStock(product.stock)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setThumbnail(product.thumbnail)
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData()
        }
    }, [])

    async function handleSubmit(e){
        e.preventDefault()
        try {
            const token = `Bearer ${localStorage.getItem("access_token")}`
            const requestBody = { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }
            let response = ""
            if(!id){
                response = await axios.post("http://localhost:3000/products", requestBody, {
                    headers : {
                        "Authorization" : token
                    }
                })
            }else {
                response = await axios.put(`http://localhost:3000/products/${id}`, requestBody, {
                    headers : {
                        "Authorization" : token
                    }
                })
            }
            console.log(response);
            navigate('/product-list')
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: `Error ${error.response.status}`,
                text: error.response.data.message,
            });
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{(id) ? "Update product" : "Add product"}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Product name</label>
                        <div className="mt-2">
                            <input onChange={e => {setTitle(e.target.value)}}  value={title} id="title" name="title" type="text" autoComplete="title" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Product description</label>
                        <div className="mt-2">
                            <input onChange={e => {setDescription(e.target.value)}} value={description} id="description" name="description" type="text" autoComplete="description" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Product price</label>
                        <div className="mt-2">
                            <input onChange={e => {setPrice(e.target.value)}} value={price} id="price" name="price" type="number" autoComplete="price" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">Product discount</label>
                        <div className="mt-2">
                            <input onChange={e => {setDiscountPercentage(e.target.value)}} value={discountPercentage} id="discountPercentage" name="discountPercentage" type="number" autoComplete="discountPercentage" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">Product discount</label>
                        <div className="mt-2">
                            <input onChange={e => {setRating(e.target.value)}} value={rating} id="rating" name="rating" type="number" autoComplete="rating" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">Product discount</label>
                        <div className="mt-2">
                            <input onChange={e => {setStock(e.target.value)}} value={stock} id="stock" name="stock" type="number" autoComplete="stock" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">Product discount</label>
                        <div className="mt-2">
                            <input onChange={e => {setBrand(e.target.value)}} value={brand} id="brand" name="brand" type="text" autoComplete="brand" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Product discount</label>
                        <div className="mt-2">
                            <input onChange={e => {setCategory(e.target.value)}} value={category} id="category" name="category" type="text" autoComplete="category" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">Product discount</label>
                        <div className="mt-2">
                            <input onChange={e => {setThumbnail(e.target.value)}} value={thumbnail} id="thumbnail" name="thumbnail" type="text" autoComplete="thumbnail" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium leading-6 text-gray-900">imageUrl address</label>
                        <div className="mt-2">
                            <input onChange={e => {setImageUrl(e.target.value)}} id="imageUrl" name="imageUrl" type="file" autoComplete="imageUrl" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

            

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{(id) ? "Update" : "Add"}</button>
                    </div>
                    <div>
                        <Link to={"/product-list"} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}