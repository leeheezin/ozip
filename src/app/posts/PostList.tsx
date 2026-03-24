"use client";

import PostCard from "./PostCard";

export default function PostList({ posts }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}