import { IoMdBasket } from "react-icons/io";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { NavLink } from "react-router-dom";

const MobileBar = () => {
  return (
    <div className="mobile-bar">
      <NavLink
        className={(e) => (e.isActive ? "nav-link active" : "nav-link")}
        to={"/"}
      >
        <MdFastfood size={25} />
      </NavLink>
      <NavLink
        className={(e) => (e.isActive ? "nav-link active" : "nav-link")}
        to={"/order"}
      >
        <IoMdBasket size={25} />
      </NavLink>
    </div>
  );
};

export default MobileBar;
