import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export default function SidebarListItem({ label, imgSrc, href }) {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  console.log(isSidebarOpen)
  return (
    <li>
      <NavLink to={href}>
        <div className="img-container">
          <img src={imgSrc} alt="" />
        </div>
      <span className="item-link">{label}</span>
      </NavLink>
    </li>
  );
}
