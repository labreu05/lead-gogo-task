import { message } from "antd";
import {
  API_URL,
  LOCAL_STORAGE_KEY_FAV_POSTS,
  LOCAL_STORAGE_KEY_FAV_USERS,
} from "./constants";
import { Post, User } from "./types";

/** ASYNC HELPERS */
export const getPosts = async () => {
  return await fetch(`${API_URL}/posts`)
    .then((response) => response.json())
    .then((json) => json);
};

export const getUsers = async () => {
  return await fetch(`${API_URL}/users`)
    .then((response) => response.json())
    .then((json) => json);
};

export const getPostsWithUsers = async () => {
  const posts: Post[] = await getPosts();

  return Promise.all(
    posts.map((post) => {
      return getPostAuthor(post);
    })
  );
};

export const getPostAuthor = (post: Post) => {
  return fetch(`${API_URL}/users/${post.userId}`)
    .then((response) => response.json())
    .then((result) => {
      return { ...post, author: result };
    });
};

export const getPostComments = (post: Post) => {
  return fetch(`${API_URL}/posts/${post.id}/comments`)
    .then((response) => response.json())
    .then((json) => json);
};

export const getUserAlbums = (user: User) => {
  return fetch(`${API_URL}/users/${user.id}/albums`)
    .then((response) => response.json())
    .then((json) => json);
};
/** ASYNC HELPERS */

/** LOCAL STORAGE HELPERS */
export const getFavoriteList = (key: string) => {
  const favoriteList = localStorage.getItem(key);

  return favoriteList ? JSON.parse(favoriteList) : [];
};

export const toggleFavoritePost = (postId: number) => {
  return toggleFavorite(LOCAL_STORAGE_KEY_FAV_POSTS)(postId);
};

export const toggleFavoriteUser = (userId: number) => {
  return toggleFavorite(LOCAL_STORAGE_KEY_FAV_USERS)(userId);
};

export const toggleFavorite = (key: string) => (postId: number) => {
  let favorites = getFavoriteList(key);
  const postIndex = favorites?.indexOf(postId);
  let notificationText = "";

  if (postIndex === -1) {
    favorites.push(postId);
    notificationText = `Entry with ID: ${postId} added to favorites`;
  } else {
    favorites.splice(postIndex, 1);
    notificationText = `Entry with ID: ${postId} removed from favorites`;
  }

  localStorage.setItem(key, JSON.stringify(favorites));

  message.success(notificationText);

  return favorites;
};
/** LOCAL STORAGE HELPERS */

/** GENERAL HELPERS */
export const getDisplayId = (id: number) => {
  return `${id < 10 ? "0" : ""}${id}`;
};
/** GENERAL HELPERS */
