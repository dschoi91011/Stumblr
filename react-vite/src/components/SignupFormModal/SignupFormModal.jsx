// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { thunkSignup } from "../../redux/session";
// import "./SignupForm.css";

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   const { closeModal } = useModal();
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [profilePic, setProfilePic] = useState(null);
//   const [inputErrors, setInputErrors] = useState({});

//   const hasErrors = () => {
//     let errors = {};
//     if (!firstName) errors.firstName = "First Name is required";
//     if (!lastName) errors.lastName = "Last Name is required";
//     if (!email) errors.email = "Email is required";
//     if (!username) errors.username = "Username is required";
//     if (!password) errors.password = "Password is required";
//     if (password !== confirmPassword)
//       errors.confirmPassword = "Passwords do not match";
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = hasErrors();
//     setInputErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       const formData = new FormData();
//       formData.append("first_name", firstName);
//       formData.append("last_name", lastName);
//       formData.append("email", email);
//       formData.append("username", username);
//       formData.append("password", password);
//       if (profilePic) {
//         formData.append("profile_pic", profilePic);
//       }

//       const response = await dispatch(thunkSignup(formData));

//       if (response.errors) {
//         setInputErrors(response.errors);
//       } else {
//         closeModal();
//       }
//     }
//   };

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePic(file);
//   };

//   return (
//     <>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           First Name
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//           {inputErrors.firstName && <p>{inputErrors.firstName}</p>}
//         </label>

//         <label>
//           Last Name
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//           {inputErrors.lastName && <p>{inputErrors.lastName}</p>}
//         </label>

//         <label>
//           Email
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           {inputErrors.email && <p>{inputErrors.email}</p>}
//         </label>

//         <label>
//           Username
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           {inputErrors.username && <p>{inputErrors.username}</p>}
//         </label>

//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {inputErrors.password && <p>{inputErrors.password}</p>}
//         </label>

//         <label>
//           Confirm Password
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//           {inputErrors.confirmPassword && (
//             <p>{inputErrors.confirmPassword}</p>
//           )}
//         </label>

//         <label>
//           Profile Picture (optional)
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleProfilePicChange}
//           />
//         </label>

//         <button type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }

// export default SignupFormModal;



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
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        
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

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;