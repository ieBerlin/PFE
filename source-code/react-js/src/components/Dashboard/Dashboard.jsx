import { useDispatch } from "react-redux";
import { useRouteLoaderData } from "react-router-dom";
import { changeUserRole } from "../../features/userRole/userRoleSlice";

export default function Dashboard() {
  const userRole = useRouteLoaderData("root");
  const dispatch = useDispatch();
  if (!userRole || !["admin", "member", "coach"].includes(userRole)) {
    return <div>Unauthorized</div>;
  }
  dispatch(changeUserRole(userRole));
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
export function loader() {
  const userRole = localStorage.getItem("user-role");
  return userRole;
}
