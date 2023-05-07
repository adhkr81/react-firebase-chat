
import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {useDeviceLanguage as UseDL} from "firebase/app"
import { auth, app } from './firebase';
import Channel from './components/Channel';
// import { useDeviceLanguage as UseDL } from 'firebase/auth';

function App() {

  const [user, setUser] = useState(() => auth.currentUser)
  const [initializing, setInitializing] = useState(true);

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new GoogleAuthProvider();
    // Set language to the default browser preference
    // UseDL();
    // Start sign in process
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOff = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
  
    // Cleanup subscription
    return unsubscribe;
  }, [initializing]);

  return (
    <div className="App">
      {
        user ? (
          <>
            <Button onClick={signOff}>Sign out</Button>
            <Channel user={user}/>
            <p>Welcome to the chat!</p>
          </>
        ) : <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      }

    </div>
  );
}

export default App;
