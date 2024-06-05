import {useState} from "react";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import {thunkSignup} from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newErrors = {};

    if(!firstName || !lastName || !email || !username || !password || !confirmPassword) newErrors.fields = "All text fields must be completed.";
    if(password && password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Confirm Password field must be the same as the Password field.";
    if(email && !email.includes('@')) newErrors.email = "Not a valid email address.";

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
    if(file) setProfilePic(file);
  };

  return(
    <div className="signup-container">
      <h1>Sign Up</h1>
      {errors.server && <p className="error">{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form">

        <label>
          First Name
          <input type="text" style={{width: '330px'}} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          {errors.first_name && <p className="error">{errors.first_name}</p>}
          {errors.fields && !firstName && <p className="error">{errors.fields}</p>}
        </label>

        <label>
          Last Name
          <input type="text" style={{width: '333px'}} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          {errors.last_name && <p className="error">{errors.last_name}</p>}
          {errors.fields && !lastName && <p className="error">{errors.fields}</p>}
        </label>

        <label>
          Email
          <input type="text" style={{width: '365px'}} value={email} onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && <p className="error">{errors.email}</p>}
          {errors.fields && !email && <p className="error">{errors.fields}</p>}
        </label>

        <label>
          Username
          <input type="text" style={{width: '339px'}} value={username} onChange={(e) => setUsername(e.target.value)}/>
          {errors.username && <p className="error">{errors.username}</p>}
          {errors.fields && !username && <p className="error">{errors.fields}</p>}
        </label>

        <label>
          Password
          <input type="password" style={{width: '342px'}} value={password} onChange={(e) => setPassword(e.target.value)}/>
          {errors.password && <p className="error">{errors.password}</p>}
          {errors.fields && !password && <p className="error">{errors.fields}</p>}
        </label>

        <label>
          Confirm Password
          <input type="password" style={{width: '284px'}} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          {errors.fields && !confirmPassword && <p className="error">{errors.fields}</p>}
        </label>

        <label>
          Profile Picture (optional)
          <input type="file" onChange={updateProfilePic}/>
        </label>

        <div className="signup-btn-container">
          <button style={{height: '30px', width: '130px', borderRadius: '10px', cursor: 'pointer'}} type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;