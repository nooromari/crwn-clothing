import React from "react";
import CustomButton from "../custom-button/custom-button.component";

import FormInput from "../form-input/form-input.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";

import "./sign-in.styles.scss";
import { useState } from "react";

const SignIn = () => {

  const [ userCredentials, setUserCredentials] = useState({ email: "", password: "" })
  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUserCredentials({ email: "", password: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserCredentials({...userCredentials, [name]: value });
  };

    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
            label="email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            handleChange={handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit"> Sign In </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              {" "}
              Sign In With Google{" "}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }

export default SignIn;
