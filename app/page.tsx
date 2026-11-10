'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="login-background">
      <div className="background-shape shape-one"></div>
      <div className="background-shape shape-two"></div>
      <div className="background-shape shape-three"></div>

      <div className="login-card">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">
            <span>🎓</span>
          </div>

          <div>
            <h1 className="logo-name">EduSphere</h1>
            <p className="logo-subtitle">Education Management System</p>
          </div>
        </div>

        <div className="divider">
          <span></span>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome Back!</h2>
          <p>Sign in to access your dashboard and continue your journey.</p>
        </div>

        {/* Login Form */}
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              placeholder="you@institution.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Account Options */}
          <div className="account-options">
            <label className="remember-option">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button type="button" className="login-button">
            Sign In <span>→</span>
          </button>
        </form>

        {/* Help Section */}
        <div className="help-section">
          <div className="help-divider"></div>

          <p>Need help?</p>

          <span>Contact your system administrator</span>
        </div>
      </div>

      <style jsx global>{`

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
    }

    .login-background {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      padding: 30px 20px;
      background: linear-gradient(
        135deg,
        aliceblue,
        white,
        skyblue
      );
    }

    .background-shape {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }

    .shape-one {
      width: 350px;
      height: 350px;
      background: skyblue;
      opacity: 0.25;
      top: -180px;
      right: -100px;
    }

    .shape-two {
      width: 400px;
      height: 400px;
      background: blue;
      opacity: 0.08;
      bottom: -250px;
      left: -150px;
    }

    .shape-three {
      width: 180px;
      height: 180px;
      background: darkred;
      opacity: 0.06;
      bottom: -100px;
      right: -50px;
    }

    .login-card {
      width: 100%;
      max-width: 650px;
      background: white;
      padding: 50px 65px;
      border-radius: 22px;
      position: relative;
      z-index: 1;
      box-shadow: 0 15px 50px lightsteelblue;
    }

    .logo-section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
    }

    .logo-icon {
      font-size: 55px;
    }

    .logo-name {
      color: navy;
      font-size: 38px;
      margin: 0;
      font-weight: 700;
    }

    .logo-subtitle {
      color: steelblue;
      margin: 5px 0 0;
      font-size: 14px;
    }

    .divider {
      height: 2px;
      background: lightblue;
      margin: 35px 0;
      position: relative;
    }

    .divider span {
      position: absolute;
      width: 70px;
      height: 4px;
      background: darkred;
      left: 50%;
      top: -1px;
      transform: translateX(-50%);
      border-radius: 5px;
    }

    .welcome-section {
      text-align: center;
      margin-bottom: 35px;
    }

    .welcome-section h2 {
      color: navy;
      font-size: 36px;
      margin: 0 0 10px;
    }

    .welcome-section p {
      color: slategray;
      font-size: 15px;
      line-height: 1.6;
    }

    .login-form {
      width: 100%;
    }

    .form-group {
      margin-bottom: 25px;
    }

    .form-group label {
      display: block;
      color: navy;
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .form-group input {
      width: 100%;
      padding: 15px;
      border: 1px solid lightsteelblue;
      border-radius: 10px;
      font-size: 15px;
      outline: none;
      background: white;
    }

    .form-group input:focus {
      border-color: blue;
      box-shadow: 0 0 0 3px aliceblue;
    }

    .form-group input::placeholder {
      color: lightslategray;
    }

    .password-wrapper {
      position: relative;
    }

    .password-wrapper input {
      padding-right: 65px;
    }

    .password-toggle {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      border: none;
      background: none;
      color: blue;
      cursor: pointer;
    }

    .account-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 25px 0;
      font-size: 14px;
    }

    .remember-option {
      display: flex;
      align-items: center;
      gap: 8px;
      color: navy;
      cursor: pointer;
    }

    .remember-option input {
      accent-color: blue;
      width: 17px;
      height: 17px;
    }

    .forgot-link {
      color: darkred;
      text-decoration: none;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }

    .login-button {
      width: 100%;
      padding: 17px;
      background: navy;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 17px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s;
    }

    .login-button:hover {
      background: blue;
    }

    .login-button span {
      margin-left: 12px;
      font-size: 20px;
    }

    .help-section {
      text-align: center;
      margin-top: 35px;
      color: navy;
    }

    .help-divider {
      height: 1px;
      background: lightblue;
      margin-bottom: 20px;
    }

    .help-section p {
      font-weight: 600;
      margin-bottom: 10px;
    }

    .help-section span {
      font-size: 14px;
      color: steelblue;
    }

    @media (max-width: 600px) {

      .login-card {
        padding: 35px 25px;
      }

      .logo-name {
        font-size: 29px;
      }

      .logo-icon {
        font-size: 40px;
      }

      .welcome-section h2 {
        font-size: 28px;
      }

      .account-options {
        font-size: 12px;
      }

    }

  `}</style>
    </main>
  );
}
