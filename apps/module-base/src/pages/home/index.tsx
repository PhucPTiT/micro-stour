import { Button } from "@workspace/ui/components/button";
import { Link, useNavigate } from "react-router-dom";
import { useGetPosts } from "@/hooks/post/usePost";

export default function HomePage() {
    const navigate = useNavigate();
    const { data } = useGetPosts();
    console.log("Posts:", data);
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted p-8">
            <Link to="test">Go to Test Page</Link>
            <Link to="test/123">Go to Test ID Page</Link>
            <Link to="non-existent">Go to Non-existent Page</Link>
            <Button onClick={() => navigate("test/123")}>Go to Test ID Page</Button>
        </div>
    );
}
