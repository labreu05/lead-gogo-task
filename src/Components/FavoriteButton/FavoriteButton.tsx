import { Spin } from "antd";
import { useState } from "react";
import "./styles.scss";

type Props = {
  isFavorite: boolean;
  onClick: () => void;
  size: string;
};

const ENABLED_ICON = "/icon_star.png";
const DISABLED_ICON = "/icon_star_disabled.png";

export const FavoriteButton = ({ isFavorite, onClick, size }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // This should work if async logic implemented
    onClick();
    setIsLoading(false);
  };

  return (
    <Spin spinning={isLoading}>
      <img
        src={isFavorite ? ENABLED_ICON : DISABLED_ICON}
        alt="Favorite icon"
        className={`favorite-button ${size}`}
        onClick={handleClick}
      />
    </Spin>
  );
};
