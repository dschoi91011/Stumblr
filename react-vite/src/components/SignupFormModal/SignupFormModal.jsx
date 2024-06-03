import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field",
      });
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    if(profilePic) formData.append("profile_pic", profilePic);

    const serverResponse = await dispatch(thunkSignup(formData));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const updateProfilePic = (e) => {
    const file = e.target.files[0];
    if(file) setProfilePic(file);
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        
        <label>
          First Name
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
        </label>
        {errors.first_name && <p>{errors.first_name}</p>}

        <label>
          Last Name
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
        </label>
        {errors.last_name && <p>{errors.last_name}</p>}

        <label>
          Email
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>
        {errors.email && <p>{errors.email}</p>}

        <label>
          Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </label>
        {errors.username && <p>{errors.username}</p>}

        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        {errors.password && <p>{errors.password}</p>}

        <label>
          Confirm Password
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <label>
          Profile Picture
          <input type="file" onChange={updateProfilePic} />
        </label>

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
