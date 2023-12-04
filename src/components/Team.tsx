/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetTeamsQuery } from "../redux/api/teamApi";

const Team = () => {
  const { data, isLoading, isFetching } = useGetTeamsQuery({
    refetchOnMountOrArgChange: true,
  });
  const teams = data?.data;
  // console.log(data?.data);
  // console.log(isLoading);
  return (
    <div className="lg:px-48 md:px-20 items-center  w-full flex justify-center h-full px-4 py-10 ">
      <div>
        <h1 className=" text-xl font-bold text-center py-4 ">All Teams</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full ">
          {isLoading && isFetching && (
            <>
              <h1 className="text-xl font-bold text-center ">Loading</h1>
            </>
          )}
          {!isLoading &&
            teams?.map((team: any) => (
              <div key={team._id}>
                <div className=" w-[250px] items-center justify-cente shadow-lg outline outline-gray-300/75 rounded p-5 ">
                  <p className=" flex flex-row ">
                    Name: {team?.users?.first_name} {team?.users?.last_name}
                  </p>
                  <p>Domain: {team?.users?.domain} </p>
                  <p className=" flex flex-row ">
                    Available:{" "}
                    {team?.users?.available ? <p>True</p> : <p>False</p>}{" "}
                  </p>
                  <Link to={`/teamDetails/${team._id}`}>
                    <button className=" px-3 py-1 bg-black text-white rounded-lg font-bold mt-3 ">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
