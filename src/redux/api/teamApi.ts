/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTeam: build.mutation({
      query: (data) => ({
        url: "/api/team", // "/api/team",
        method: "POST",
        body: data,
      }),
      // async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
      //   const res = dispatch(
      //     userApi.util.updateQueryData("getUsers", data, (draft: any[]) => {
      //       draft.push(data);
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch (error) {
      //     res.undo();
      //   }
      // },
    }),
    getTeams: build.query({
      query: (arg: any) => ({
        url: "/api/teams",
        method: "GET",
        params: arg,
      }),
      providesTags: ["teams"],
    }),

    getTeam: build.query({
      query: (id) => ({
        url: `/api/team/${id}`,
        method: "GET",
      }),
      providesTags: ["teams"],
    }),
  }),
});

export const { useCreateTeamMutation, useGetTeamsQuery, useGetTeamQuery } =
  teamApi;
