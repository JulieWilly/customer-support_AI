import React from 'react';
import '../Sign_up/auth.css'

const page = () => {
    return (
      <div className="signUpSect">
        <h1>HeadStarter Mental Care Support</h1>
        <h3>Welcome back !!!</h3>
        <p>Sign in to proceed.</p>
        <div className="sign_up">
          <form action="">
            <input type="text " placeholder="Email address" />
            <input type="number " placeholder="Phone number" />

            <button>Sign up</button>
            <p>Already have an account? Sign in</p>
          </form>
        </div>
      </div>
    );
}



export default page;