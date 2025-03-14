import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import { Button } from "../ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

interface BlogPostProps {
  postId?: string;
}

const BlogPost = ({ postId }: BlogPostProps) => {
  const params = useParams();
  const id = postId || params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [typedTitle, setTypedTitle] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // Mock blog post data - in a real app, you would fetch this based on the ID
  const post = {
    id: id,
    title: "Building a Terminal-Inspired Blog with React and Tailwind",
    date: "2023-05-15",
    author: "Stdout User",
    readTime: "5 min read",
    content: [
      "In this tutorial, we'll explore how to create a terminal-inspired blog using React and Tailwind CSS. The aesthetic combines the nostalgic charm of command-line interfaces with modern web functionality.",
      "## Getting Started",
      "First, let's set up our React project with the necessary dependencies. We'll be using Tailwind CSS for styling and some custom animations to achieve the terminal effect.",
      "```bash\nnpm create vite@latest terminal-blog -- --template react-ts\ncd terminal-blog\nnpm install tailwindcss postcss autoprefixer\nnpx tailwindcss init -p\n```",
      "## Creating the Terminal Aesthetic",
      "The key to achieving a convincing terminal look is in the details: monospace fonts, a dark background with bright text, and subtle animations like cursor blinking and typing effects.",
      '```jsx\n// Terminal-inspired container\n<div className="bg-black border border-green-500 rounded-md p-6 font-mono text-green-500">\n  <h2 className="text-xl font-bold mb-2 flex items-center">\n    <span className="text-green-500">$ </span>\n    <span className="ml-2">{title}</span>\n    {cursorVisible && <span className="ml-1 inline-block w-2 h-4 bg-green-500"></span>}\n  </h2>\n</div>\n```',
      "## Adding Typing Effects",
      "To create the illusion of text being typed out in real-time, we'll use React's useState and useEffect hooks to gradually reveal text character by character.",
      "```jsx\nconst [displayText, setDisplayText] = useState('');\nconst textToType = 'Hello, Terminal!';\n\nuseEffect(() => {\n  if (displayText.length < textToType.length) {\n    const timeout = setTimeout(() => {\n      setDisplayText(textToType.substring(0, displayText.length + 1));\n    }, 100);\n    return () => clearTimeout(timeout);\n  }\n}, [displayText, textToType]);\n```",
      "## Conclusion",
      "With these techniques, you can create a unique and engaging blog experience that stands out from typical designs. The terminal aesthetic not only looks cool but can also enhance the reading experience for technical content.",
      "Remember that while visual effects are fun, they should enhance rather than detract from the readability of your content. Balance is key!",
    ],
  };

  // Typing effect for the title
  useEffect(() => {
    if (typedTitle.length < post.title.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(post.title.substring(0, typedTitle.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setIsLoading(false);
    }
  }, [typedTitle, post.title]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Function to render content with markdown-like formatting
  const renderContent = (content: string[]) => {
    return content.map((paragraph, index) => {
      // Handle code blocks
      if (paragraph.startsWith("```")) {
        const codeContent = paragraph.split("\n").slice(1, -1).join("\n");
        return (
          <div
            key={index}
            className="bg-gray-900 p-4 rounded-md my-4 overflow-x-auto"
          >
            <pre className="text-green-300 font-mono text-sm">
              {codeContent}
            </pre>
          </div>
        );
      }

      // Handle headers
      if (paragraph.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-xl font-bold mt-6 mb-3 text-green-400"
          >
            {paragraph.substring(3)}
          </h2>
        );
      }

      // Regular paragraphs
      return (
        <p key={index} className="my-4 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="bg-black min-h-screen font-mono text-green-500 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="text-green-500 hover:text-green-300 hover:bg-green-900/20 pl-0"
              asChild
            >
              <Link to="/" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                <span>cd ..</span>
              </Link>
            </Button>
          </div>

          {/* Blog post header */}
          <div className="border border-green-500/30 rounded-md p-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 flex items-start">
              <span className="text-green-500 mr-2">$</span>
              <span>{typedTitle}</span>
              {isLoading && cursorVisible && (
                <span className="ml-1 inline-block w-2 h-6 bg-green-500"></span>
              )}
            </h1>

            <div className="flex flex-wrap items-center text-sm text-green-300 mt-4 space-x-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Blog post content */}
          <div className="border border-green-500/30 rounded-md p-6">
            <div className="mb-2 pb-2 border-b border-green-500/30">
              <span className="text-green-500">user@stdout</span>:~$ cat post.md
            </div>
            <div className="pl-4 border-l-2 border-green-500/30">
              {renderContent(post.content)}
            </div>
          </div>

          {/* Related posts or comments could go here */}
          <div className="mt-12 border-t border-green-500/30 pt-6">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-green-500">$</span> ls -la ./related-posts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-green-500/30 rounded-md p-4 hover:border-green-400 transition-colors">
                <Link to="#" className="block">
                  <h4 className="font-bold mb-2">
                    Creating Custom Terminal Commands
                  </h4>
                  <p className="text-sm text-green-300">
                    Explore how to build your own CLI tools...
                  </p>
                </Link>
              </div>
              <div className="border border-green-500/30 rounded-md p-4 hover:border-green-400 transition-colors">
                <Link to="#" className="block">
                  <h4 className="font-bold mb-2">
                    Terminal Productivity Hacks
                  </h4>
                  <p className="text-sm text-green-300">
                    Boost your workflow with these terminal tips...
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black border-t border-green-500/30 p-4 text-center text-green-500/70">
        <div className="container mx-auto">
          <p>
            <span className="text-green-500">user@stdout</span>:~$ echo "©
            $(date +%Y) Stdout Journal. All rights reserved."
          </p>
          <p className="mt-2 text-sm">
            Built with React + Tailwind CSS |{" "}
            <a href="#" className="text-green-400 hover:text-green-300">
              View Source
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
