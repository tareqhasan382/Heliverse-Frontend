import { useGetUserQuery } from "../redux/api/userApi";
import { useParams } from "react-router-dom";

const UserCard = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserQuery(id);
  const user = data?.data;
  console.log(user);
  console.log(isLoading);
  return (
    <div className="lg:px-48 md:px-20  w-full flex items-center justify-between h-full px-4 py-10 ">
      <div className=" w-[320px] shadow-md py-20 ">
        <h1 className=" flex flex-row ">
          {user?.first_name} {user?.last_name}
        </h1>
        <h1>{user?.domain} </h1>
        <h1>{user?.email} </h1>
      </div>
    </div>
  );
};

export default UserCard;
