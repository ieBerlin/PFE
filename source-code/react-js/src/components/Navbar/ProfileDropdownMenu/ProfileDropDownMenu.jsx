import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import logoutSvg from "../../../assets/logout-svgrepo-com-black.svg";
import userAvatar from "/kilter.jpg";
import styles from "./ProfileDropDownMenu.module.css"; // Import CSS module

function ProfileDropDownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleButtonRef = useRef(null);
  let profileDropdownMenuStyles = styles.profileDropdownMenu;
  if (isOpen) {
    profileDropdownMenuStyles += ` ${styles.open}`;
  } else {
    profileDropdownMenuStyles = styles.profileDropdownMenu;
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleButtonRef.current !== event.target
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.dropdownMenu}>
      <FontAwesomeIcon
        ref={toggleButtonRef}
        className={styles.angleDown}
        icon={faAngleDown}
        onClick={toggleMenu}
        style={{
          transform: `rotate(${isOpen ? 0 : 90}deg)`,
          transition: "transform 0.3s ease",
        }}
      />
      <div ref={dropdownRef} className={profileDropdownMenuStyles}>
        <div className={styles.profileDetails}>
          <img
            src={userAvatar}
            className={styles.userAvatarDropdownMenu}
            alt="user avatar"
          />
          <div className={styles.profileNameEmail}>
            <p>Annette Black</p>
            <span className={styles.profileNameEmailSpan}>
              annette@example.com
            </span>
          </div>
        </div>
        <hr className={styles.profileDropdownMenuHr} />
        <ul>
          <li className={styles.profileDropdownMenuUlLi}>
            <img src={logoutSvg} className={styles.menuIcon} alt="" />
            <p>Sign out</p>
          </li>
          <li className={styles.profileDropdownMenuUlLi}>
            <img src={logoutSvg} className={styles.menuIcon} alt="" />
            <p>Sign out</p>
          </li>
          <li className={styles.profileDropdownMenuUlLi}>
            <img src={logoutSvg} className={styles.menuIcon} alt="" />
            <p>Sign out</p>
          </li>
        </ul>

        <div className={styles.logout}>
          <hr className={styles.logoutHr} />
          <div className={styles.logoutWrapper}>
            <img src={logoutSvg} className={styles.menuIcon} alt="" />
            <p>Sign out</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropDownMenu;
