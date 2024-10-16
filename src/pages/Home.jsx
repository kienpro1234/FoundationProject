import { Link } from "react-router-dom";
// import Header from "../components/Header/Header";
import Modal from "../components/UI/Modal";
import LandingHome from "../components/Home/LandingHome";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <section className="home">
        <LandingHome />
    </section>
  );
}
