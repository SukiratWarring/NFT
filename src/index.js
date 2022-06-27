import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import MINT from './MINT';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import PrivateRoutes from './PrivateRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
const serverUrl = "https://ngip98jujd94.usemoralis.com:2053/server";
const appId = "MRqxEl9hmtliTwkUqO3uwv1GgJlqFCtakLhQAEIM";

root.render(
  <React.StrictMode>
    <ChakraProvider >
      <MoralisProvider appId={appId} serverUrl={serverUrl}>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes/>}>
            <Route path="/Mint" element={<MINT />} />
            </Route>
            <Route path="/" element={<App />} />
          </Routes>
        </Router>
      </MoralisProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

