import z from "zod";

export const postSchema = z.object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
});

export const postListSchema = z.array(postSchema);

export type PostItem = z.infer<typeof postSchema>;
export type PostListResponse = z.infer<typeof postListSchema>;
