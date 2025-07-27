import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4444/auth",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

type UserData = {
  email: string;
  password: string;
};

type AuthResponse = {
  userData: {
    id: string;
    email: string;
    name?: string;
    state: boolean;
  };
  token: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    registerPost: builder.mutation<AuthResponse, UserData>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<AuthResponse, UserData>({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: AuthResponse) => {
        localStorage.setItem("token", response.token);
        return response;
      },
    }),
    authMe: builder.query<AuthResponse["userData"], void>({
      query: () => "/me",
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          localStorage.removeItem("token");
        }
        return response;
      },
    }),
  }),
});

export const { useRegisterPostMutation, useLoginMutation, useAuthMeQuery } =
  authApi;
