import React, { useState, useEffect } from "react";
import Header from "./blog/Header";
import BlogPostList from "./blog/BlogPostList";
import BlogPagination from "./blog/BlogPagination";
import TerminalDialog from "./blog/TerminalDialog";
import AboutContent from "./blog/AboutContent";
import ContactContent from "./blog/ContactContent";
import Footer from "./common/Footer";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readMoreLink: string;
}

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [featuredPostHover, setFeaturedPostHover] = useState(false);
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const welcomeText = "Welcome to Stdout Journal";

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with Terminal Commands",
      excerpt:
        "Learn the essential terminal commands every developer should know. This guide covers navigation, file manipulation, and basic system operations.",
      date: "2023-05-15",
      readMoreLink: "#post-1",
    },
    {
      id: 2,
      title: "Building a React App from Scratch",
      excerpt:
        "A step-by-step tutorial on creating a React application without using create-react-app. Learn about webpack configuration, babel, and project structure.",
      date: "2023-05-10",
      readMoreLink: "#post-2",
    },
  ];

  const postsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Typing effect for welcome text
  useEffect(() => {
    if (typedText.length < welcomeText.length) {
      const timeout = setTimeout(() => {
        setTypedText(welcomeText.substring(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Hide welcome screen after typing is complete and a delay
      const timeout = setTimeout(() => {
        setShowWelcome(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [typedText, welcomeText]);

  // Welcome screen with typing effect
  if (showWelcome) {
    return (
      <div className="bg-black min-h-screen font-mono text-green-500 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {typedText}
            <span className="inline-block w-2 h-6 bg-green-500 ml-1 animate-pulse"></span>
          </h1>
          <p className="text-green-300 mt-4 animate-pulse">
            Loading system resources...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen font-mono text-green-500 flex flex-col">
      <Header
        navItems={[
          { label: "Blog", href: "/" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ]}
        onNavItemClick={(href) => {
          if (href === "#about") {
            setShowAboutDialog(true);
            return true; // prevent default navigation
          } else if (href === "#contact") {
            setShowContactDialog(true);
            return true; // prevent default navigation
          }
          return false; // allow default navigation for other links
        }}
      />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Terminal-like intro */}
            <div className="mb-8 p-4 border border-green-500/30 rounded-md">
              <p className="text-green-300 mb-2">
                <span className="text-green-500">user@codeterminal</span>:~$ cat
                welcome.txt
              </p>
              <div className="pl-4 border-l-2 border-green-500/30">
                <h2 className="text-xl font-bold mb-2">
                  Welcome to Stdout Journal
                </h2>
                <p>
                  A minimalist, terminal-inspired blog exploring technology,
                  software, and digital culture through a technical lens.
                  Browse through our posts below.
                </p>
              </div>
            </div>

            {/* Featured Post */}
            {/* <div className="mb-8">
              <div className="p-2 bg-green-500 text-black font-bold inline-block mb-2 rounded">
                <span>FEATURED POST</span>
              </div>

              <div
                className="p-6 border-2 border-green-500 rounded-md transition-all duration-300 hover:bg-green-900/20"
                onMouseEnter={() => setFeaturedPostHover(true)}
                onMouseLeave={() => setFeaturedPostHover(false)}
              >
                <p className="text-green-300 mb-2">
                  <span className="text-green-500">user@stdout</span>:~$ cat
                  featured_post.md
                </p>
                <div className="pl-4 border-l-2 border-green-500/30">
                  <h2 className="text-2xl font-bold mb-3">
                    Building a React App from Scratch
                  </h2>
                  <p className="mb-4">
                    A step-by-step tutorial on creating a React application
                    without using create-react-app. Learn about webpack
                    configuration, babel, and project structure.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-300 text-sm">2023-05-10</span>
                    <Link
                      to="/blog/2"
                      className={`text-green-500 hover:text-green-300 transition-colors flex items-center ${featuredPostHover ? "animate-pulse" : ""}`}
                    >
                      <span>Read Full Article</span>
                      <span className="ml-2 inline-block">_</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Blog post list */}
            <BlogPostList
              posts={blogPosts}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />

            <div className="mt-4">
              <BlogPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Terminal Dialogs */}
      <TerminalDialog
        isOpen={showAboutDialog}
        onClose={() => setShowAboutDialog(false)}
        title="About"
        content={<AboutContent />}
      />
      <TerminalDialog
        isOpen={showContactDialog}
        onClose={() => setShowContactDialog(false)}
        title="Contact"
        content={<ContactContent />}
      />
    </div>
  );
};

export default Home;
