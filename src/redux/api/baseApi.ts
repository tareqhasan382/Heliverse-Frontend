// https://heliverse-backend-crud.vercel.app
//http://localhost:5000
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: () => ({}),
  tagTypes: ["user", "teams"],
});
