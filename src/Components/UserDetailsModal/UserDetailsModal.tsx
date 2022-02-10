import { message, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { AlbumList, DetailsModal, Paragraph, UserSummary } from "..";
import { getUserAlbums } from "../../Utils/helpers";
import { User, Album } from "../../Utils/types";
import "./styles.scss";

type Props = {
  user?: User;
  visible?: boolean;
  onClose: () => void;
};

export const UserDetailsModal = ({ user, visible = false, onClose }: Props) => {
  const [userAlbums, setUserAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);

  useEffect(() => {
    setLoadingAlbums(true);

    if (user) {
      getUserAlbums(user)
        .then((albums) => {
          setUserAlbums(albums);
        })
        .catch((e) => {
          console.error(e);
          message.error("Error: Can't get albums data");
        })
        .finally(() => {
          setLoadingAlbums(false);
        });
    }
  }, [user]);

  return (
    <DetailsModal
      visible={visible}
      onClose={onClose}
      header={user ? <UserSummary user={user} /> : undefined}
      body={
        user ? (
          // NOTE: I used this placeholder text since the user data doesn't have a field like this one.
          <Paragraph
            text={
              "A busy PhD Student who needs a quiet place to study and read without distractions. He spends a lot of time on campus, refuels often and is a major coffee lover. He is the ideal customer for Julia’s Cafe. He wants to receive quick and professional service; order online from his smartphone to avoid lineups, and not deal with over-conversational staff members."
            }
          />
        ) : undefined
      }
      extraClassName="user-details-modal"
      extra={
        <>
          <Skeleton loading={loadingAlbums}>
            <AlbumList albums={userAlbums} />
          </Skeleton>
        </>
      }
    />
  );
};
