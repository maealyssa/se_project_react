import "../blocks/SideBar.css";
import avatar from "../assets/avatar.png";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="side-bar">
      <img className="side-bar__avatar" src={currentUser.avatar} alt="default avatar" />
      <p className="side-bar__username">{currentUser.name}</p>
    </div>
  );
}

export default SideBar;
