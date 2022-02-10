import React, { useContext, useEffect, useState } from "react";

import { Button, message } from "antd";
import { useSetTitle } from "../../Hooks/useSetTitle";
import {
  FavoriteButton,
  PaginatedTable,
  PostDetailsModal,
  PostSummary,
} from "../../Components";
import { Post, User } from "../../Utils/types";
import { ColumnsType } from "antd/lib/table";
import {
  getDisplayId,
  getPostsWithUsers,
  toggleFavoritePost,
} from "../../Utils/helpers";
import "./styles.scss";
import { FavoritesContext } from "../../App";

export const Posts = () => {
  useSetTitle("Posts");

  const { isFavoritePost, setFavoritePosts } = useContext(FavoritesContext);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  useEffect(() => {
    setLoadingPosts(true);

    getPostsWithUsers()
      .then((posts) => {
        setPosts(posts);
      })
      .catch((e) => {
        console.error(e);
        message.error("Error: Can't get posts data");
      })
      .finally(() => {
        setLoadingPosts(false);
      });
  }, []);

  const columns: ColumnsType<Post> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (a: Post, b: Post) => a.id - b.id,
      className: "post-id",
      render: (_: number, record: Post) => getDisplayId(record.id),
      responsive: ["md"],
    },
    {
      key: "favorite",
      className: "favorite-post",
      render: (_: Post, record: Post) => {
        return (
          <FavoriteButton
            isFavorite={isFavoritePost(record.id)}
            size="md"
            onClick={() => {
              setFavoritePosts(toggleFavoritePost(record.id));
            }}
          />
        );
      },
      responsive: ["md"],
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      className: "post-title",
      sorter: (a: Post, b: Post) => a.title.localeCompare(b.title),
      responsive: ["md"],
    },
    {
      title: "user",
      dataIndex: ["author", "id"],
      key: "userId",
      className: "post-author",
      sorter: (a: Post, b: Post) => a.author.name.localeCompare(b.author.name),
      render: (_: User, record: Post) => record?.author?.name,
      responsive: ["md"],
    },
    {
      key: "action",
      render: (_: Post, record: Post) => (
        <Button
          className="view-button"
          onClick={() => {
            handlePostClick(record);
          }}
        >
          View
        </Button>
      ),
      responsive: ["md"],
    },
    {
      key: "mobile-post-list",
      className: "mobile-post-list",
      render: (_: Post, record: Post) => {
        return (
          <div className="mobile-post-entry">
            <span className="favorite-button-container">
              <FavoriteButton
                isFavorite={isFavoritePost(record.id)}
                size="sm"
                onClick={() => {
                  setFavoritePosts(toggleFavoritePost(record.id));
                }}
              />
            </span>
            <div className="left-container">
              <PostSummary post={record} />
              <span className="action">
                <img
                  src="icon_arrow_right.png"
                  alt="call to action"
                  onClick={() => {
                    handlePostClick(record);
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
    <div className="posts-page">
      <PaginatedTable<Post>
        dataSource={posts}
        columns={columns}
        loading={loadingPosts}
        rowKey="id"
        entryDescription="Posts"
      />
      <PostDetailsModal
        post={selectedPost}
        visible={showPostDetail}
        onClose={() => {
          setShowPostDetail(false);
          setSelectedPost(undefined);
        }}
      />
    </div>
  );
};
