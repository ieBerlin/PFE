import { NavLink } from "react-router-dom";

export default function SidebarListItem({label,imgSrc,href}) {
  return (
    <li>
      <NavLink to={href}>
        <div className="img-container">
          <img src={imgSrc} alt="" />
        </div>
        <span className="links_name">{label}</span>
      </NavLink>
    </li>
  );
}
