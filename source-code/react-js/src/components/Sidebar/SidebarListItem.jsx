import { NavLink } from "react-router-dom";

export default function SidebarListItem({ label, svg, href }) {
  return (
    <li className="group hover:bg-cyan-100">
      <NavLink
        to={href}
        // className={({ isActive }) => isActive && "bg-blue-700"  }
      >
        <div className="img-container">{svg}</div>
        <span className="item-link group-hover:text-cyan-800">{label}</span>
      </NavLink>
    </li>
  );
}
