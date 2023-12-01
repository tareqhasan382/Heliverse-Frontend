/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";
interface Inputs {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: "Male" | "Female" | "Others";
  domain: string;
  available: boolean;
  avatar?: string;
}
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
    //============ update  User==========================
    updateUser: build.mutation<void, Pick<Inputs, "id"> & Partial<Inputs>>({
      query: ({ id, ...data }) => ({
        url: `post/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const res = dispatch(
          userApi.util.updateQueryData("getUsers", id, (draft: any) => {
            Object.assign(draft, data);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          res.undo();
        }
      },
    }),
    //============ End update User==========================
    getUser: build.query({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "GET",
      }),
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
