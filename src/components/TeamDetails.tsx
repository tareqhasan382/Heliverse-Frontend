import { useParams } from "react-router-dom";
import { useGetTeamQuery } from "../redux/api/teamApi";

const TeamDetails = () => {
  const { id } = useParams();
  const { data } = useGetTeamQuery(id);
  const team = data?.data;
  return (
    <div className="lg:px-48 md:px-20 items-center  w-full flex justify-center h-full px-4 py-10 flex-col ">
      <h1 className=" text-xl font-bold ">Detals</h1>
      <div className=" w-full items-center justify-cente shadow-lg outline outline-gray-300/75 rounded p-5 ">
        <p className=" flex flex-row ">
          Name:{team?.users?.first_name} {team?.users?.last_name}
        </p>

        <p>Domain:{team?.users?.email} </p>
        <p>Domain:{team?.users?.gender} </p>
        <p>Domain:{team?.users?.domain} </p>
        <p className=" flex flex-row">
          Available:{team?.users?.available ? <p>True</p> : <p>False</p>}{" "}
        </p>
      </div>
    </div>
  );
};

export default TeamDetails;
