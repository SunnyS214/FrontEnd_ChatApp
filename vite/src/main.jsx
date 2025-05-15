import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthCont from './contextApi/AuthCont.jsx'


createRoot(document.getElementById('root')).render(

<AuthCont>

       <App />
   </AuthCont>
   
)
