/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { useDeleteUserMutation, useGetUsersQuery } from "../redux/api/userApi";
import { Link } from "react-router-dom";
interface MenuItem {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  domain: string;
  available: boolean;
  avatar: string;
}

const AllUser = () => {
  // page,limit,searchName, gender, domain,availability,sortOrder,sortField,
  // gender, domain,availability
  const [limit] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [searchName, setSearch] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [domain, setDomain] = useState<string>();
  const [availability, setAvailability] = useState<string>();

  const query: Record<string, any> = {
    limit,
    page,
    searchName,
    gender,
    domain,
    availability,
  };

  const { data, isLoading } = useGetUsersQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );
  // ===========delete food===================
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.error("Delete Food Successfully", { icon: false });
    } catch (error) {
      toast.error("Error deleting product");
      // console.error("Error deleting product:", error);
    }
  };
  //=================pagination===================================
  const totalPage = Math.ceil(data?.meta?.total / limit);
  console.log("totalPage:", totalPage);
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      toast.warning("Page number can't be less than 1");
    }
  };
  const nextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    } else {
      toast.warning("Page number can't be more than");
    }
  };
  //=================pagination======================================
  const users = data?.data;
  //const meta = data?.meta;
  const uniqueData: MenuItem[] = users?.filter(
    (item: any, index: any, self: any) =>
      index === self.findIndex((t: any) => t.domain === item.domain)
  );

  const tablebg = "hover:bg-white text-black";
  return (
    <div className=" flex items-center justify-center w-full ">
      <div className=" w-full px-4 lg:px-24 flex flex-col  justify-between gap-5 bg-slate-300  ">
        {isLoading && (
          <div className=" h-screen items-center justify-center py-10 px-2 ">
            <h1 className=" text-3xl font-bold ">Loading </h1>
          </div>
        )}

        <div className=" flex flex-wrap justify-between gap-3  ">
          <div className=" w-full flex flex-row justify-between my-4 ">
            <h1 className=" text-xl font-bold text-black ">All Users</h1>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Enter user name"
              className="rounded-full font-xl h-10 focus:outline-none px-4 "
            />
          </div>
          <div className="flex flex-wrap justify-between text-black ">
            <div>
              <select
                onChange={(e) => setGender(e.target.value)}
                className=" w-full focus:outline-none h-10 rounded px-2 "
              >
                <option
                  value=""
                  className=" w-full focus:outline-none h-10 rounded px-2 "
                >
                  Gender Selection
                </option>
                <option
                  value="Female"
                  className=" w-1/2 focus:outline-none h-10 rounded px-2 "
                >
                  Female
                </option>
                <option
                  value="Male"
                  className=" w-1/2 focus:outline-none h-10 rounded px-2 "
                >
                  Male
                </option>
                <option
                  value="Other"
                  className=" w-1/2 focus:outline-none h-10 rounded px-2 "
                >
                  Other
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between text-black ">
            <div>
              <select
                onChange={(e) => setAvailability(e.target.value)}
                className=" w-full focus:outline-none h-10 rounded px-2 "
              >
                <option
                  value=""
                  className=" w-full focus:outline-none h-10 rounded px-2 "
                >
                  Available Selection
                </option>
                <option
                  value="true"
                  className=" w-1/2 focus:outline-none h-10 rounded px-2 "
                >
                  Active
                </option>
                <option
                  value="false"
                  className=" w-1/2 focus:outline-none h-10 rounded px-2 "
                >
                  In-Active
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between text-black ">
            <div>
              <select
                onChange={(e) => setDomain(e.target.value)}
                className=" w-full focus:outline-none h-10 rounded px-2 "
              >
                <option
                  value=""
                  className=" w-full focus:outline-none h-10 rounded px-2 "
                >
                  Domain Selection
                </option>
                {uniqueData?.map((user: MenuItem) => (
                  <option
                    key={user._id}
                    value={user.domain}
                    className=" w-1/2 focus:outline-none h-10 rounded px-2 "
                  >
                    <span>{user.domain} </span>
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/*============================= Table ================================*/}
        <div>
          <div className="overflow-x-auto xs:overflow-x-scroll w-full ">
            <table className=" shadow-2xl w-full rounded  ">
              <thead className=" w-full  text-white ">
                <tr className=" w-[100%] ">
                  <th className=" py-3 md:px-2 bg-cyan-800 ">S.NO</th>
                  <th className=" py-3 md:px-2 bg-cyan-800 ">Name</th>
                  <th className=" py-3 md:px-2 bg-cyan-800 ">Gender</th>
                  <th className=" py-3 md:px-2 bg-cyan-800 ">Domain</th>
                  <th className=" py-3 md:px-2 bg-cyan-800 ">available</th>
                  <th className=" py-3 px-2  bg-cyan-800 ">Action</th>
                </tr>
              </thead>
              <tbody className=" bg-gray-300 text-black text-center  ">
                {users?.map((item: MenuItem, index: number) => (
                  <tr
                    key={item._id}
                    className={`${tablebg} h-4 bg-green-400  text-black cursor-pointer duration-300 `}
                  >
                    {/* hover:scale-105 */}
                    <td>{index + 1}</td>
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                    <td>{item.gender} </td>
                    <td>{item.domain} </td>
                    <td>{item.available ? <p>True</p> : <p>False</p>} </td>

                    <td className=" gap-3 ">
                      <button className=" px-2 hover:text-green-700  border-none  ">
                        <Link to={`/edit/${item._id}`}>
                          <BiEdit size={20} />
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className=" px-2 hover:text-rose-700 border-none"
                      >
                        <MdDelete size={20} className=" text-red-700 " />
                      </button>
                      <button className=" px-2 hover:text-green-700 border-none">
                        <Link to={`/view/${item._id}`}>
                          <IoEye size={20} className=" /view/:id " />
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/*====================== Pagination ============================*/}
          <div className="  py-2 border-black text-black items-center text-center ">
            <div className=" flex bg-gray-400 rounded-lg p-6  ">
              <button
                onClick={prevPage}
                className=" h-12 border-2 border-gray-600 px-4 rounded-l-lg hover:bg-gray-600 hover:text-white mr-2  "
              >
                <h3 className=" text-xl font-medium ">Prev</h3>
              </button>
              <button className=" h-12  px-4 rounded-lg  mr-2  ">
                {isLoading ? (
                  <h3 className=" text-xl font-medium ">100/99</h3>
                ) : (
                  <h3 className=" text-xl font-medium ">
                    {page}/{totalPage}
                  </h3>
                )}
              </button>
              <button
                onClick={nextPage}
                className=" h-12 border-2 border-gray-600 px-4 rounded-r-lg hover:bg-gray-600 hover:text-white mr-2  "
              >
                <h3 className=" text-xl font-medium ">Next</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
