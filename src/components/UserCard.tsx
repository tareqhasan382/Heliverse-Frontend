import { useCreateTeamMutation } from "../redux/api/teamApi";
import { useGetUserQuery } from "../redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";

const UserCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = {
    users: id,
  };
  const { data } = useGetUserQuery(id);

  const user = data?.data;
  const [createTeam] = useCreateTeamMutation();
  const handleAddTeam = async () => {
    // const data = {
    //   users: user?._id,
    // };
    await createTeam(userId).unwrap();
    // console.log(teamLoading);
    navigate("/team");
  };
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
        <button
          onClick={handleAddTeam}
          className=" px-3 py-2 bg-black text-white rounded font-bold "
        >
          Create Team
        </button>
        {/* <form onSubmit={handleSubmit(onSubmit)} className=" py-2 gap-2 ">
          <input
            {...register("name")}
            required
            type="text"
            placeholder=" Enter Team name"
            className=" w-full focus:outline-none h-10 rounded px-2 my-2 "
          />
          <form
            type="submit"
            className=" px-3 py-2 bg-black text-white rounded font-bold "
          >
            Create Team
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default UserCard;
