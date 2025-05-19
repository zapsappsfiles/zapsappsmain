import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
        <p className="mb-4">
          The use of this website is subject to the following terms of use. By using our website, you accept these terms in full. If you disagree with these terms or any part of these terms, you must not use our website.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-3">2. License to use website</h2>
        <p className="mb-4">
          Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-3">3. Acceptable use</h2>
        <p className="mb-4">
          You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService; 