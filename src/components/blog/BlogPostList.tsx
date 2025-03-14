import React, { useState } from "react";
import BlogPostCard from "./BlogPostCard";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readMoreLink: string;
}

interface BlogPostListProps {
  posts?: BlogPost[];
  postsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const BlogPostList = ({
  posts = [
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
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use Each",
      excerpt:
        "An in-depth comparison of CSS Grid and Flexbox layout systems. Understand their strengths, weaknesses, and ideal use cases for modern web design.",
      date: "2023-05-05",
      readMoreLink: "#post-3",
    },
    {
      id: 4,
      title: "JavaScript Promises Explained",
      excerpt:
        "Demystifying JavaScript Promises and asynchronous programming. Learn how to write cleaner, more maintainable code for handling async operations.",
      date: "2023-04-28",
      readMoreLink: "#post-4",
    },
    {
      id: 5,
      title: "Optimizing Website Performance",
      excerpt:
        "Practical techniques to improve your website's loading speed and overall performance. Covers image optimization, code splitting, and caching strategies.",
      date: "2023-04-20",
      readMoreLink: "#post-5",
    },
  ],
  postsPerPage = 3,
  currentPage = 1,
  onPageChange = () => {},
}: BlogPostListProps) => {
  const [activePage, setActivePage] = useState(currentPage);

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = activePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
    onPageChange(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-black min-h-screen font-mono text-green-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Terminal-like header */}
        <div className="mb-6 border-b border-green-500 pb-2">
          <p className="text-green-300">
            <span className="text-green-500">user@stdout</span>:~$ ls -la /posts
          </p>
        </div>

        {/* Blog posts */}
        <div className="space-y-6">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                readMoreLink={post.readMoreLink}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p>No posts found. Try a different search or category.</p>
            </div>
          )}
        </div>

        {/* Pagination removed */}

        {/* Terminal-like footer */}
        <div className="mt-8 border-t border-green-500 pt-2">
          <p className="text-green-300">
            <span className="text-green-500">user@stdout</span>:~$ | Showing
            page {activePage} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostList;
