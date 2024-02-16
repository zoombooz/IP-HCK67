import { Link, useNavigate } from "react-router-dom"

function NavbarComponent(){

    const navigate = useNavigate()

    async function handleLogout(){
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    return (
        <div className="flex justify-between items-center bg-indigo-600 py-3 px-5 shadow-xl mb-5">
            <h1 className="text-xl text-white font-bold">HacktivMerchant</h1>
            <div className="flex gap-5">
                <Link to={'/'} className="text-white hover:bg-indigo-800 hover:text-white px-3 py-1 rounded-md transition duration-300 ease-in-out">Home</Link>
                <Link to={'/about'} className="text-white hover:bg-indigo-800 hover:text-white px-3 py-1 rounded-md transition duration-300 ease-in-out">About Us</Link>
                <Link to={'/cart'} className="text-white hover:bg-indigo-800 hover:text-white px-3 py-1 rounded-md transition duration-300 ease-in-out">My Cart</Link>
            </div>
            <div>
                <button onClick={handleLogout} className="bg-indigo-800 text-white px-3 py-1 rounded-md hover:bg-purple-700 hover:text-black transition duration-300 ease-in-out">Log Out</button>
            </div>
        </div>
    )

}

export default NavbarComponent