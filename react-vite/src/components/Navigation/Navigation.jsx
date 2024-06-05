import {NavLink, useNavigate} from "react-router-dom";
import ProfileButton from "./ProfileButton";
import {useSelector} from "react-redux";
import OpenModalButton from "../OpenModalButton";
import NewPostType from "../NewPostType";
import "./Navigation.css";

function Navigation(){
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.session.user);

  const navHomeClick = () => {
    navigate('/')
  }

  return(
    <div id='nav-bar'>
      <div className='nav-upper'>
        <NavLink id='stumblr-title' to='/'>stumblr</NavLink>

        <div className='nav-upper-btn-cluster'>
          <ProfileButton className='prof-btn'/>
          <button className='nav-home-btn' style={{width: '97px'}} onClick={navHomeClick}>
            <img style={{height: '35px', width: '35px'}} src='/home_icon.png' alt='profile'/>
            <span style={{fontSize: '15px'}}>Home</span>
          </button>
        </div>
      </div>
        {
            currentUser &&
            <div className='create-post-btn-container'>
            (<OpenModalButton className='new-post-type' buttonText='Create Post' modalComponent={<NewPostType/>}/>)
            </div>
        }
    </div>
  );
}

export default Navigation;
