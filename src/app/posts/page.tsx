import { supabase } from "@/lib/supabase";
import PostList from "./PostList";

export default async function Page() {
    const {data} = await supabase.from("posts").select("*").order("created_at", {ascending: false});

    return(
        <div>
            <h1>게시글</h1>
            <PostList posts={data || []}/>
        </div>
    )
}