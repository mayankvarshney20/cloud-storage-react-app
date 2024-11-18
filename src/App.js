import React, { useState } from 'react';
import { auth } from './firebase';
import FileUpload from './FileUpload'; // Ensure this is correct
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Handle user signup
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User signed up successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle user login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsUserLoggedIn(true);
      alert('User logged in successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Drop your files here 👇</h1>

        {!isUserLoggedIn ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={handleLogin}>Log In</button>
          </>
        ) : (
          <>
            <p>Welcome, you're logged in!</p>
            {/* File upload component */}
            <FileUpload />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
