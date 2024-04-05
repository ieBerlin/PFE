import searchSvg from "../../assets/search-alt-2-svgrepo-com.svg";
import dashboardSvg from "../../assets/dashboard-2-svgrepo-com.svg";
import classesSvg from "../../assets/class-management-svgrepo-com.svg";
import coachesSvg from "../../assets/trainer-svgrepo-com.svg";
import equipmentsSvg from "../../assets/dumbbells-2-svgrepo-com.svg";
import reportsSvg from "../../assets/report-linechart-svgrepo-com.svg";
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
      <SidebarListItem label="Dashboard" imgSrc={dashboardSvg} href="dashboard" />
      <SidebarListItem label="Classes" imgSrc={classesSvg} href="classes" />
      <SidebarListItem label="Coaches" imgSrc={coachesSvg} href="coaches" />
      <SidebarListItem label="Equipments" imgSrc={equipmentsSvg} href="equipmentes" />
      <SidebarListItem label="Reports" imgSrc={reportsSvg} href="reports" />
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
