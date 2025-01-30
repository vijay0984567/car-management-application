import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} CarHub. All Rights Reserved.
        </p>
        <p className="mb-0">
          <a href="/terms" className="text-decoration-none text-light">
            Terms of Service
          </a>{' '}
          |{' '}
          <a href="/privacy" className="text-decoration-none text-light">
            Privacy Policy
          </a>
        </p>
        <div className="social-icons mt-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
