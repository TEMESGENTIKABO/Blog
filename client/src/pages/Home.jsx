import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className=" mt-12 w-auto">
      <div className="container mx-auto px-4 text-center py-8">
        <h1 className="text-4xl font-bold text-teal-500 lg:text-6xl dark:text-white">
          Welcome to My Blog
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          Explore a variety of articles and tutorials on web development,
          software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="inline-block mt-4 px-6 py-3 font-semibold text-white bg-teal-500 dark:bg-teal-600 rounded-full hover:bg-teal-600 dark:hover:bg-teal-700"
        >
          View All Blogs
        </Link>
      </div>

      <div className="container mx-auto px-0 mt-8 flex flex-wrap gap-5">
        {posts && posts.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center text-teal-500 dark:text-white w-full">
              Recent Blogs
            </h2>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} className="flex-none w-full sm:w-1/2 md:w-1/2 lg:w-1/3" />
            ))}
          </>
        )}
      </div>

      {/* Add margin-bottom to create space for the footer */}
      <div className="mb-16"></div>
    </div>
  );
}
