import { Link, useNavigate } from "react-router-dom"

function NavbarComponent(){

    const navigate = useNavigate()

    async function handleLogout(){
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    return (
        <div className="flex justify-between bg-indigo-600 py-3 px-5 shadow-xl mb-5">
            <h1 className="text-xl">HacktivMerchant</h1>
            <div className="flex gap-5">
                <Link to={'/'} className="hover:bg-indigo-800 hover:text-white px-3 py-1 rounded-md">Home</Link>
                <Link to={'/product'} className="hover:bg-indigo-800 hover:text-white px-3 py-1 rounded-md">Our Products</Link>
                <Link to={'/about'} className="hover:bg-indigo-800 hover:text-white px-3 py-1 rounded-md">About Us</Link>
                <Link to={'/cart'} className="hover:bg-indigo-800 hover:text-white px-3 py-1 rounded-md">My Cart</Link>
            </div>
            <div>
                <button onClick={handleLogout} className="bg-indigo-800 text-white px-3 py-1 rounded-md hover:bg-indigo-600 hover:text-black">Log Out</button>
            </div>
        </div>
    )

}

export default NavbarComponent