import React, { useContext, useEffect, useState } from "react";

import { Button, message } from "antd";
import { useSetTitle } from "../../Hooks/useSetTitle";
import {
  FavoriteButton,
  PaginatedTable,
  UserDetailsModal,
  UserSummary,
} from "../../Components";
import { User } from "../../Utils/types";
import { ColumnsType } from "antd/lib/table";
import {
  getDisplayId,
  getUsers,
  toggleFavoriteUser,
} from "../../Utils/helpers";
import "./styles.scss";
import { FavoritesContext } from "../../App";

export const Users = () => {
  useSetTitle("Users");

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const { isFavoriteUser, setFavoriteUsers } = useContext(FavoritesContext);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  useEffect(() => {
    setLoadingUsers(true);

    getUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((e) => {
        console.error(e);
        message.error("Error: Can't get users data.");
      })
      .finally(() => {
        setLoadingUsers(false);
      });
  }, []);

  const columns: ColumnsType<User> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      className: "user-id",
      sorter: (a: User, b: User) => a.id - b.id,
      render: (_: number, record: User) => getDisplayId(record.id),
      responsive: ["md"],
    },
    {
      key: "favorite",
      className: "favorite-user",
      render: (_: User, record: User) => {
        return (
          <FavoriteButton
            isFavorite={isFavoriteUser(record.id)}
            size="md"
            onClick={() => {
              setFavoriteUsers(toggleFavoriteUser(record.id));
            }}
          />
        );
      },
      responsive: ["md"],
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      className: "user-name",
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
      responsive: ["md"],
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
      className: "user-phone",
      sorter: (a: User, b: User) => a.phone.localeCompare(b.phone),
      responsive: ["md"],
    },
    {
      key: "action",
      render: (_: User, record: User) => (
        <Button
          className="view-button"
          onClick={() => {
            handleUserClick(record);
          }}
        >
          View
        </Button>
      ),
      responsive: ["md"],
    },
    {
      key: "mobile-user-list",
      className: "mobile-user-list",
      render: (_: User, record: User) => {
        return (
          <div className="mobile-user-entry">
            <span className="favorite-button-container">
              <FavoriteButton
                isFavorite={isFavoriteUser(record.id)}
                size="sm"
                onClick={() => {
                  setFavoriteUsers(toggleFavoriteUser(record.id));
                }}
              />
            </span>
            <div className="left-container">
              <UserSummary user={record} />
              <span className="action">
                <img
                  src="icon_arrow_right.png"
                  alt="call to action"
                  onClick={() => {
                    handleUserClick(record);
                  }}
                />
              </span>
            </div>
          </div>
        );
      },
      responsive: ["xs", "sm"],
    },
  ];

  return (
    <div className="users-page">
      <PaginatedTable<User>
        dataSource={users}
        columns={columns}
        loading={loadingUsers}
        rowKey="id"
        entryDescription="Users"
      />
      <UserDetailsModal
        user={selectedUser}
        visible={showUserDetail}
        onClose={() => {
          setShowUserDetail(false);
          setSelectedUser(undefined);
        }}
      />
    </div>
  );
};
