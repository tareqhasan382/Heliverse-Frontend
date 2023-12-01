/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteUserMutation, useGetUsersQuery } from "../redux/api/userApi";
import { Hourglass } from "react-loader-spinner";

interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  domain: string;
  available: boolean;
  avatar: string;
}
function UserCard() {
  const [deleteUser] = useDeleteUserMutation();
  const query: Record<string, any> = {};
  const { data, isLoading } = useGetUsersQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );
  const users = data?.data;

  //=================pagination======================================
  return (
    <>
      <div className="lg:px-48 md:px-20 px-4 text-black py-4 ">
        <div className=" text-3xl font-bold text-center ">Home Page</div>
        <div className=" ">
          {!isLoading && users?.length > 0 ? (
            <div>
              {users.map((item: IUser) => (
                <div key={item._id}>
                  {item.email}
                  <div>
                    <img src={item.avatar} alt="avatar" className=" w-20 " />
                  </div>
                  <button
                    onClick={() => deleteUser(item._id)}
                    className=" px-4 py-2 bg-black text-white "
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className=" h-96 flex items-center justify-center ">
              <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#306cce", "#72a1ed"]}
              />
            </div>
          )}
        </div>
        {/*====================== Pagination Start============================*/}

        {/*====================== Pagination End============================*/}
      </div>
    </>
  );
}

export default UserCard;
