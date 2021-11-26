import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Login = (props) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if(user) {
      props.history.push("/url")
    }
  }, [])

  const loginUser = (credentials) => {
    return fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      username,
      password,
    }).then((data) => {
      if (!data.token) {
        toast(data);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data._doc && data._doc.username)
        props.history.push("/url")
      }
    });
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="wrapper">
      <div className="internal-container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input
              type="text"
              onChange={handleUsernameChange}
              value={username}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
            />
          </label>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <p>Don't have an account? <a href="/signup">Create here</a></p>
      </div>
    </div>
  );
};

export default Login;
