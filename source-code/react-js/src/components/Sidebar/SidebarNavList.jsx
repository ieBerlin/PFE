import searchSvg from "../../assets/search-alt-2-svgrepo-com.svg";
import logoutSvg from "../../assets/log-out-svgrepo-com.svg";
import SidebarListItem from "./SidebarListItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { filterSideBarNavListElements } from "../../features/userRole/userRoleSlice.js";
export default function NavList() {
  const sideBarNavListElements = useSelector(
    (state) => state.userRole.currentSidebarNavList
  );
  const dispatch = useDispatch();
  const toggleSearchInputChange = (e) => {
    const inputVal = e.target.value;
    dispatch(filterSideBarNavListElements(inputVal));
  };
  return (
    <ul className="nav-list">
      <li>
        <div className="bx bx-search">
          <img src={searchSvg} className="icon-i" alt="" />
        </div>
        <input
          onKeyUp={toggleSearchInputChange}
          type="text"
          placeholder="Search..."
        />
        <span className="tooltip">Search</span>
      </li>
      {sideBarNavListElements.length > 0 ? (
        sideBarNavListElements.map((element) => (
          <SidebarListItem
            key={element.id}
            label={element.label}
            href={element.href}
            imgSrc={element.labelSvg}
          />
        ))
      ) : (
        <p className="no-results-found">Nothing results found!</p>
      )}
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
