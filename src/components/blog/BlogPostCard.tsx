import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { MousePointerClick } from "lucide-react";

interface BlogPostCardProps {
  title?: string;
  excerpt?: string;
  date?: string;
  readMoreLink?: string;
}

const BlogPostCard = ({
  title = "Terminal-Inspired Blog Post Title",
  excerpt = "This is a sample excerpt for the blog post. It provides a brief overview of what the post is about, enticing readers to click and read more...",
  date = "2023-05-15",
  readMoreLink = "#",
}: BlogPostCardProps) => {
  const [displayTitle, setDisplayTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Typing effect for the title
  useEffect(() => {
    if (displayTitle.length < title.length) {
      const timeout = setTimeout(() => {
        setDisplayTitle(title.substring(0, displayTitle.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [displayTitle, title]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black border border-green-500 rounded-md p-6 mb-6 font-mono text-green-500 hover:border-green-300 transition-colors">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-bold mb-2 flex items-center">
          <span className="text-green-500">$ </span>
          <span className="ml-2">{displayTitle}</span>
          {isTyping && showCursor && (
            <span className="ml-1 inline-block w-2 h-4 bg-green-500"></span>
          )}
        </h2>
        <span className="text-sm text-green-300">{date}</span>
      </div>

      <p className="mb-4 text-green-400 opacity-80">{excerpt}</p>

      <div className="flex items-center">
        <Button
          variant="ghost"
          className="text-green-500 hover:text-green-300 hover:bg-green-900/20 p-0 h-auto"
          asChild
        >
          <Link
            to={`/blog/${readMoreLink.replace("#post-", "")}`}
            className="flex items-center"
          >
            <span className="mr-1">cat read_more.md</span>
            <span
              className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}
            >
              <MousePointerClick size={16} />
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogPostCard;
