'use client'
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import './auth.css'
import auth from '@/config';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup } from 'firebase/auth';

const login = () => {
    const [details, setDetails] = useState()
    const handleSignUp = () => {
    singInWithGoogle;
    }

  // sing in with google.
  const singInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    console.log(result)
  }
    return (
      <div className="signUpSect">
        <h1>HeadStarter Mental Care Support</h1>
        <h2>Healthy life with a healthy mind.</h2>
        <p>Create your account</p>
        <div className="sign_up">
          <form action="">
            <input type="text " placeholder="Email address" />
            <input type="number " placeholder="Phone number" />

            <button>Sign up</button>
            <p>
              Already have an account? Sign in
            </p>
          </form>
        </div>
      </div>
    );
}

export default login;