import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  //   const handleItemClick = (action) => {
  //     // Handle item click actions here
  //     console.log(`Clicked on ${action}`);
  //     // For example, if you want to close the menu after clicking an item:
  //     setIsOpen(false);
  //   };

  return (
    <div className="dropdown-menu">
      <FontAwesomeIcon
        className="angle-down"
        icon={faAngleDown}
        onClick={toggleMenu}
        style={{
            transform: `rotate(${isOpen ? -180 : 0}deg)`,
            transition: 'transform 0.3s ease', // Apply transition to the transform property
          }}
      />
    </div>
  );
}

export default DropdownMenu;

// return (
//     <FontAwesomeIcon icon="fa-solid fa-angle-up" />
// // <div className="dropdown">
// //   <button className="dropbtn">
// //   </button>
// //   <div className="dropdown-content">
// //     <a href="#">Link 1</a>
// //     <a href="#">Link 2</a>
// //     <a href="#">Link 3</a>
// //   </div>
// // </div>
// );
