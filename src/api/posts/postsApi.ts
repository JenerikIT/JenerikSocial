import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostProps {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  user: User;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  likeCount: number;
  posts: PostProps[];
  imageUrl: string;
}

export interface GetPostsResponse {
  items: PostProps[];
  status: string;
}
export const postsApi = createApi({
  tagTypes: ["Posts"],
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4444",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<GetPostsResponse, void>({
      query: () => "posts",
      transformResponse: (response: PostProps[]) => ({
        items: response,
        status: "success",
      }),
      providesTags: ["Posts"],
    }),
    getOnePost: builder.query<PostProps, string>({
      query: (id) => `posts/${id}`,
      transformResponse: (response: PostProps) => {
        return response;
      },
    }),
    updatePost: builder.mutation<
      boolean,
      { id: string; data: Partial<PostProps> }
    >({
      query: (newPost) => ({
        url: `posts/${newPost.id}`,
        method: "PATCH",
        body: newPost.data,
      }),
      invalidatesTags: ["Posts"],
    }),
    createPost: builder.mutation<PostProps, Partial<PostProps>>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetOnePostQuery,
  useUpdatePostMutation,
} = postsApi;
