'use client'
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import './auth.css'
import Link from 'next/link';

const login = () => {
    const [details, setDetails] = useState()
    const handleSignUp = () => {

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