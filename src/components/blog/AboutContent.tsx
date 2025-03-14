import React from "react";

const AboutContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">About Stdout Journal</h2>

      <p>
        Welcome to Stdout Journal, a minimalist, terminal-inspired blog
        dedicated to web development, programming, and technology insights.
      </p>

      <h3 className="text-lg font-bold mt-4">Our Mission</h3>
      <p>
        Our mission is to provide clear, concise, and practical content for
        developers of all skill levels. We believe in the beauty of simplicity
        and the power of knowledge sharing.
      </p>

      <h3 className="text-lg font-bold mt-4">The Terminal Aesthetic</h3>
      <p>
        We've chosen a terminal-inspired design to pay homage to the roots of
        programming. The command line is where many developers begin their
        journey, and we wanted to capture that nostalgic yet powerful
        experience.
      </p>

      <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded">
        <p className="text-sm">
          <span className="text-green-300">$ whoami</span>
          <br />
          Stdout Journal was founded in 2023 by a group of passionate developers
          who wanted to create a unique space for sharing programming knowledge
          and experiences.
        </p>
      </div>

      <h3 className="text-lg font-bold mt-4">Topics We Cover</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Web Development (Frontend & Backend)</li>
        <li>JavaScript & TypeScript</li>
        <li>React & Modern Frameworks</li>
        <li>CSS & UI/UX Design</li>
        <li>Developer Tools & Productivity</li>
        <li>Best Practices & Coding Standards</li>
      </ul>

      <p className="mt-4">
        Thank you for being part of our community. We're constantly working to
        improve and expand our content to better serve developers worldwide.
      </p>
    </div>
  );
};

export default AboutContent;
