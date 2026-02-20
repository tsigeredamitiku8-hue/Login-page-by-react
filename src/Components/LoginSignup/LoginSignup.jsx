import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/user.jpg';
import email_icon from '../Assets/email.webp';
import password_icon from '../Assets/password.jpg';

const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [signedUpUser, setSignedUpUser] = useState(null);

  const validatePassword = (value) => {
    const lengthOk = value.length >= 8;
    const upperOk = /[A-Z]/.test(value);
    const lowerOk = /[a-z]/.test(value);
    const numberOk = /\d/.test(value);
    const symbolOk = /[^A-Za-z0-9]/.test(value);

    if (!lengthOk || !upperOk || !lowerOk || !numberOk || !symbolOk) {
      return 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.';
    }

    return '';
  };

  const resetMessage = () => {
    setMessage('');
    setIsError(false);
  };

  const switchAction = (nextAction) => {
    setAction(nextAction);
    resetMessage();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (action === 'Login') {
      if (!signedUpUser) {
        setIsError(true);
        setMessage('Please sign up first.');
        return;
      }

      if (
        !email.trim() ||
        !email.includes('@') ||
        password.length < 6 ||
        email.trim().toLowerCase() !== signedUpUser.email.toLowerCase() ||
        password !== signedUpUser.password
      ) {
        setIsError(true);
        setMessage('Invalid credentials.');
        return;
      }
    }

    if (action === 'Sign Up' && name.trim().length < 2) {
      setIsError(true);
      setMessage('Please enter a valid name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setIsError(true);
      setMessage('Please enter a valid email address.');
      return;
    }

    if (action === 'Sign Up' || action === 'Reset Password') {
      const passwordError = validatePassword(password);
      if (passwordError) {
        setIsError(true);
        setMessage(passwordError);
        return;
      }
    }

    if (password.length < 6) {
      setIsError(true);
      setMessage('Password must be at least 6 characters.');
      return;
    }

    if (action === 'Reset Password') {
      if (confirmPassword.length < 6) {
        setIsError(true);
        setMessage('Please confirm your new password.');
        return;
      }

      if (password !== confirmPassword) {
        setIsError(true);
        setMessage('Passwords do not match.');
        return;
      }
    }

    setIsError(false);
    setMessage(
      action === 'Login'
        ? 'Successfully logged in.'
        : action === 'Reset Password'
          ? 'Password reset successful.'
          : 'Successfully signed up.'
    );

    if (action === 'Sign Up') {
      setSignedUpUser({ name: name.trim(), email: email.trim(), password });
      setName('');
    }
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleForgotPassword = () => {
    if (!email.trim() || !email.includes('@')) {
      setIsError(true);
      setMessage('Enter your email first to reset password.');
      return;
    }

    switchAction('Reset Password');
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === 'Login' || action === 'Reset Password' ? null : (
            <div className="input">
              <img src={user_icon} alt="user" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input">
            <img src={email_icon} alt="email" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="password" />
            <input
              type="password"
              placeholder={action === 'Reset Password' ? 'New Password' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {action === 'Reset Password' ? (
            <div className="input">
              <img src={password_icon} alt="password" />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          ) : null}
        </div>

        {action === 'Login' ? (
          <div className="forgot-password">
            Forgot Password?
            <button type="button" className="forgot-link" onClick={handleForgotPassword}>
              Click Here!
            </button>
          </div>
        ) : null}

        {message && (
          <p className={isError ? 'response-message error' : 'response-message success'}>{message}</p>
        )}

        <div className="submit-container">
          <button type="submit" className="submit primary-submit">
            {action === 'Login' ? 'Login' : 'Sign Up'}
          </button>
          {action === 'Login' ? (
            <button type="button" className="submit gray" onClick={() => switchAction('Sign Up')}>
              Sign Up
            </button>
          ) : (
            <button type="button" className="submit gray" onClick={() => switchAction('Login')}>
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
