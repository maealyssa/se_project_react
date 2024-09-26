import "../blocks/SideBar.css";
import avatar from "../assets/avatar.png";

function SideBar() {
  return (
    <div className="side-bar">
      <img className="side-bar__avatar" src={avatar} alt="default avatar" />
      <p className="side-bar__username">User name</p>
    </div>
  );
}

export default SideBar;
