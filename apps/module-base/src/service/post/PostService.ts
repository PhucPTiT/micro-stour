import { httpService } from "@/config/http-service";
import { POST } from "@/const/endpoint";
import { validateResponseSchema } from "@/service/Service";
import { postListSchema } from "./type";

class PostService {
    async getPosts() {
        const response = await httpService.get(POST.GET_ALL_POSTS);
        return validateResponseSchema(response, postListSchema, "postService.getPosts");
    }
}

export const postService = new PostService();
