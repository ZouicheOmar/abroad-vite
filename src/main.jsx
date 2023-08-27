/** @format */

import ReactDOM from 'react-dom/client'
import {HashRouter, BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './global.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
)
