import { useContext } from "react";
import { FavoriteButton } from "..";
import { FavoritesContext } from "../../App";
import { getDisplayId, toggleFavoritePost } from "../../Utils/helpers";
import { Post } from "../../Utils/types";
import "./styles.scss";

type Props = {
  post: Post;
};

export const PostSummary = ({ post }: Props) => {
  const { isFavoritePost, setFavoritePosts } = useContext(FavoritesContext);

  return (
    <span className="post-summary">
      <span className="title">{post.title}</span>
      <div className="subsection">
        <FavoriteButton
          isFavorite={isFavoritePost(post.id)}
          onClick={() => {
            setFavoritePosts(toggleFavoritePost(post.id));
          }}
          size="sm"
        />
        <span className="post-id">{`ID: ${getDisplayId(post.id)}`}</span>
        <span className="divider">/</span>
        <span className="post-author">{`By ${post.author.name}`}</span>
      </div>
    </span>
  );
};
