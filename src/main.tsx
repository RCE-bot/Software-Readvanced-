
  import { createRoot } from "react-dom/client";
  import App from './App.tsx';
  import "./index.css";

  /* render app on page (export to index.html
  by getting div element called root from index.html
   */
  createRoot(document.getElementById("root")!).render(<App />);
  