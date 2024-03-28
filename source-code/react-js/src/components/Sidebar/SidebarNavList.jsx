import searchSvg from "../../assets/search-alt-2-svgrepo-com.svg";
import logoutSvg from "../../assets/log-out-svgrepo-com.svg";
import SidebarListItem from "./SidebarListItem.jsx";

export default function NavList() {
  return (
    <ul className="nav-list">
      <li>
        <div className="bx bx-search">
          <img src={searchSvg} className="icon-i" alt="" />
        </div>
        <input type="text" placeholder="Search..." />
        <span className="tooltip">Search</span>
      </li>
      <SidebarListItem label="Dashboard" imgSrc={searchSvg} />
      <SidebarListItem label="Search" imgSrc={searchSvg} />
      <SidebarListItem label="Reports" imgSrc={searchSvg} />
      <div className="profile">
        <div className="profile-details">
          <img src={searchSvg} alt="" />
          <div className="name_job">
            <div className="name">Stella Army</div>
            <div className="job">Web designer</div>
          </div>
        </div>
        <img src={logoutSvg} id="log_out" alt="" />
      </div>
    </ul>
  );
}
