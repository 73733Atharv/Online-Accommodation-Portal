import { Link } from "react-router-dom"
import { Routes,Route } from "react-router-dom";
import Home from "./Home";
const Navigation = () =>
{
    return(
    <div id="Homepage">
   <div id="nav">
   <Link to="/" class="navbar" >Home</Link>
<Link to="/about" class="navbar">About</Link>
<Link to="/contact" class="navbar">Contact</Link>
</div>   
    </div>
    );
}
export default Navigation;