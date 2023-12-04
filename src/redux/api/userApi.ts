/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";
// interface Inputs {
//   _id?: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   gender: string;
//   domain: string;
//   available: string;
//   avatar: string;
// }
const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //============Get All User==========================
    getUsers: build.query({
      query: (arg: any) => ({
        url: "/api/users",
        method: "GET",
        params: arg,
      }),
      providesTags: ["user"],
    }),
    //============Add User==========================

    addUser: build.mutation({
      query: (data) => ({
        url: "/api/user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        const res = dispatch(
          userApi.util.updateQueryData("getUsers", data, (draft: any[]) => {
            draft.push(data);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          res.undo();
        }
      },
    }),

    //============ End Add User==========================
    //============ update  User========================== /user/:id
    updateUser: build.mutation<any, any>({
      query: ({ id, ...data }) => ({
        url: `/api/user/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    //============ End update User==========================
    getUser: build.query({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    //============  delete User==========================
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    //
    //============  delete User==========================
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = userApi;
/*

api.util.updateQueryData('getPosts', undefined, (draftPosts) => {
        draftPosts.push({ id: 1, name: 'Teddy' })
      })

*/
