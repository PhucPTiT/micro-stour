import { useQuery } from "@tanstack/react-query";
import { postService } from "@/service/post/PostService";

// lấy danh sách bài viết
export const useGetPosts = () => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: () => postService.getPosts(),
    });
};
