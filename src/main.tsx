import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@fontsource/inter";
import "@fontsource/inter/700.css";
import "@fontsource/source-serif-pro"
import "@fontsource/source-serif-pro/900.css"
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import 'react-tooltip/dist/react-tooltip.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,
)
