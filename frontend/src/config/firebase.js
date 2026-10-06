import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyC5zXtgFbPLkqo9HTCEQk_qjTQd1U3cGdA',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'gokul-busniess.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'gokul-busniess',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'gokul-busniess.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '750567221137',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:750567221137:web:e2a441b2571c5a44b55c30',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app = null;
let auth = null;
let googleProvider = null;

try {
  // If configured, initialize real Firebase app; otherwise provide placeholder initialization
  if (isFirebaseConfigured) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  }
} catch (err) {
  console.warn('[Firebase Init Warning]:', err.message);
}

export { app, auth, googleProvider };
