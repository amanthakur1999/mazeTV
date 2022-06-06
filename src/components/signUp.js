import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState({
    username: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersString = await localStorage.getItem('user');
    const users = usersString ? JSON.parse(usersString) : [];

    const alreadyExist = users.find((user) => {
      return user.email === userDetails.email;
    });

    if (alreadyExist) {
      setErrorMessage('This user already Exist');
      return;
    }

    users.push(userDetails);

    await localStorage.setItem('user', JSON.stringify(users));

    navigate('/login');
  };

  return (
    <>
      <section>
        <form className="form-control signin" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <p>Have an account?</p>
          <Link to="/login">
            <button className="login-btn">Log In</button>
          </Link>
          {errorMessage ? <p>{errorMessage}</p> : null}
          <input
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Username"
            value={userDetails.username}
          />

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
            <button className="login-btn green" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default SignUp;
