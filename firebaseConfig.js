// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDRse6UVu8Ki6BVw86RbdcwXEbL5muJehk",
  authDomain: "tccapp-64309.firebaseapp.com",
  projectId: "tccapp-64309",
  storageBucket: "tccapp-64309.appspot.com",
  messagingSenderId: "832883484186",
  appId: "1:832883484186:web:ca8b02af43e591c3a413a3",
  measurementId: "G-JY220DLYBF"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exporta o serviço de autenticação
export const auth = getAuth(app);
