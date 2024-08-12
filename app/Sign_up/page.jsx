'use client'
import React, { useState} from 'react';
import './auth.css'
import auth from '@/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Login = () => {
  const [emailInput, setEmail] = useState('')
  const [passwordInput, setPassword] = useState()
  const router = useRouter()

  
    const handleSignUp = async(e) => {
      e.preventDefault()
      const email = emailInput;
      const password = passwordInput
     try {
       await createUserWithEmailAndPassword(
         auth,
         email,
         password
       ).then((userCredential) => {
        const user = userCredential.user
        const email = user.email;
        console.log('user - ', userCredential)
        console.log('email', email)

      })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log(errorCode);
         console.log(errorMessage);
       });
router.push("/Sign_in");
     } catch (error) {
       console.log(error);
     } 
    }


    return (
      <div className="signUpSect">
        <h1>HeadStarter Mental Care Support</h1>
        <h2>Healthy life with a healthy mind.</h2>
        <p>Create your account</p>
        <div className="sign_up">
          <form>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
            <input
              type="number"
              value={passwordInput}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Phone number"
            />

            <button type="button" onClick={handleSignUp}>
              Sign up
            </button>
            <p>Already have an account? Sing in</p>
          </form>
        </div>
      </div>
    );
}

export default Login;