import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from "./store/store.ts"
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
    <BrowserRouter>
    <Toaster richColors position='top-right' />
        <App />
    </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)

