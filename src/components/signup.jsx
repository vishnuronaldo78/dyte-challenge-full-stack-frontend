import React from "react";
import { toast } from "react-toastify";

const SignUp = (props) => {
  const register = (credentials) => {
    return fetch("http://localhost:5000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
    if (!name || !email || !username || !password || !confirmPassword) {
      toast("All fields are mandatory");
    } else if (password !== confirmPassword) {
      toast("Password and Confirm Password doesn't match");
    } else {
      register({
        name,
        email,
        username,
        password,
      })
        .then((data) => {
          toast(data);
          props.history.push("/login");
        })
        .catch((err) => {
          toast(JSON.stringify(err));
        });
    }
  };

  return (
    <div className="wrapper">
      <div className="internal-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Name</p>
            <input type="text" name={"name"} />
          </label>
          <label>
            <p>Email</p>
            <input type="email" name={"email"} />
          </label>
          <label>
            <p>Username</p>
            <input type="username" name={"username"} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" name={"password"} />
          </label>
          <label>
            <p>Confirm Password</p>
            <input type="password" name={"confirmPassword"} />
          </label>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
