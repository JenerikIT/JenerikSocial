import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  _id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  likedPosts: string[];
}

export interface PostPropsWithId {
  id: string;
  title: string;
  text: string;
  tags: string[];
  user: User;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  likeCount: number;
  imageUrl: string;
  liked: boolean;
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
  imageUrl: string;
  liked: boolean;
}

export interface GetPostsResponse extends PostProps { }

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

      providesTags: (result) =>
        result
          ? [
            ...result.items.map(({ _id }) => ({
              type: "Posts" as const,
              id: _id,
            })),
            { type: "Posts", id: "LIST" },
          ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getAllLikedPosts: builder.query<PostProps, void>({
      query: () => "/posts/all/liked",
      providesTags: ["Posts"],
    }),
    getOnePost: builder.query<PostProps, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    uploadImg: builder.mutation({
      query: (formImgData) => ({
        url: "/upload",
        method: "POST",
        body: formImgData,
      }),
    }),
    addPostFavourite: builder.mutation({
      query: (id) => ({
        url: `posts/liked/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (res, error, { id }) => [{ type: "Posts", id }],
    }),
    updatePost: builder.mutation<
      PostProps,
      { id: string; data: Partial<PostProps>; }
    >({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (res, error, { id }) => [{ type: "Posts", id }],
    }),

    createPost: builder.mutation<PostProps, Partial<PostProps>>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Posts", id },
        { type: "Posts", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useUpdatePostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useUploadImgMutation,
  useAddPostFavouriteMutation,
  useGetAllLikedPostsQuery,
} = postsApi;
