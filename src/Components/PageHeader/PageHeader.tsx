import { Header } from "antd/lib/layout/layout";
import { useLocation } from "react-router-dom";
import { KNOWN_PAGES } from "../../Utils/constants";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import "./styles.scss";

type Props = {
  handleCollapse: () => void;
};

const getPageHeader = (pathName: string) => {
  const clearedPath = pathName.replace("/", "");

  return KNOWN_PAGES.indexOf(clearedPath) >= 0 ? clearedPath : "404 not found";
};

export const PageHeader = ({ handleCollapse }: Props) => {
  const location = useLocation();
  const pageHeader = getPageHeader(location.pathname);

  return (
    <Header className="page-header">
      <div className="left-container">
        <span className="hamburger-title-container">
          <img
            src="icon_sidebar.png"
            alt="icon side bar"
            onClick={handleCollapse}
          />
          <span className="title">{pageHeader}</span>
        </span>
      </div>

      <div className="avatar-container">
        <UserAvatar />
      </div>
    </Header>
  );
};
