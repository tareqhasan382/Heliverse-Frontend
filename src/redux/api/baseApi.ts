// https://heliverse-backend-crud.vercel.app
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://heliverse-backend-crud.vercel.app",
  }),
  endpoints: () => ({}),
  tagTypes: ["user"],
});
