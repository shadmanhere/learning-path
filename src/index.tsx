import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import ReactGA from 'react-ga4'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.css'
import 'tw-elements'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!
const root = createRoot(container)

declare const process: {
  env: {
    REACT_APP_GOOGLE_ANALYTICS_ID: string
  }
}

if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
