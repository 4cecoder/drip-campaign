// app/landing/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faChartLine, faCog, faUser } from '@fortawesome/free-solid-svg-icons';

const LandingPage: React.FC = () => {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 py-8">
        <nav className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Drip Campaign Manager</h1>
          <Link href="/login">
            <button className="bg-white text-purple-600 font-bold py-2 px-4 rounded transition duration-200 hover:bg-purple-100">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Login
            </button>
          </Link>
        </nav>
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4">Simplify Your Email Marketing</h2>
            <p className="text-xl mb-8">Create, manage, and analyze effective drip campaigns with ease.</p>
            <Link href="/signup">
              <button className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full text-xl transition duration-200 hover:bg-purple-100">
                Get Started
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white bg-opacity-20 rounded-lg p-8 shadow-md text-center backdrop-filter backdrop-blur-lg">
              <FontAwesomeIcon icon={faEnvelope} className="text-6xl mb-4 text-purple-200" />
              <h3 className="text-2xl font-bold mb-4">Intuitive Campaign Builder</h3>
              <p className="mb-8">Create personalized email sequences with our user-friendly campaign builder.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-8 shadow-md text-center backdrop-filter backdrop-blur-lg">
              <FontAwesomeIcon icon={faChartLine} className="text-6xl mb-4 text-purple-200" />
              <h3 className="text-2xl font-bold mb-4">Real-Time Analytics</h3>
              <p className="mb-8">Track campaign performance and gain valuable insights with comprehensive analytics.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-8 shadow-md text-center backdrop-filter backdrop-blur-lg">
              <FontAwesomeIcon icon={faCog} className="text-6xl mb-4 text-purple-200" />
              <h3 className="text-2xl font-bold mb-4">Flexible Customization</h3>
              <p className="mb-8">Tailor your campaigns to your unique needs with advanced customization options.</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LandingPage;