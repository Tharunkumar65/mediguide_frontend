import React from 'react'
import Img from '../assets/hero-img1.png'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import './Home.css'


const Home = () => {


  return (
    <div className="home-container">
      {/* Background Patterns */}
      <Navbar />
      {/* <img src={bg} alt="" className="bg-pattern" /> */}
      

      {/* Main Content */}
      <div className="content-wrapper">
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-text">
              <h2>“MediGuide” – a all new digital way of next level first-aid for everyone</h2>
              <p>
                Our platform leverages cutting-edge technology to provide you with accurate and
                timely medical guidance, right from the comfort of your own home.
              </p>
              <div className="hero-buttons">
                <Link to="/Predict" className="predictor-btn">Predictor</Link>
                <Link to="/Hiw" className="how-it-works-link">How it Work</Link>
              </div>
            </div>
            <div className="hero-image-container">
              <img src={Img} alt="Hero" className="hero-image" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
