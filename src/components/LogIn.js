import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SessionContext from '../contexts/sessionContext';

function LogIn() {
  const navigate = useNavigate();
  const { setSession } = useContext(SessionContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    }

    let { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const usersString = await localStorage.getItem('user');
    // console.log(usersString, 'user');
    const users = usersString ? JSON.parse(usersString) : [];

    const foundUser = users.find((user) => {
      return user.email === userDetails.email;
    });

    // console.log(foundUser, 'foundUser', users, userDetails);
    if (!foundUser) {
      setErrorMessage("Your account doesn't exist");
      return;
    }

    if (foundUser.password !== userDetails.password) {
      setErrorMessage('Please check your credentials');
      return;
    }

    setSession({
      hasSession: true,
      username: foundUser.email,
    });

    navigate('/');
  };

  return (
    <>
      <section>
        <form className="form-control signin" onSubmit={onSubmit}>
          <h2>Login</h2>
          <p>Need an account ?</p>
          <Link to="/signup">
            {' '}
            <button type="button" className="login-btn green">
              Sign Up
            </button>
          </Link>
          {errorMessage ? <p>{errorMessage}</p> : null}
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            value={userDetails.email}
          />

          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            value={userDetails.password}
          />

          <div>
            <button className="login-btn" type="submit">
              LogIn
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default LogIn;
