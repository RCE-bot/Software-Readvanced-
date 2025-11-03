/*
main.tsx is:
- the entry point to this pwa
- exports code to index.html to render dynamic content instead of static
more information about react app structure:
https://medium.com/@mazeenacader/demystifying-the-file-structure-of-a-react-app-a-beginners-guide-to-what-goes-where-523d67518a3d
 */
import { createRoot } from "react-dom/client"; //import react
import App from "./App"; //import the react app
import "./index.css"; // import tailwind / global css
//@ts-ignore
import { registerSW } from 'virtual:pwa-register'; //import pwa register

// allow service worker for pwa
registerSW({
    immediate: true
});

// render to index.html
createRoot(document.getElementById("root")!).render
(
    <App />
);

