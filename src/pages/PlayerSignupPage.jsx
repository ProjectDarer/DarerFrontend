// src/pages/PlayerSignupPage.jsx

import React, { useState, useEffect } from 'react';
import GamingHeader from '../components/GamingHeader';
import { useLocation } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
import '../styles/player_signup.css';
// Import the new custom alert hook
import { useCustomGamingAlert } from '../components/CustomGamingAlert'; 

const PlayerSignupPage = () => {
  const [email, setEmail] = useState('');
  const location = useLocation(); // To track if we came from circle.html

  // 1. Replace mock showAlert with the custom hook
  const { showCustomAlert, AlertComponent } = useCustomGamingAlert(); 

  // Replaces the setMainContentHeight logic from public/javascripts/player_signup.js
  useEffect(() => {
    const setMainContentHeight = () => {
      const header = document.querySelector('.gaming-header');
      const footer = document.querySelector('.gaming-footer');
      const main = document.querySelector('.main-content');

      if (!header || !footer || !main) return;

      const headerH = header.getBoundingClientRect().height;
      const footerH = footer.getBoundingClientRect().height;
      const viewportH = window.innerHeight;
      const target = Math.max(0, viewportH - headerH - footerH);

      main.style.minHeight = target + 'px';
      main.style.maxHeight = target + 'px';

      document.body.style.overflow = (window.innerWidth >= 769) ? 'hidden' : 'auto';
    };

    setMainContentHeight();
    window.addEventListener('resize', setMainContentHeight);
    return () => window.removeEventListener('resize', setMainContentHeight);
  }, []);


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      // 2. Use showCustomAlert (Warning)
      showCustomAlert('⚠️ Email Required', 'Please enter your email address to continue with player signup.', 'warning');
      return;
    }

    if (!isValidEmail(email)) {
      // 2. Use showCustomAlert (Error)
      showCustomAlert('❌ Invalid Email', 'Please enter a valid email address (e.g., user@example.com).', 'error');
      return;
    }

    // Simulate API call logic
    try {
      console.log('Simulating POST to /api/player_signup');

      // Mock API response logic
      const mockResponse = { ok: true, json: async () => ({ exists: false, message: 'Success' }) };
      const responseData = await mockResponse.json();

      if (mockResponse.ok) {
        if (responseData.exists) {
          // 2. Use showCustomAlert (Info)
          showCustomAlert('🎮 Welcome Back!', 'You\'re already registered as a Player. Ready to start streaming and earning?', 'info');
        } else {
          // 2. Use showCustomAlert (Success)
          showCustomAlert('🎉 Signup Successful!', 'Welcome to Darer as a Player! You can now start streaming and getting dared by viewers.', 'success');
        }
      } else {
        // 2. Use showCustomAlert (Error)
        showCustomAlert('❌ Signup Failed', 'Something went wrong during signup. Please check your connection and try again.', 'error');
      }
    } catch (error) {
      // 2. Use showCustomAlert (Error)
      showCustomAlert('🌐 Network Error', 'Unable to connect to the server. Please check your internet connection and try again.', 'error');
    }

    setEmail('');
  };

  return (
    <>
      <div className="bg-animation">
        <div className="bg-particles"></div>
        <div className="bg-grid"></div>
      </div>
      <GamingHeader />
      {/* AudioPlayer is now a component, replacing the inline JS logic */}
      <AudioPlayer audioId="playerMusic" src="/videos/darer_music.mp3" />

      <main className="main-content">
        <div className="signup-container">
          <div className="signup-card">
            <div className="card-header">
              <h2 className="signup-title">JOIN DARER AS A PLAYER</h2>
              <div className="title-glow"></div>
              <p className="signup-subtitle">Stream. Get Dared. Get Paid.</p>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-glow"></div>
              </div>

              <button type="submit" className="signup-btn">
                <span>START PLAYING</span>
                <div className="btn-glow"></div>
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer component reused from LandingPage (styles from player_signup.css) */}
      <footer className="gaming-footer">
        <div className="footer-container">
          <div className="footer-section"><h3>DARER</h3><p>The World's First AI-Powered Live Dare Platform</p></div>
          <div className="footer-section">
            <h4>CONNECT WITH US</h4>
            <div className="social-links">
              <div className="social-link"><a href=""><img src="/videos/social.png" alt="Instagram" width="30" height="30" /></a></div>
              <div className="social-link"><a href=""><img src="/videos/tik-tok.png" alt="TikTok" width="30" height="30" /></a></div>
              <div className="social-link"><a href=""><img src="/videos/twitter.png" alt="Twitter" width="30" height="30" /></a></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><p>&copy; 2025 DARER. All rights reserved</p></div>
      </footer>
      
      {/* 3. Render the Custom Alert Modal */}
      <AlertComponent />
    </>
  );
};

export default PlayerSignupPage;