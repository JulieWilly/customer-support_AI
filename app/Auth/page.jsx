'use client'
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import './auth.css'

const login = () => {
    const [details, setDetails] = useState()
    const handleSignUp = () => {

    }
    return (
      <div>
        <div className="sign_up">
          <input type="text " placeholder="Email address" />
          <input type="number " placeholder='Phone number' />

          <button>Sign up</button>
          <p>Sing in</p>
          
        </div>
      </div>
    );
}

export default login;