import { useGetUserQuery } from "../redux/api/userApi";
import { useParams } from "react-router-dom";

// gender: "Male" | "Female" | "Others";
// domain: string;
// available: boolean;
// avatar?: string;
const UserCard = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserQuery(id);
  const user = data?.data;
  console.log(user);
  console.log(isLoading);
  return (
    <div className="lg:px-48 md:px-20 items-center  w-full flex justify-center h-full px-4 py-10 ">
      <div className=" bg-slate-200 w-[320px] shadow-md items-center justify-center px-4 py-10 ">
        <img
          src={user?.avatar}
          alt="avatar"
          className=" w-[100px] items-center object-cover justify-center "
        />
        <h1 className=" flex flex-row ">
          Name: {user?.first_name} {user?.last_name}
        </h1>
        <h1>Domain: {user?.domain} </h1>
        <h1>Email: {user?.email} </h1>
        <h1>Gender: {user?.gender} </h1>
        <h1 className=" flex flex-row ">
          Availability: {user?.available ? <p> True</p> : <p> False</p>}
        </h1>
      </div>
    </div>
  );
};

export default UserCard;
