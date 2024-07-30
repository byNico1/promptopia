"use client";

import React, { useEffect, useState } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const filteredPosts = posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator.username
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const posts = await response.json();

      setPosts(posts);
    };

    fetchPosts();
  }, []);

  const data = searchText.length === 0 ? posts : filteredPosts;

  return (
    <section className="feed">
      <form className="relative w-full flex-center" action="">
        <input
          type="text"
          placeholder="search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={data} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
