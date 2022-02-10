import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Posts, Users } from "./Pages";
import { MainLayout } from "./Components";
import { createContext, useState, useMemo } from "react";
import {
  LOCAL_STORAGE_KEY_FAV_POSTS,
  LOCAL_STORAGE_KEY_FAV_USERS,
} from "./Utils/constants";
import { getFavoriteList } from "./Utils/helpers";

type FavoritesContextType = {
  favoritePosts: number[];
  favoriteUsers: number[];
  setFavoritePosts: (posts: number[]) => void;
  setFavoriteUsers: (posts: number[]) => void;
  isFavoritePost: (postId: number) => boolean;
  isFavoriteUser: (postId: number) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favoritePosts: [],
  favoriteUsers: [],
  setFavoritePosts: () => {},
  setFavoriteUsers: () => {},
  isFavoritePost: () => false,
  isFavoriteUser: () => false,
});

const App = () => {
  const [favoritePosts, setFavoritePosts] = useState<number[]>(
    getFavoriteList(LOCAL_STORAGE_KEY_FAV_POSTS)
  );
  const [favoriteUsers, setFavoriteUsers] = useState<number[]>(
    getFavoriteList(LOCAL_STORAGE_KEY_FAV_USERS)
  );

  const value = useMemo(
    () => ({
      favoritePosts,
      favoriteUsers,
      setFavoritePosts,
      setFavoriteUsers,
      isFavoritePost: (id: number) => favoritePosts.includes(id),
      isFavoriteUser: (id: number) => favoriteUsers.includes(id),
    }),
    [favoritePosts, favoriteUsers]
  );

  return (
    <Router>
      <FavoritesContext.Provider value={value}>
        <MainLayout>
          <Switch>
            <Route path="/posts">
              <Posts />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route>
              <div></div>
            </Route>
          </Switch>
        </MainLayout>
      </FavoritesContext.Provider>
    </Router>
  );
};

export default App;
