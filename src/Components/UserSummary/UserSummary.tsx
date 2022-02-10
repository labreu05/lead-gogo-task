import { useContext } from "react";
import { FavoriteButton } from "..";
import { FavoritesContext } from "../../App";
import { getDisplayId, toggleFavoriteUser } from "../../Utils/helpers";
import { User } from "../../Utils/types";
import "./styles.scss";

type Props = {
  user: User;
};

export const UserSummary = ({ user }: Props) => {
  const { isFavoriteUser, setFavoriteUsers } = useContext(FavoritesContext);

  return (
    <span className="user-summary">
      <span className="title">{user.name}</span>
      <div className="subsection">
        <FavoriteButton
          isFavorite={isFavoriteUser(user.id)}
          onClick={() => {
            setFavoriteUsers(toggleFavoriteUser(user.id));
          }}
          size="sm"
        />
        <span className="user-id">{`ID: ${getDisplayId(user.id)}`}</span>
        <span className="divider">/</span>
        <span className="user-phone">{`Phone: ${user.phone}`}</span>
      </div>
    </span>
  );
};
