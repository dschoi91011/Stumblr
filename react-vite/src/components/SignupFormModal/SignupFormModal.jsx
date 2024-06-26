import {useState} from "react";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import {thunkSignup} from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal(){
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState('default_profpic.jpg');
  const [errors, setErrors] = useState({});
  const {closeModal} = useModal();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newErrors = {};

    if(!firstName) newErrors.firstName = 'First name is required.';
    if(!lastName) newErrors.lastName = 'Last name is required.';
    if(!email) newErrors.email = 'Email is required.';
    if(!username) newErrors.username = 'Username is required.';
    if(!password) newErrors.password = 'Password is required.';
    if(!confirmPassword) newErrors.confirmPassword = 'Confirm password is required.';

    if(password && password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    if(password !== confirmPassword) newErrors.confirmPassword = 'Confirm password field must be the same as password.';
    if(email && !email.includes('@')) newErrors.email = 'Not a valid email address.';

    if(Object.keys(newErrors).length){
      return setErrors(newErrors);
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    if(profilePic) formData.append("profile_pic", profilePic);

    const serverResponse = await dispatch(thunkSignup(formData));

    if(serverResponse){
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const updateProfilePic = (e) => {
    const file = e.target.files[0];
    if(file){
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if(validTypes.includes(file.type)){
        setProfilePic(file);
        setProfilePicUrl(URL.createObjectURL(file));
        setErrors(prevErrors => ({...prevErrors, profilePic: null}));
      } else {
        setErrors(prevErrors => ({...prevErrors, profilePic: 'File type must be jpg, jpeg, png, or gif'}));
      }
    }
  };

  return(
    <div className="signup-container">
      <h1>Sign Up</h1>
      {errors.server && <p className="error">{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form">

        <label>
          First Name{' '}
          <input type="text" style={{width: '330px'}} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </label>

        <label>
          Last Name{' '}
          <input type="text" style={{width: '333px'}} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </label>

        <label>
          Email{' '}
          <input type="text" style={{width: '365px'}} value={email} onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && <p className="error">{errors.email}</p>}
        </label>

        <label>
          Username{' '}
          <input type="text" style={{width: '339px'}} value={username} onChange={(e) => setUsername(e.target.value)}/>
          {errors.username && <p className="error">{errors.username}</p>}
        </label>

        <label>
          Password{' '}
          <input type="password" style={{width: '342px'}} value={password} onChange={(e) => setPassword(e.target.value)}/>
          {errors.password && <p className="error">{errors.password}</p>}
        </label>

        <label>
          Confirm Password{' '}
          <input type="password" style={{width: '284px'}} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </label>

        <label>
          Profile Picture (optional){' '}
          <input type="file" id="profile-pic" onChange={updateProfilePic} style={{display: 'none'}}/>
          <label htmlFor="profile-pic" className="profile-pic-label">
            <img style={{cursor: 'pointer'}} src={profilePicUrl} alt="Profile Preview" className="profile-pic-preview"/>
          </label>
          {errors.profilePic && <p className="error">{errors.profilePic}</p>}
        </label>

        <div className="signup-btn-container">
          <button className='signup-btn' style={{height: '30px', width: '130px', borderRadius: '10px', cursor: 'pointer'}} type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;