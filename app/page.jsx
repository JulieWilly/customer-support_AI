"use client";

import React, { useState } from "react";
import "./Sign_up/auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaGripLines } from "react-icons/fa";
import { auth, firestore } from "@/config";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getDoc, setDoc, doc } from "@firebase/firestore";
const Page = () => {
  const router = useRouter();

  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState();
  const [error, setError] = useState(false);

  // navigate to sign up

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = emailInput;
      const password = passwordInput;
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          if (user) {
            toast("User logged in.");
            router.push("/customer_support  ");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          switch (errorCode) {
            case "auth/invalid-credential":
              toast.warning("Invalid sign in credentials.", {
                position: "bottom-center",
              });
              setError("An error has occured, please try again later.");

              break;
            case "auth/user-not-found":
              toast.warning("No user found with this email address");
              setError("Invalid email or password.");
              break;
            case "auth/wrong-password":
              toast.warning("Incorrect password.");
              setError("Wrong password.");
              break;
            default:
              toast.error("Unknown error has occurred.", errorMessage);
          }
        });
    } catch (error) {
      toast(error.message, { position: "top-center" });
      setError(error);
    }
  };

  const signInWithProvider = async (provider) => {
     signInWithPopup(auth, provider).then(async (result) => {
       const user = result.user;
       console.log("user", user);

       // store user details to firestore
       // check if the user already exists.
       const userDocRef = doc(firestore, "Users", user.uid);
       const userDoc = await getDoc(userDocRef);

       if (!userDoc.exists()) {
         const createNewUser = {
           email: user.email,
           userName: user.displayName,
           phone: user.phoneNumber,
         };
         await setDoc(userDocRef, createNewUser);
       }
       if (user.accessToken !== null) {
         toast.success("Sign in successful");
         router.push("/customer_support");
       } else {
         toast.warning("Sign in unsuccessful");
       }
     });
  }
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
       provider.setCustomParameters({
         prompt: "select_account", // Force the account selection prompt
       });
       signInWithProvider(provider)
    } catch (error) {
      setError(error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      })

    signInWithProvider(provider)
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithTwitter = async () => {
    try {
      const provider = new TwitterAuthProvider();
        provider.setCustomParameters({
          prompt: "select_account",
        });
      signInWithProvider(provider)
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
          provider.setCustomParameters({
            prompt: "select_account",
          });

          signInWithProvider(provider)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signUpSect">
      <h1>HeadStarter Mental Care Support</h1>
      <h3>Welcome back !!!   Sign in to proceed.</h3>
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
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Page;
