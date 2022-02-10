export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  author: User;
};

export type Comment = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
};

export type Album = {
  userId: number;
  id: number;
  title: string;
};

export type User = {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  address: {
    city: string;
    geo: { lat: string; lng: string };
    street: string;
    suite: string;
    zipcode: string;
  };
};
