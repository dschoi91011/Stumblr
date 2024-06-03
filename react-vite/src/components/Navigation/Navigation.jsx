// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
// import "./Navigation.css";

// function Navigation() {
//   return (
//     <ul>
//       <li>
//         <NavLink id='stumblr-title' to="/">stumblr</NavLink>
//       </li>

//       <li>
//         <ProfileButton className='prof-btn'/>
//       </li>
//     </ul>
//   );
// }

// export default Navigation;

import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div id='nav-bar'>
        <NavLink id='stumblr-title' to="/">stumblr</NavLink>
        <ProfileButton className='prof-btn'/>
    </div>
  );
}

export default Navigation;
