import React from "react";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

const ContactContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Contact Us</h2>

      <p>
        We'd love to hear from you! Whether you have questions, feedback, or
        just want to say hello, there are several ways to get in touch with the
        Stdout Journal team.
      </p>

      <div className="mt-6 space-y-4">
        <div className="flex items-start">
          <Mail className="h-5 w-5 mr-3 mt-0.5 text-green-400" />
          <div>
            <h3 className="font-bold">Email</h3>
            <p className="text-green-300">hello@stdoutjournal.dev</p>
            <p className="text-sm mt-1">
              For general inquiries, article submissions, and feedback.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Github className="h-5 w-5 mr-3 mt-0.5 text-green-400" />
          <div>
            <h3 className="font-bold">GitHub</h3>
            <p className="text-green-300">github.com/stdoutjournal</p>
            <p className="text-sm mt-1">
              Check out our open-source projects and contribute to our code.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Twitter className="h-5 w-5 mr-3 mt-0.5 text-green-400" />
          <div>
            <h3 className="font-bold">Twitter</h3>
            <p className="text-green-300">@StdoutJournal</p>
            <p className="text-sm mt-1">
              Follow us for the latest updates, tips, and tech news.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Linkedin className="h-5 w-5 mr-3 mt-0.5 text-green-400" />
          <div>
            <h3 className="font-bold">LinkedIn</h3>
            <p className="text-green-300">linkedin.com/company/stdoutjournal</p>
            <p className="text-sm mt-1">
              Connect with our team and join our professional network.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-green-900/20 border border-green-500/30 rounded">
        <h3 className="font-bold mb-2">Quick Response</h3>
        <p className="text-sm">
          <span className="text-green-300">$ response_time</span>
          <br />
          We aim to respond to all inquiries within 24-48 hours during business
          days.
        </p>
      </div>

      <p className="mt-4">
        We value your input and look forward to connecting with you. Don't
        hesitate to reach out through any of the channels above.
      </p>
    </div>
  );
};

export default ContactContent;
