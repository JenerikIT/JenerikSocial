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

export type UserData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  _id: string;
  email: string;
  fullName: string;
  state: boolean;
  token: string;
};

export type AuthResponseCheck = {
  userData: {
    _id: string;
    email: string;
    fullName: string;
    token: string;
    avatarUrl: string;
    phone: string;
  };
  state: boolean;
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
    authMe: builder.query<AuthResponseCheck, void>({
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
