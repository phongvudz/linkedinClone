import React, { useRef, useState } from "react";
import "./Login.css";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const dispatch = useDispatch();

  const register = () => {
    if (!name && !profilePic) {
      return alert("Please enter a full name and photoUrl");
    }

    auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
      userAuth.user
        .updateProfile({
          displayName: name,
          photoURL: profilePic,
        })
        .then(() => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: name,
              photoURL: profilePic,
            })
          );
        })
        .catch((error) => alert(error));
    });
  };
  const loginToApp = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((userAuth) => {
      userAuth.user({});
    });
  };

  return (
    <div className="login">
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="fullName (required if registering)"
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          type="text"
          placeholder="Profile pic URL (optional)"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit" onClick={loginToApp} className="">
          Sign In
        </button>
      </form>
      <p>
        {" "}
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
};

export default Login;
