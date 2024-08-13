'use client'

import React, { useState } from 'react';
import './Sign_up/auth.css'
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaGripLines } from "react-icons/fa";
import {auth, firestore} from '@/config';
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
const Page = () => {
  const router = useRouter()

  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState()


  // navigate to sign up

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const email = emailInput;
    const password = passwordInput;


    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

      });
      toast.success('Signed in successfully.', {position:'top-center'})

    router.push("/customer_support  ");
  } catch (error) {
      toast.warning(error.message, { position: "top-center" });

  }
};

const signInWithGoogle = async () => {
    try{
        const provider = new GoogleAuthProvider();
        const result = signInWithPopup(auth, provider)

       router.push("/customer_support  ");

    } catch(error) {
        console.log(error)
    }
}

const signInWithFacebook= async () => {
  try {
    const provider = new FacebookAuthProvider();
    const result = signInWithPopup(auth, provider);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const signInWithTwitter = async () => {
  try {
    const provider = new TwitterAuthProvider();
    const result = signInWithPopup(auth, provider);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const signInWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    const result = signInWithPopup(auth, provider);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
    return (
      <div className="signUpSect">
        <h1>HeadStarter Mental Care Support</h1>
        <h3>Welcome back !!!</h3>
        <p>Sign in to proceed.</p>
        <div className="sign_up">
          <form onSubmit={handleSubmit}>
            <input
            required
              type="email"
              value={emailInput}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />

            <input
            required
              type="number"
              value={passwordInput}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <p className="forgotPassword">Forgot Password?</p>

            <button>Sign in </button>

            <p className="toAccounts">
              Dont have an account ?
              <i>
                <span>
                  {" "}
                  <Link href={"/Sign_up"}>Create new account</Link>
                </span>
              </i>
            </p>
            <div className="lines">
              {<FaGripLines className="length" />} Or{" "}
              {<FaGripLines className="length" />}
            </div>
            <p>Sign in with</p>
            <div className="socials">
              <div className="account" onClick={signInWithGoogle}>
                {<FaGoogle />} Google
              </div>
              <div className="account" onClick={signInWithFacebook}>
                {<FaFacebookF />} Facebook
              </div>
              <div className="account" onClick={signInWithTwitter}>
                {<FaXTwitter />} Twitter
              </div>
              <div className="account" onClick={signInWithGithub}>
                {<FaGithub />} Github
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}



export default Page;