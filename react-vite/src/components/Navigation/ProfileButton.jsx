import {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {thunkLogout} from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton(){
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if(!showMenu) return;

    const closeMenu = (e) => {
      if(ulRef.current && !ulRef.current.contains(e.target)){
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return(
    <>
      <button className='profile-menu-btn' style={{height: '30px', width: '130px', borderRadius: '10px', cursor: 'pointer'}} onClick={toggleMenu}>
        <img style={{height: '25px', width: '25px'}} src='/profile_icon.png' alt='profile'/>
        <span style={{fontSize: '15px'}}>Profile</span>
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className="profile-info">
              <div style={{fontSize: '20px', color: 'white'}}>{user.username}</div>
              <div>
                <button className='logout-btn' style={{height: '30px', width: '130px', borderRadius: '10px', cursor: 'pointer'}} onClick={logout}>Log Out</button>
              </div>
            </div>
          ) : (
            <div className='init-prof-btns' style={{marginLeft: '30px'}}>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal/>}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal/>}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
