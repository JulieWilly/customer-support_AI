"use client";
import React, { useState } from "react";
import "./auth.css";
import { auth, firestore } from "@/config";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "@firebase/firestore";
import Link from "next/link";
const Login = () => {
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailInput;
    const password = passwordInput;
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
          // save other user details.
          if (user) {
            setDoc(doc(firestore, "Users", user.uid), {
              email: user.email,
              userName: userName,
              phone: phone,
            }).catch((error) => console.log(error));
          }
          toast.success("Account created successfully.", {
            position: "top-center",
          });
          router.push("/");
        })
        .catch((error) => {
          toast.warning(error.message, {
            position: "bottom-center",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signUpSect">
      <h1>HeadStarter Mental Care Support</h1>
      <h2>Healthy life with a healthy mind.</h2>
      <p>Create your account</p>
      <div className="sign_up">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="User name"
          />
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Phone number"
          />
          <input
            type="number"
            value={passwordInput}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button>Sign up</button>

          <p>
            Already have an account?
            <i>
              <span>
                <Link href={"/"}> Sign in</Link>
              </span>
            </i>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
