/*
index.tsx is:
- the entry point to this pwa
- exports code to index.html to render dynamic content instead of static
more information about react app structure:
https://medium.com/@mazeenacader/demystifying-the-file-structure-of-a-react-app-a-beginners-guide-to-what-goes-where-523d67518a3d
 */
import React from 'react';
import { createRoot } from "react-dom/client"; //import react
import App from "./App"; //import the react app
import "./index.css";
import LoginForm from "./components/routes/Login/LoginForm";
// render to index.html
let user;

user = true;


if (!user) createRoot(document.getElementById("root")!).render(
        <LoginForm />,

);
else createRoot(document.getElementById("root")!).render(
    <App />,
);
