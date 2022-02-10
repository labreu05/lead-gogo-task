import { Avatar } from "antd";
import "./styles.scss";

export const UserAvatar = () => {
  return (
    <div className="user-avatar">
      <Avatar src="user_avatar.png" className="profile-pic" />
      <div className="info-container">
        <span className="name">Dan Romero</span>
        <span className="position">Sales Manager</span>
      </div>
    </div>
  );
};
