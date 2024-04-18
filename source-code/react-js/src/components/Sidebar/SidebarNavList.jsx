import searchSvg from "../../assets/search-alt-2-svgrepo-com.svg";
import logoutSvg from "../../assets/logout-3-svgrepo-com.svg";
import SidebarListItem from "./SidebarListItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  filterSideBarNavListElements,
} from "../../features/userRole/userRoleSlice.js";
import { setModalType } from "../../features/modal/modalSlice.js";
import { defineUserNavs } from "../../features/userRole/user-navs.js";

export default function NavList() {
  const { userRole } = useSelector((state) => state.userRole);

  const currentDrawerItems = defineUserNavs(userRole).sidebar;
  console.log(currentDrawerItems)
  const dispatch = useDispatch();

  const toggleSearchInputChange = (e) => {
    const inputVal = e.target.value;
    dispatch(filterSideBarNavListElements(inputVal));
  };
  const signOutHandler = () => {
    dispatch(setModalType("confirm-sign-out"));
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
      {currentDrawerItems && currentDrawerItems.length > 0 ? (
        currentDrawerItems.map((element) => (
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
        <div className="profile-details-container">
          <div className="profile-details">
            <img src={searchSvg} alt="" />
            <div className="name-job">
              <div className="name">Stella Army</div>
              <div className="job">Web designer</div>
            </div>
          </div>
        </div>
        <div className="log-out-container">
          <span />
          <button onClick={signOutHandler}>
            <img src={logoutSvg} id="log-out" alt="" />
          </button>
        </div>
      </div>
    </ul>
  );
}
