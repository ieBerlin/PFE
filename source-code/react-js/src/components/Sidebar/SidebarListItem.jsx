import { NavLink } from "react-router-dom";

export default function SidebarListItem({ label, imgSrc, href }) {
  return (
    <li className="group hover:bg-white">
      <NavLink to={href}>
        <div className="img-container">
          <img src={imgSrc} alt="" className="img-hover" />
        </div>
        <span className="item-link group-hover:text-black">{label}</span>
      </NavLink>
    </li>
  );
}
