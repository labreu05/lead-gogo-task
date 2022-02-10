import { Tooltip } from "antd";
import { Album } from "../../Utils/types";
import "./styles.scss";

type Props = {
  albums: Album[];
};

export function AlbumList({ albums }: Props) {
  const entriesCount = albums.length;

  return (
    <div className="album-list">
      <div className="list-header">
        <span className="title">Albums</span>
        <span className="count">
          {entriesCount > 0 ? `(${entriesCount})` : ""}
        </span>
      </div>
      <div className="albums-container">
        {albums.map((album) => (
          <Tooltip title={album.title} key={album.id}>
            {/* NOTE: I used placeholder images since the album data doesn't provide an image */}
            <img
              src="https://picsum.photos/200"
              alt={album.title}
              className="album"
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
