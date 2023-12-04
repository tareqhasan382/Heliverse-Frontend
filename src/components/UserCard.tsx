import { useCreateTeamMutation } from "../redux/api/teamApi";
import { useGetUserQuery } from "../redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";

const UserCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: userData, isLoading: userLoading } = useGetUserQuery(id);
  const [createTeam, { isLoading: teamLoading }] = useCreateTeamMutation();

  const handleAddTeam = async () => {
    await createTeam({ users: id }).unwrap();
    navigate("/team");
  };

  return (
    <div className="lg:px-48 md:px-20 items-center w-full flex justify-center h-full px-4 py-10 ">
      <div className="bg-slate-200 w-[320px] shadow-md items-center justify-center px-4 py-10 ">
        {userLoading && (
          <div>
            <h1 className="text-3xl font-bold">Loading</h1>
          </div>
        )}
        {!userLoading && (
          <>
            <img
              src={userData?.data?.avatar}
              alt="avatar"
              className="w-[100px] items-center object-cover justify-center"
            />
            <h1 className="flex flex-row">
              Name: {userData?.data?.first_name} {userData?.data?.last_name}
            </h1>
            <h1>Domain: {userData?.data?.domain} </h1>
            <h1>Email: {userData?.data?.email} </h1>
            <h1>Gender: {userData?.data?.gender} </h1>
            <h1 className="flex flex-row ">
              Availability:{" "}
              {userData?.data?.available ? <p> True</p> : <p> False</p>}
            </h1>
            <button
              onClick={handleAddTeam}
              className="px-3 py-2 bg-black text-white rounded font-bold"
              disabled={teamLoading} // Disable button during team creation
            >
              Create Team
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
