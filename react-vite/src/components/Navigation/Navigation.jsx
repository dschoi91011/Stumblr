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
    navigate('/');
  }

  const favoritesClick = () => {
    navigate('favorites');
  }

  return(
    <div id='nav-bar'>
      <div className='nav-upper'>
        <NavLink id='stumblr-title' to='/'>stumblr</NavLink>

        <div className='nav-upper-btn-cluster'>
          <ProfileButton className='prof-btn'/>
          <button className='nav-home-btn' style={{height: '30px', width: '130px', borderRadius: '10px', cursor: 'pointer'}} onClick={navHomeClick}>
            <img style={{height: '25px', width: '25px'}} src='/home_icon.png' alt='profile'/>
            <span style={{fontSize: '15px'}}>Home</span>
          </button>

          {
            currentUser &&
            <button className="nav-liked-btn" style={{height: '30px', width: '130px', borderRadius: '10px', cursor: 'pointer'}} onClick={favoritesClick}>
              <img style={{height: '25px', width: '25px'}} src="/fav_icon.png" alt="fav"/>
              <span style={{fontSize: '15px'}}>Liked</span>
            </button>
          }

          {
            currentUser &&
            <button className="nav-follow-btn" style={{height: '30px', width: '130px', borderRadius: '10px', cursor: 'pointer'}} onClick={navHomeClick}>
              <img style={{height: '25px', width: '25px'}} src="/follow_icon.png" alt="fav"/>
              <span style={{fontSize: '15px'}}>Follow</span>
            </button>
          }
        
        </div>
      </div>
      {
        currentUser &&
        (<OpenModalButton className='new-post-type' buttonText='Create Post' modalComponent={<NewPostType/>}/>)
      }
    </div>
  );
}

export default Navigation;