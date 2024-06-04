import {NavLink} from "react-router-dom";
import ProfileButton from "./ProfileButton";
import {useSelector} from "react-redux";
import OpenModalButton from "../OpenModalButton";
import NewPostType from "../NewPostType";
import "./Navigation.css";


function Navigation(){
  const currentUser = useSelector(state => state.session.user);

  return(
    <div id='nav-bar'>
      <div className='nav-upper'>
        <NavLink id='stumblr-title' to='/'>stumblr</NavLink>
        <ProfileButton className='prof-btn'/>
      </div>
        {
            currentUser &&
            (<OpenModalButton className='new-post-type' buttonText='Create Post' modalComponent={<NewPostType/>}/>)
        }
    </div>
  );
}

export default Navigation;
