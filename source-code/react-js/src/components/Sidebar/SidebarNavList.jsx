import searchSvg from "../../assets/search-alt-2-svgrepo-com.svg";
import logoutSvg from "../../assets/logout-3-svgrepo-com.svg";
import SidebarListItem from "./SidebarListItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice.js";
import { defineUserNavs } from "../../features/userRole/user-navs.jsx";
import { useEffect, useState } from "react";

export default function NavList() {
  const { userRole } = useSelector((state) => state.userRole);
  const [currentDrawerItemsState, setCurrentDrawerItems] = useState([]);
  useEffect(() => {
    setCurrentDrawerItems(defineUserNavs(userRole)?.sidebar);
  }, [userRole]);

  const dispatch = useDispatch();

  const toggleSearchInputChange = (e) => {
    const inputVal = e.target.value;
    if (inputVal && inputVal.trim() !== "") {
      setCurrentDrawerItems(
        defineUserNavs(userRole)?.sidebar.filter((item) =>
          item.label.toLowerCase().startsWith(inputVal.toLowerCase())
        )
      );
    } else {
      setCurrentDrawerItems(defineUserNavs(userRole)?.sidebar);
    }
  };
  const signOutHandler = () => {
    console.log('Clicked')
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
      { currentDrawerItemsState && currentDrawerItemsState.length > 0 ? (
        currentDrawerItemsState.map((element) => (
          <SidebarListItem
            key={element.id}
            label={element.label}
            href={element.href}
            svg={element.labelSvg}
          />
        ))
      ) : (
        <p className="text-black font-semibold text-center text-nowrap text-ellipsis overflow-hidden">Nothing results found!</p>
      )}
      {/* <div className="profile">
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
      </div> */}
    </ul>
  );
}
