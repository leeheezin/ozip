"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const select = Array.from(e.target.files || []);
    if(select) setFiles(select);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!title) return alert("제목을 입력해 주세요.");
    if (!files) return ;
    const imageUrls = [];

    for (const file of files) {
      const fileName = `${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("posts")
        .upload(fileName, file);

      if (error) continue;

      const { data } = supabase.storage
        .from("posts")
        .getPublicUrl(fileName);

      imageUrls.push(data.publicUrl);
    }

    const { error } = await supabase.from("posts").insert([
      {
        title,
        content,
        images: imageUrls,
      },
    ]);

    if (error) {
      alert("에러 발생");
      return;
    }

    router.push("/posts");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">글쓰기</h1>
      <input type="file" onChange={handleFile} multiple/>
      <input
        placeholder="제목"
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="내용"
        className="border p-2 w-full mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2"
      >
        작성
      </button>
    </div>
  );
}