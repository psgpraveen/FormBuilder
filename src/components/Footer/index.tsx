// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-8 text-white py-8">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold">Praveen</h2>
          <p className="text-gray-400">
            Software Developer | Electronics and Communication Engineer
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Me</h3>
          <p>Email: <a href="mailto:psgpraveen08@gmail.com" className="text-blue-400 hover:underline">psgpraveen08@gmail.com</a></p>
          <p>Phone: +91-7985942726</p>
          <p>Location: India</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <ul className="space-y-1">
            <li>Full Stack Developer (App + Web)</li>
            <li>React.js</li>
            <li>React Native</li>
            <li>Vite</li>
            <li>JavaScript</li>
            <li>Software Engineering</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Links</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://github.com/psgpraveen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/praveen-kumar-gupta-10a8851a6/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://psgpraveen.github.io/port/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Portfolio
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Praveen. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
