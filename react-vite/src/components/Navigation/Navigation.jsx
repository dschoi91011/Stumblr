import {NavLink} from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation(){
  return(
    <div id='nav-bar'>
        <NavLink id='stumblr-title' to="/">stumblr</NavLink>
        <ProfileButton className='prof-btn'/>
    </div>
  );
}

export default Navigation;
