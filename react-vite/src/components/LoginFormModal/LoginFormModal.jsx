import {useState} from "react";
import {thunkLogin} from "../../redux/session";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const {closeModal} = useModal();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors({});

    const formErrors = {};

    if(!email) formErrors.email = "No email provided";
    if(!password) formErrors.password = "No password provided";

    if(Object.keys(formErrors).length){
      setErrors(formErrors);
      return;
    }

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if(serverResponse){
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoUser = async(e) => {
    e.preventDefault();
    const demoLogin = await dispatch(
      thunkLogin({
        email: "demouser@email.com",
        password: "password1"
      })
    );

    if(demoLogin){
      setErrors(demoLogin);
    } else {
      closeModal();
    }
  };

  return(
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-items">

          <div className="login-email">
            <label>
              Email:
              <input type="text" style={{width: '185px'}} value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <div className="login-error">
              {errors.email && <p>{errors.email}</p>}
            </div>
          </div>

          <div className="login-password">
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <div className="login-error">
              {errors.password && <p>{errors.password}</p>}
            </div>
          </div>
          
        </div>

        <div className="login-error">
          {errors.server && <p>{errors.server}</p>}
        </div>

        <div className="login-btn-container">
          <button type="submit" style={{height: '30px', width: '130px', borderRadius: '10px', cursor: 'pointer'}}>Log In</button>
          <button style={{height: '30px', width: '130px', borderRadius: '10px', cursor: 'pointer'}} onClick={demoUser}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;