import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="branding">
                    <h1>MediGuide</h1>
                </div>

                <hr />

                <ul className="footer-links">
                    <li><a href="/hiw">About</a></li>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Privacy policy</a></li>
                    <li><a href="#">Terms of use</a></li>
                </ul>

                <hr />

                <p className="copyright">
                    Copyright © MedSP | All rights reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
