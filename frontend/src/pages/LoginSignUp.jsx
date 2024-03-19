import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setformData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const formDataHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login");
    console.log(formData);
    let responseData;
    await fetch("https://good-erin-gosling-wig.cyclic.app/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };

  const signUp = async () => {
    console.log("signup");
    console.log(formData);
    let responseData;
    await fetch("https://good-erin-gosling-wig.cyclic.app/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              placeholder="Name"
              name="username"
              onChange={formDataHandler}
              value={formData.username}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={formDataHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={formDataHandler}
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signUp();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
