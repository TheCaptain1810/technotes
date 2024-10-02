/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery("https://localhost:3500"),
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
