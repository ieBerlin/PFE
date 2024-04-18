import { NavLink } from "react-router-dom";

export default function SidebarListItem({ label, svg, href }) {
  console.log(svg)
  return (
    <li className="group hover:bg-blue-100">
      <NavLink to={href}>
        <div className="img-container">{svg}</div>
        <span className="item-link group-hover:text-blue-600">{label}</span>
      </NavLink>
    </li>
  );
}
