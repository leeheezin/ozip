"use client";

export default function PostCard({ post }: any) {
  console.log(post.images);
  return (
    <div className="border rounded-lg p-3 shadow-sm">
      <h2 className="font-semibold">{post.title}</h2>
      <p className="text-sm text-gray-500">{post.content}</p>
      {post.images.map((img: string, i:number) => (
          <img key={i} src={img} alt="" />
      ))}
    </div>
  );
}