'use client'

import React, { useState } from 'react';
import '../Sign_up/auth.css'
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaGripLines } from "react-icons/fa";

const page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const login = () => {

}

    return (
      <div className="signUpSect">
        <h1>HeadStarter Mental Care Support</h1>
        <h3>Welcome back !!!</h3>
        <p>Sign in to proceed.</p>
        <div className="sign_up">
          <form action="">
            <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
            <input type="number" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Phone number" />
            <p className='forgotPassword'>Forgot Password?</p>
            <button onClick={login()}>Sign up</button>
            <div className="lines">
              {<FaGripLines className="length" />} Or{" "}
              {<FaGripLines className="length" />}
            </div>
            <p>Sign in with</p>
            <div className="socials">
              <div className="account">{<FaGoogle />} Google</div>
              <div className="account">{<FaFacebookF />} Facebook</div>
              <div className="account">{<FaXTwitter />} Twitter</div>
              <div className="account">{<FaGithub />} Github</div>
            </div>
          </form>
        </div>
      </div>
    );
}



export default page;