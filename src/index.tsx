import ReactDOM from "react-dom/client"
import Provider from "./Provider"
import Router from "./Router"
import Container from "./Container"
import "./styles/styles.css"
import Nav from "./components/navbar"
import Footer from "./components/footer"
import { BrowserRouter } from 'react-router-dom';
import MainApp from './main';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <BrowserRouter>
      <Nav />
      <MainApp></MainApp>
      <Footer />
    </BrowserRouter>
  </Provider>
)