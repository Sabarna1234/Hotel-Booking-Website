import { useContext } from "react"
import "./navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useEffect } from "react"

const Navbar = () => {
  const {user} = useContext(AuthContext)

  useEffect(() => {
    console.log("Navbar user:", user); // Log user context
  }, [user]);



  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">Booking.com</span>
        </Link>
        {user ? user.username : (
          <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div> )}
      </div>
    </div>

  )
}

export default Navbar
