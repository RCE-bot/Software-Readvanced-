import { createRoot } from "react-dom/client"; //import react
import App from "./App.tsx"; //import the react app
import "./index.css"; // import style


// render to index.html
createRoot(document.getElementById("root")!).render(<App />);
  