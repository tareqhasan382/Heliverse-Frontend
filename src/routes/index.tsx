import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";
import UserCard from "../components/UserCard";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/adduser",
        element: <AddUser />,
      },
      {
        path: "/view/:id",
        element: <UserCard />,
      },
      {
        path: "/edit/:id",
        element: <EditUser />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  //   {
  //     path: "/dashboard",
  //     element: <Dashboard />,
  //     children: [
  //       {
  //         path: "/dashboard",
  //         element: <AllFood />,
  //       },
  //       {
  //         path: "/dashboard/add",
  //         element: <FromPage />,
  //       },
  //     ],
  //   },
]);
export default routes;
